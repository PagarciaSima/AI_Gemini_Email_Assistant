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

@RestController
@RequestMapping("/api/email")
@Slf4j
@RequiredArgsConstructor
public class EmailGeneratorController {
	
	private final EmailGeneratorService emailGeneratorService;

	@PostMapping("/generate")
	public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
		String response = emailGeneratorService.generateEmailReplay(emailRequest);
		return ResponseEntity.ok(response);
	}
	
}
