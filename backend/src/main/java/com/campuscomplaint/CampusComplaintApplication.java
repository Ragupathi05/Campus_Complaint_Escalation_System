package com.campuscomplaint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CampusComplaintApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusComplaintApplication.class, args);
    }
}
