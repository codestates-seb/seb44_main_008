package com.codestates.helper.email;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public interface EmailSendable {
    void send(String[] to, String subject, Map<String, Object> message) throws InterruptedException;
}
