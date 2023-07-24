package com.codestates;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.util.TimeZone;


@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication
public class MoviepopApplication {
	@PostConstruct
	public void setTimeZone(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

	public static void main(String[] args) {
		SpringApplication.run(MoviepopApplication.class, args);
	}
}
