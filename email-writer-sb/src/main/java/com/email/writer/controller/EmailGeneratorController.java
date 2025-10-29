
package com.email.writer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.email.writer.dto.EmailRequest;
import com.email.writer.service.EmailGeneratorService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * REST controller for handling email generation requests.
 */
@RestController
@RequestMapping("/api/email")
@Slf4j
@RequiredArgsConstructor
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    /**
     * Generates a professional email reply using the provided email content and tone.
     *
     * @param emailRequest The request containing the original email content and desired tone.
     * @return ResponseEntity containing the generated email reply.
     */
    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        log.info("Received request to generate email reply.");
        String response = emailGeneratorService.generateEmailReplay(emailRequest);
        log.info("Email reply generated successfully.");
        return ResponseEntity.ok(response);
    }

}
