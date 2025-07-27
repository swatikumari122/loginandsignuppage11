// Global variables
let isLoginMode = true;
const demoUsers = [
    { email: 'admin@eventsphere.com', password: 'admin123', name: 'Admin User' },
    { email: 'demo@eventsphere.com', password: 'demo123', name: 'Demo User' }
];

// DOM elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const switchText = document.getElementById('switch-text');
const switchLink = document.getElementById('switch-link');

// Initialize authentication page
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
    
    // Add input validation
    addInputValidation();
    
    // Add social auth handlers
    addSocialAuthHandlers();
    
    console.log('Authentication page initialized');
});

// Toggle between login and signup modes
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    if (isLoginMode) {
        // Switch to login mode
        showForm(loginForm, signupForm);
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Sign in to your account';
        switchText.innerHTML = `Don't have an account? <span id="switch-link" onclick="toggleAuthMode()">Sign up</span>`;
    } else {
        // Switch to signup mode
        showForm(signupForm, loginForm);
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Join EventSphere today';
        switchText.innerHTML = `Already have an account? <span id="switch-link" onclick="toggleAuthMode()">Sign in</span>`;
    }
}

// Show/hide forms with animation
function showForm(showElement, hideElement) {
    hideElement.classList.add('form-transition');
    
    setTimeout(() => {
        hideElement.style.display = 'none';
        showElement.style.display = 'block';
        showElement.classList.remove('form-transition');
    }, 150);
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Show loading state
    const submitBtn = e.target.querySelector('.auth-btn');
    setLoadingState(submitBtn, true);
    
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check demo credentials
        const user = demoUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store user data
            const userData = {
                email: user.email,
                name: user.name,
                rememberMe: rememberMe,
                loginTime: new Date().toISOString()
            };
            
            if (rememberMe) {
                localStorage.setItem('eventsphere_user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('eventsphere_user', JSON.stringify(userData));
            }
            
            showMessage('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        setLoadingState(submitBtn, false);
    }
}

// Handle signup form submission
async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsAgree = document.getElementById('terms-agree').checked;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Validate password strength
    if (!isValidPassword(password)) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Check if terms are agreed
    if (!termsAgree) {
        showMessage('Please agree to the Terms & Conditions', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.auth-btn');
    setLoadingState(submitBtn, true);
    
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if email already exists
        const existingUser = demoUsers.find(u => u.email === email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        
        // Create new user (in real app, this would be sent to server)
        const newUser = { email, password, name };
        demoUsers.push(newUser);
        
        showMessage('Account created successfully! Please sign in.', 'success');
        
        // Switch to login mode after successful signup
        setTimeout(() => {
            toggleAuthMode();
            document.getElementById('login-email').value = email;
        }, 1500);
        
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        setLoadingState(submitBtn, false);
    }
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Add input validation
function addInputValidation() {
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling on input
            this.classList.remove('error');
        });
    });
}

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Email validation
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    // Password validation
    if (input.type === 'password') {
        isValid = value.length >= 6;
    }
    
    // Name validation
    if (input.type === 'text' && input.id === 'signup-name') {
        isValid = value.length >= 2;
    }
    
    // Required field validation
    if (input.hasAttribute('required')) {
        isValid = isValid && value.length > 0;
    }
    
    // Apply styling
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
    }
    
    return isValid;
}

// Validate password strength
function isValidPassword(password) {
    return password.length >= 6;
}

// Show message to user
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert before forms
    const authCard = document.querySelector('.auth-card');
    const authHeader = document.querySelector('.auth-header');
    authCard.insertBefore(message, authHeader.nextSibling);
    
    // Show with animation
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.classList.remove('show');
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Set loading state for buttons
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.textContent = '';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        if (isLoginMode) {
            button.textContent = 'Sign In';
        } else {
            button.textContent = 'Create Account';
        }
    }
}

// Add social authentication handlers
function addSocialAuthHandlers() {
    const googleBtn = document.querySelector('.social-btn.google');
    const githubBtn = document.querySelector('.social-btn.github');
    
    googleBtn.addEventListener('click', () => {
        showMessage('Google authentication would be implemented here', 'success');
    });
    
    githubBtn.addEventListener('click', () => {
        showMessage('GitHub authentication would be implemented here', 'success');
    });
}

// Check if user is already logged in
function checkExistingAuth() {
    const userData = localStorage.getItem('eventsphere_user') || sessionStorage.getItem('eventsphere_user');
    
    if (userData) {
        const user = JSON.parse(userData);
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const timeDiff = now - loginTime;
        
        // Check if session is still valid (24 hours for localStorage, session for sessionStorage)
        const isValid = localStorage.getItem('eventsphere_user') 
            ? timeDiff < 24 * 60 * 60 * 1000 
            : true;
            
        if (isValid) {
            // Redirect to dashboard if already logged in
            window.location.href = 'dashboard.html';
        } else {
            // Clear expired session
            localStorage.removeItem('eventsphere_user');
            sessionStorage.removeItem('eventsphere_user');
        }
    }
}

// Run auth check on page load
checkExistingAuth();

// Demo credentials helper
function showDemoCredentials() {
    const demoInfo = `
Demo Credentials:
📧 admin@eventsphere.com / admin123
📧 demo@eventsphere.com / demo123
    `;
    
    showMessage(demoInfo.trim(), 'success');
}

// Add demo info button (for development)
document.addEventListener('DOMContentLoaded', function() {
    const authCard = document.querySelector('.auth-card');
    const demoBtn = document.createElement('button');
    demoBtn.textContent = 'Show Demo Credentials';
    demoBtn.className = 'demo-btn';
    demoBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.3);
        color: #6366f1;
        padding: 5px 10px;
        border-radius: 6px;
        font-size: 0.8rem;
        cursor: pointer;
        z-index: 10;
    `;
    demoBtn.onclick = showDemoCredentials;
    authCard.style.position = 'relative';
    authCard.appendChild(demoBtn);
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleAuthMode,
        handleLogin,
        handleSignup,
        togglePassword,
        isValidPassword,
        showMessage
    };
}