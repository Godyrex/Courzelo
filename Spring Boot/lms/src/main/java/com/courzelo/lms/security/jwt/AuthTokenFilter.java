package com.courzelo.lms.security.jwt;

import com.courzelo.lms.entities.RefreshToken;
import com.courzelo.lms.services.AuthService;
import com.courzelo.lms.services.IRefreshTokenService;
import com.courzelo.lms.services.UserService;
import com.courzelo.lms.utils.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class AuthTokenFilter extends OncePerRequestFilter {
    private static final Logger jwtLogger = LoggerFactory.getLogger(AuthTokenFilter.class);
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private UserService userDetailsService;
    @Autowired
    private CookieUtil cookieUtil;
    @Autowired
    private IRefreshTokenService iRefreshTokenService;
    @Autowired
    private AuthService authService;


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        List<String> excludedEndpoints = Arrays.asList(
                "/api/v1/auth/signing",
                "/api/v1/auth/signup",
                "/api/v1/auth/logout",
                "/api/v1/auth/refreshToken",
                "/api/v1/auth/verify",
                "/api/v1/auth/confirmDevice/"
        );
        String requestUri = request.getRequestURI();
        log.info("doFilterInternal :requestUri " + requestUri);
        boolean isExcludedEndpoint = false;
        for (String endpoint : excludedEndpoints) {
            if (requestUri.startsWith(endpoint)) {
                isExcludedEndpoint = true;
                break;
            }
        }
        log.info("doFilterInternal : isExcludedEndpoint " + isExcludedEndpoint);
        if (isExcludedEndpoint) {
            log.info("doFilterInternal :Excluded! ");
            filterChain.doFilter(request, response);
            return;
        }
        String accessToken = cookieUtil.getAccessTokenFromCookies(request);

        try {
            if (accessToken != null && jwtUtils.validateJwtToken(accessToken)) {
                String email = jwtUtils.getEmailFromJwtToken(accessToken);
                UserDetails userDetails = userDetailsService.loadUserByEmail(email);
                if (userDetailsService.ValidUser(email)) {
                    setAuthenticationInSecurityContext(request, userDetails);
                }
            } else if (cookieUtil.getRefreshTokenFromCookies(request) != null) {
                RefreshToken token = iRefreshTokenService.findByToken(cookieUtil.getRefreshTokenFromCookies(request));
                iRefreshTokenService.verifyExpiration(token);
                authService.refreshToken(response, token.getUser().getEmail());
                UserDetails userDetails = userDetailsService.loadUserByEmail(token.getUser().getEmail());
                if (userDetailsService.ValidUser(token.getUser().getEmail())) {
                    log.info("doFilterInternal : " + token.getUser().getEmail() + " is valid!");
                    setAuthenticationInSecurityContext(request, userDetails);
                }
            }

        } catch (Exception e) {
            jwtLogger.error("Cannot set user authentication: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }


    private void setAuthenticationInSecurityContext(HttpServletRequest request, UserDetails userDetails) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}

