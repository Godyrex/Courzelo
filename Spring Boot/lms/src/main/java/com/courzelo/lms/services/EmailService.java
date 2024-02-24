package com.courzelo.lms.services;

import com.courzelo.lms.entities.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
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
                "                            <p>Please click the link below to verify your registration:</p>\n" +
                "                            <p><a href=\"[[URL]]\" target=\"_blank\" class=\"btn btn-primary\">Verify Now</a></p>\n" +
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

        content = content.replace("[[name]]", user.getName()+" "+user.getLastName());
        String verifyURL = "localhost:4200" + "/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }
}