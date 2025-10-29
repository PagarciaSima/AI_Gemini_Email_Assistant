
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

    /**
     * Generates a professional email reply using an AI model.
     *
     * @param emailRequest The email request containing content and tone.
     * @return The generated email reply as a String.
     */
    public String generateEmailReplay(EmailRequest emailRequest) {
        log.info("Starting email reply generation.");
        String prompt = buildPrompt(emailRequest);
        log.info("Prompt for AI model: {}", prompt);

        Map<String, Object> requestBody = generateAiGenRequest(prompt);
        log.debug("Request body for AI model: {}", requestBody);

        String response;
        try {
            response = this.webClientBuilder.build().post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
            log.info("Received response from AI model.");
        } catch (Exception ex) {
            log.error("Error during API call to AI model: {}", ex.getMessage(), ex);
            return "Error during API call: " + ex.getMessage();
        }

        return extractResponseContent(response);
    }

    /**
     * Extracts the email reply content from the AI model response.
     *
     * @param response The raw response from the AI model.
     * @return The extracted email reply text.
     */
    private String extractResponseContent(String response) {
        log.debug("Extracting response content from AI model response.");
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
            String result = rootNode.path("candidates").get(0)
                .path("content")
                .path("parts").get(0)
                .path("text")
                .asText();
            log.info("Successfully extracted email reply from response.");
            return result;
        } catch (Exception e) {
            log.error("Error processing AI model response: {}", e.getMessage(), e);
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
        log.debug("Building AI model request body.");
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
        log.debug("Building prompt for email request.");
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("Generate a proffesional email replay for the following email content."
            + " Please don't generate a subject line. ");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            promptBuilder.append("The tone of the email should be " + emailRequest.getTone() + ". ");
        }
        promptBuilder.append("\n Original email: \n" + emailRequest.getEmailContent());
        log.debug("Prompt built: {}", promptBuilder.toString());
        return promptBuilder.toString();
    }
}
