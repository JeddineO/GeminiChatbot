const sendButton = document.getElementById('send-btn');
const deleteButton = document.getElementById('delete-btn');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

async function sendMessageToServer(message) {
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: message })
        });

        if (!response.ok) {
            throw new Error('Failed to generate message');
        }

        const data = await response.json();
        const generatedMessage = data.response;
        var messagesContainer = document.getElementById("messages");
        var lastChild = messagesContainer.lastChild;
        if (lastChild) {
            messagesContainer.removeChild(lastChild);
        }
        appendMessage('AI', generatedMessage, 'other-message');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        appendMessage('You', messageText, 'own-message');
        sendMessageToServer(messageText); // Send message to server for generation
        messageInput.value = '';
        appendMessage('AI', 'Writing...', 'other-message');

    }
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


deleteButton.addEventListener('click', deleteMessages);


async function deleteMessages() {
    const response = await fetch('/delete');
    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }

    messagesContainer.innerHTML = "";
    appendMessage("AI", " Hello there! How may I assist you today?", 'other-message');


}
function appendMessage(sender, message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.innerHTML = `<p class="message-text"><strong>${sender}:</strong> ${message}</p>`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function fetchMessages() {
    try {
        const response = await fetch('/msg');
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const messages = await response.json();
        // Append fetched messages to the container
        messages.forEach(message => {
            if (message.sender == "AI")
                appendMessage(message.sender, message.message, 'other-message');
            else
                appendMessage(message.sender, message.message, 'own-message');


        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
appendMessage("AI", " Hello there! How may I assist you today?", 'other-message');
fetchMessages();

