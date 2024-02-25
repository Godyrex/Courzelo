package com.courzelo.lms.services;

import com.courzelo.lms.entities.User;
import com.courzelo.lms.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    private final UserRepository userRepository;

    public EmailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
    public void sendVerificationEmail(User user)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "noreply@courzelo.com";
        String senderName = "Courzelo";
        String subject = "Please verify your registration";
        String content = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Email Content</title>\n" +
                "    <!-- AdminLTE CSS -->\n" +
                "    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.1.0/css/adminlte.min.css\">\n" +
                "    <style>\n" +
                "        body, html {\n" +
                "            height: 100%;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "        }\n" +
                "        .wrapper {\n" +
                "            display: flex;\n" +
                "            align-items: center;\n" +
                "            justify-content: center;\n" +
                "            height: 100%;\n" +
                "        }\n" +
                "        .email-content {\n" +
                "            max-width: 600px; /* Adjust max-width as needed */\n" +
                "            width: 100%;\n" +
                "            background-color: #f7f7f7;\n" +
                "            padding: 20px;\n" +
                "            border-radius: 5px;\n" +
                "            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);\n" +
                "        }\n" +
                "        .email-header {\n" +
                "            background-color: #17a2b8;\n" +
                "            color: #fff;\n" +
                "            padding: 15px;\n" +
                "            border-radius: 5px 5px 0 0;\n" +
                "        }\n" +
                "        .email-body {\n" +
                "            padding: 20px;\n" +
                "        }\n" +
                "        .btn {\n" +
                "            background-color: #17a2b8;\n" +
                "            color: #fff;\n" +
                "            border: none;\n" +
                "            padding: 10px 20px;\n" +
                "            text-decoration: none;\n" +
                "            border-radius: 5px;\n" +
                "            display: inline-block;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"wrapper\">\n" +
                "        <div class=\"email-content\">\n" +
                "            <!-- Main content -->\n" +
                "            <div class=\"email-header\">\n" +
                "                <h3>Verification Email</h3>\n" +
                "            </div>\n" +
                "            <div class=\"email-body\">\n" +
                "                <p>Dear [[name]],</p>\n" +
                "                <p>Your verification code is: <strong>[[verificationCode]]</strong></p>\n" +
                "                <p>Thank you,</p>\n" +
                "                <p>Courzelo</p>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <!-- /.email-content -->\n" +
                "    </div>\n" +
                "    <!-- /.wrapper -->\n" +
                "\n" +
                "    <!-- AdminLTE JavaScript -->\n" +
                "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.1.0/js/adminlte.min.js\"></script>\n" +
                "</body>\n" +
                "</html>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName()+" "+user.getLastName());
        String verifyURL = "localhost:4200" + "/verify?code=" + user.getEmailVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }
    public void sendVerificationCode(User user,int verificationCode)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "noreply@courzelo.com";
        String senderName = "Courzelo";
        String subject = "Please verify your registration";
        String content = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Email Content</title>\n" +
                "    <!-- AdminLTE CSS -->\n" +
                "    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.1.0/css/adminlte.min.css\">\n" +
                "    <style>\n" +
                "        body, html {\n" +
                "            height: 100%;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "        }\n" +
                "        .wrapper {\n" +
                "            display: flex;\n" +
                "            align-items: center;\n" +
                "            justify-content: center;\n" +
                "            height: 100%;\n" +
                "        }\n" +
                "        .email-content {\n" +
                "            max-width: 600px; /* Adjust max-width as needed */\n" +
                "            width: 100%;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"wrapper\">\n" +
                "        <div class=\"email-content\">\n" +
                "            <!-- Main content -->\n" +
                "            <section class=\"content\">\n" +
                "                <div class=\"container-fluid\">\n" +
                "                    <div class=\"card\">\n" +
                "                        <div class=\"card-header\">\n" +
                "                            <h3 class=\"card-title\">Verification Email</h3>\n" +
                "                        </div>\n" +
                "                        <!-- /.card-header -->\n" +
                "                        <div class=\"card-body\">\n" +
                "                            <p>Dear [[name]],</p>\n" +
                "                            <p>Your verification code is: <strong>[[verificationCode]]</strong></p>\n" +
                "                            <p>Thank you,</p>\n" +
                "                            <p>Courzelo</p>\n" +
                "                        </div>\n" +
                "                        <!-- /.card-body -->\n" +
                "                    </div>\n" +
                "                    <!-- /.card -->\n" +
                "                </div>\n" +
                "                <!-- /.container-fluid -->\n" +
                "            </section>\n" +
                "            <!-- /.content -->\n" +
                "        </div>\n" +
                "        <!-- /.email-content -->\n" +
                "    </div>\n" +
                "    <!-- /.wrapper -->\n" +
                "\n" +
                "    <!-- AdminLTE JavaScript -->\n" +
                "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.1.0/js/adminlte.min.js\"></script>\n" +
                "</body>\n" +
                "</html>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName() + " " + user.getLastName());
        content = content.replace("[[verificationCode]]", String.valueOf(verificationCode));

        helper.setText(content, true);

        mailSender.send(message);
    }
    public int generateVerificationCode(User user){
        log.info("generateVerificationCode : Generating verification code ...");
        Random random = new Random();
        int verificationCode = random.nextInt(9000) + 1000;
        log.info("generateVerificationCode : Verification code is "+ verificationCode);
        user.setVerificationCode(verificationCode);
        userRepository.save(user);
        log.info("generateVerificationCode : Generating complete ...");
        return verificationCode;
    }
}