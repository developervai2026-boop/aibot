const API_URL = '/api/chat';

async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // ইউজারের মেসেজ দেখাও
    addMessage(message, 'user');
    input.value = '';
    
    // লোডিং ইন্ডিকেটর
    const loadingId = addLoadingMessage();
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        removeLoadingMessage(loadingId);
        addMessage(data.reply, 'bot');
        
    } catch (error) {
        removeLoadingMessage(loadingId);
        addMessage('দুঃখিত, কিছু সমস্যা হয়েছে! পরে আবার চেষ্টা করো।', 'bot');
    }
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    messageDiv.innerHTML = `<span>${text}</span>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addLoadingMessage() {
    const messagesDiv = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bot-message';
    loadingDiv.id = 'loading-' + Date.now();
    loadingDiv.innerHTML = '<span>🤔 টাইপ করছি...</span>';
    messagesDiv.appendChild(loadingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return loadingDiv.id;
}

function removeLoadingMessage(loadingId) {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) loadingElement.remove();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
