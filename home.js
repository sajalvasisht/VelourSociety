document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the forms
    const loginForm = document.querySelector('#login-form form');
    const signupForm = document.querySelector('#signup-form form');

    // 2. Validation utility function
    const validateForm = (form, isSignup) => {
        let isValid = true; // Assume valid until a check fails

        // --- Basic Reset: Clear previous error messages ---
        form.querySelectorAll('.error-message').forEach(err => err.remove());
        form.querySelectorAll('.input-group input').forEach(input => input.classList.remove('input-error'));

        // --- Validation Logic ---

        // Email Validation (for both forms)
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
                displayError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }
        }

        // Password Validation (for both forms)
        const passwordInput = form.querySelector('input[type="password"]');
        if (passwordInput) {
            if (passwordInput.value.length < 8) {
                displayError(passwordInput, 'Password must be at least 8 characters long.');
                isValid = false;
            }
        }

        // Additional Validation for Sign Up Form
        if (isSignup) {
            // Full Name Validation
            const nameInput = form.querySelector('#signup-name');
            if (nameInput && nameInput.value.trim().length < 2) {
                displayError(nameInput, 'Please enter your full name.');
                isValid = false;
            }
        }

        return isValid;
    };

    // 3. Helper function to check email format (simple regex)
    const isValidEmail = (email) => {
        // Simple regex for basic email format check
        return /\S+@\S+\.\S+/.test(email);
    };

    // 4. Helper function to display errors
    const displayError = (inputElement, message) => {
        // Mark the input as erroneous
        inputElement.classList.add('input-error');

        // Create and insert the error message
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        inputElement.parentNode.appendChild(errorMessage);
    };

    // 5. Attach event listeners to forms
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // Stop the form from submitting normally
            e.preventDefault();

            if (validateForm(loginForm, false)) {
                // Form is valid!
                console.log('Login form submitted successfully!');
                // Here you would typically send data to a server using fetch() or XMLHttpRequest
                // For demonstration, we'll just log and could optionally submit: e.currentTarget.submit();
                alert('Login Successful (Simulated)'); 
                loginForm.reset(); // Clear form after 'submission'
            } else {
                console.log('Login form validation failed.');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            // Stop the form from submitting normally
            e.preventDefault();

            if (validateForm(signupForm, true)) {
                // Form is valid!
                console.log('Signup form submitted successfully!');
                // Here you would typically send data to a server
                alert('Sign Up Successful (Simulated)');
                signupForm.reset(); // Clear form after 'submission'
            } else {
                console.log('Signup form validation failed.');
            }
        });
    }

    // --- Panel Toggle UI Logic (For better user experience) ---
    const loginRadio = document.getElementById('login-radio');
    const signupRadio = document.getElementById('signup-radio');
    const loginContent = document.getElementById('login-form');
    const signupContent = document.getElementById('signup-form');

    if (loginRadio && signupRadio && loginContent && signupContent) {
        // Function to update which form is visible
        const updatePanelView = () => {
            if (loginRadio.checked) {
                loginContent.style.display = 'block';
                signupContent.style.display = 'none';
            } else if (signupRadio.checked) {
                loginContent.style.display = 'none';
                signupContent.style.display = 'block';
            }
        };

        // Initial setup
        updatePanelView();

        // Listen for changes on the radio buttons
        loginRadio.addEventListener('change', updatePanelView);
        signupRadio.addEventListener('change', updatePanelView);
    }
});