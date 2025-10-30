console.log("Email writer extension loaded.");

/**
 * Flag to prevent multiple simultaneous button injections
 * @type {boolean}
 */
let isInjecting = false; 

/**
 * Finds the Gmail compose toolbar element.
 * @returns {HTMLElement|null} The compose toolbar element or null if not found.
 */
function findComposeToolbar() {
    const selectors = [
        'tr.btC',
        '.gU.Up',
        '[role="dialog"]',
        '.aDh'
    ];
    
    for (const selector of selectors) {
        const toolBar = document.querySelector(selector);
        if (toolBar) {
            console.log("Toolbar found with selector:", selector, toolBar);
            return toolBar;
        }
    }
    return null;
}

/**
 * Gets the current email content from the Gmail compose window.
 * @returns {string|null} The email content or null if not found.
 */
function getEmailContent() {
    const selectors = [
        '.a3s.aiL',          
        '.h7',
        'gmail_quote',
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const emailContent = document.querySelector(selector);
        if (emailContent) {
            return emailContent.innerText.trim();
        }
    }
    return null;
}

/**
 * Creates the tone selector dropdown element.
 * @returns {HTMLElement} The tone selector dropdown element.
 */
function createToneSelector() {
    const select = document.createElement('select');
    select.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    select.style.marginRight = '8px';
    select.style.height = '30px';
    select.style.fontSize = '12px';
    select.style.padding = '0 8px';
    select.style.border = '1px solid #dadce0';
    select.style.borderRadius = '4px';
    select.style.backgroundColor = '#f8f9fa';
    select.style.color = '#3c4043';
    select.style.cursor = 'pointer';
    select.setAttribute('data-tooltip', 'Select AI Reply Tone');
    
    const tones = [
        { value: 'professional', text: 'Professional' },
        { value: 'friendly', text: 'Friendly' },
        { value: 'formal', text: 'Formal' },
        { value: 'casual', text: 'Casual' },
        { value: 'polite', text: 'Polite' },
        { value: 'enthusiastic', text: 'Enthusiastic' }
    ];
    
    // Clear any existing options first
    select.innerHTML = '';
    
    tones.forEach((tone, index) => {
        const option = document.createElement('option');
        option.value = tone.value;
        option.textContent = tone.text;
        option.innerText = tone.text; // Fallback for compatibility
        if (tone.value === 'professional') {
            option.selected = true;
        }
        select.appendChild(option);
        console.log(`Added tone option: ${tone.text} (${tone.value})`);
    });
    
    // Debug: Log the number of options added
    console.log(`Tone selector created with ${select.options.length} options`);
    
    return select;
}

/**
 * Creates the AI Reply button element.
 * @returns {HTMLElement} The AI Reply button element.
 */
function createAiButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerText = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    return button;
}

/**
 * Injects the AI Reply button and tone selector into the Gmail compose toolbar.
 * @returns {void}
 */
function injectButton() {
    if (isInjecting) {
        return;
    }
    
    isInjecting = true;
    
    try {
        const existingContainer = document.querySelector('.ai-reply-container');
        if (existingContainer) {
            console.log("AI reply controls already exist.");
            return; 
        }
        
        const toolBar = findComposeToolbar();
        if (!toolBar) {
            console.log("Compose toolbar not found.");
            return;
        }
        
        console.log("Compose toolbar found:", toolBar);
        
        // Create container for tone selector and button
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginRight = '8px';
        container.classList.add('ai-reply-container');
        
        const toneSelector = createToneSelector();
        toneSelector.classList.add('ai-tone-selector');
        
        // Add event listener to debug tone changes
        toneSelector.addEventListener('change', (e) => {
            console.log(`Tone changed to: ${e.target.value}`);
        });
        
        const button = createAiButton();
        button.classList.add('ai-reply-button');
        
        /**
         * Handles the AI Reply button click event.
         * Generates an AI response based on the current email content and selected tone.
         * @async
         * @returns {Promise<void>}
         */
        button.addEventListener('click', async () => {
            const selectedTone = toneSelector.value;
            await fetchAiResponse(button, selectedTone);
        });
        
        container.appendChild(toneSelector);
        container.appendChild(button);
        toolBar.insertBefore(container, toolBar.firstChild);
        
    } finally {
        setTimeout(() => {
            isInjecting = false;
        }, 1000);
    }
}

/**
 * Improved MutationObserver with better detection and debouncing.
 * Monitors the DOM for changes related to Gmail compose windows and triggers button injection.
 * @type {MutationObserver}
 */
const observer = new MutationObserver((mutations) => {
    const relevantMutations = mutations.filter(mutation => {
        if (mutation.addedNodes.length === 0) return false;
        
        return Array.from(mutation.addedNodes).some(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return false;
            
            return node.matches('.aDh, .btC, [role="dialog"]') || 
                   node.querySelector('.aDh, .btC, [role="dialog"]');
        });
    });
    
    if (relevantMutations.length > 0) {
        console.log("A new compose window detected.");
        
        clearTimeout(window.composeDetectionTimeout);
        window.composeDetectionTimeout = setTimeout(() => {
            injectButton();
        }, 300);
    }
});

/**
 * Starts observing the document body for changes.
 * Configured to watch for child list changes and subtree modifications
 * to detect when Gmail compose windows are added to the DOM.
 */
observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: false, 
    characterData: false 
});

/**
 * Initializes the extension when the DOM is ready.
 * Sets up a delayed button injection to ensure Gmail is fully loaded.
 * @returns {void}
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(injectButton, 1000);
    });
} else {
    setTimeout(injectButton, 1000);
}

/**
 * Fetches the AI-generated response for the email content with the specified tone.
 * @param {HTMLElement} button - The AI Reply button element
 * @param {string} tone - The selected tone for the AI response (e.g., 'professional', 'friendly', 'casual')
 * @returns {Promise<void>}
 */
async function fetchAiResponse(button, tone = 'professional') {
    try {
        button.innerText = 'Generating...';
        button.disabled = true;

        const emailContent = getEmailContent();
        const response = await fetch('http://localhost:8080/api/email/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "emailContent": emailContent,
                "tone": tone
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed, status: ${response.status}, statusText: ${response.statusText}`);
        }

        const generatedReply = await response.text();
        const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

        if (composeBox) {
            composeBox.focus();
            document.execCommand('insertText', false, generatedReply);
        } else {
            console.error("Compose box not found.");
        }
    } catch (error) {
        console.error("Error generating AI reply:", error);
        alert("Failed to generate AI reply. Please try again.");
    } finally {
        button.innerText = 'AI Reply';
        button.disabled = false;
    }
}
