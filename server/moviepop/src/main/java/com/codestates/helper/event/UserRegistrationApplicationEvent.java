package com.codestates.helper.event;

import com.codestates.user.entity.User;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.util.Map;

@Getter
public class UserRegistrationApplicationEvent extends ApplicationEvent {
    private User user;
    private String subject;
    private Map<String, Object> variables;

    public UserRegistrationApplicationEvent(Object source, User user, String subject, Map<String, Object> variables) {
        super(source);
        this.user = user;
        this.subject = subject;
        this.variables = variables;
    }
}
