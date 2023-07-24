package com.codestates.utils;

import com.codestates.user.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

public class UserUtils {
    public static Period getAge(User user) {
        LocalDate birth = user.getBirth();
        LocalDateTime now = LocalDateTime.now();

        return Period.between(birth, now.toLocalDate());
    }
}
