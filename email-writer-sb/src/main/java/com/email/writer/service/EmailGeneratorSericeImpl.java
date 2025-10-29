package com.email.writer.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.email.writer.dto.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailGeneratorSericeImpl implements EmailGeneratorService {

	@Value("${gemini.api.url}")
	private String geminiApiUrl;
	@Value("${gemini.api.key}")
	private String geminiApiKey;
	
    private final WebClient.Builder webClientBuilder;
	
	public String generateEmailReplay(EmailRequest emailRequest) {
		// Build the prompt for email generation
		String prompt = buildPrompt(emailRequest);
		log.info("Prompt for AI model: {}", prompt);
		
		// Craft a request to the AI model
		Map<String, Object> requestBody = generateAiGenRequest(prompt);
		
		// Make the API call to the AI model and get a response
		String response = this.webClientBuilder.build().post()
				.uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
		
		// Return the response
		return extractResponseContent(response);
	}
	
	private String extractResponseContent(String response) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode rootNode = objectMapper.readTree(response);
			return rootNode.path("candidates").get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text")
                    .asText();
		} catch (Exception e) {
			return "Error proccesing request: " + e.getMessage();
		}
	}

	/**
	 * Builds the request body for the AI model API call.
	 *
	 * <p>The generated request follows the expected structure of the AI service,
	 * wrapping the given prompt text inside the appropriate JSON fields.</p>
	 *
	 * @param prompt the input text prompt for the AI model.
	 * @return a {@code Map<String, Object>} representing the request body.
	 *
	 * <p><b>Example output:</b></p>
	 * <pre>{@code
	 * {
	 *   "contents": [
	 *     {
	 *       "parts": [
	 *         {
	 *           "text": "Explain how AI works in a few words"
	 *         }
	 *       ]
	 *     }
	 *   ]
	 * }
	 * }</pre>
	 */
	private Map<String, Object> generateAiGenRequest(String prompt) {
		 return Map.of(
				"contents", new Object[] {
						Map.of("parts", new Object[] { 
								Map.of("text", prompt)
						})
				}
		);
	}

	/**
	 * Builds the prompt for the AI model based on the email request.
	 *
	 * @param emailRequest The email request containing content and tone.
	 * @return The constructed prompt string.
	 */
	private String buildPrompt(EmailRequest emailRequest) {
		StringBuilder promptBuilder = new StringBuilder();
		promptBuilder.append("Generate a proffesional email replay for the following email content."
				+ " Please don't generate a subject line. ");
		if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
			promptBuilder.append("The tone of the email should be " + emailRequest.getTone() + ". ");
		}
		promptBuilder.append("\n Original email: \n" + emailRequest.getEmailContent());
		return promptBuilder.toString();
	}
}
