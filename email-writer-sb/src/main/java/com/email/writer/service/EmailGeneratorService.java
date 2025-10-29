package com.email.writer.service;

import com.email.writer.dto.EmailRequest;

public interface EmailGeneratorService {
	public String generateEmailReplay(EmailRequest emailRequest);
}
