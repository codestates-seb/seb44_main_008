package com.codestates.helper.event;

import com.codestates.helper.email.EmailSender;
import com.codestates.helper.email.TemplateEmailSendable;
import com.codestates.user.entity.User;
import com.codestates.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import java.util.Map;

@EnableAsync
@Component
public class UserRegistrationEventListener {
    private final EmailSender emailSender;

    private final UserRepository userRepository;

    public UserRegistrationEventListener(EmailSender emailSender, UserRepository userRepository) {
        this.emailSender = emailSender;
        this.userRepository = userRepository;
    }

    @Async
    @EventListener
    public void listen(UserRegistrationApplicationEvent event) throws Exception {
        String[] to = new String[] {event.getUser().getEmail()};
        try {
            Map<String, Object> message = event.getVariables();
            emailSender.sendEmail(to, event.getSubject(), message);
        } catch (MailSendException e) {
            e.printStackTrace();
            User user = event.getUser();
            userRepository.deleteById(user.getUserId());
        }
    }
}
