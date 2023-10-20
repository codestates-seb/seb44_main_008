package com.codestates.helper.email;

import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailSender {
    private final EmailSendable emailSendable;

    public EmailSender(EmailSendable emailSendable) {
        this.emailSendable = emailSendable;
    }

    public void sendEmail(String[] to, String subject, Map<String, Object> message) throws MailSendException, InterruptedException {
        emailSendable.send(to, subject, message);
    }
}
