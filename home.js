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
document.addEventListener('DOMContentLoaded', () => {
    const payNowButton = document.getElementById('pay-now-btn');
    const paymentForm = document.getElementById('payment-details-form'); // Assume a form ID

    if (payNowButton && paymentForm) {
        payNowButton.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default form submission

            // 1. Basic Client-Side Validation (e.g., check for valid card format, required fields)
            if (!validatePaymentFields()) {
                alert('Please fill in all required payment details correctly.');
                return;
            }

            // 2. Simulate API Call to create a token (This is where a real API script would run)
            console.log('Attempting to process payment...');
            
            // In a REAL integration (e.g., Stripe, Adyen):
            // The API's JavaScript library (e.g., Stripe.js) would securely collect
            // card data from the input fields, send it directly to the API server,
            // and return a secure, non-sensitive 'token' or 'payment ID'.
            
            const simulatedToken = 'tok_velour_1A2B3C4D5E6F';

            // 3. Simulate Sending Token to Your Server (The crucial step)
            // This is the XHR/Fetch request your frontend sends to your backend.
            processPaymentOnServer(simulatedToken)
                .then(response => {
                    if (response.success) {
                        alert('✅ Payment Successful! Redirecting to confirmation page...');
                        window.location.href = 'order-confirmation.html'; // Redirect on success
                    } else {
                        alert(`❌ Payment Failed: ${response.message}`);
                    }
                })
                .catch(error => {
                    console.error('Network or Server Error:', error);
                    alert('An error occurred. Please try again.');
                });
        });
    }

    // --- Helper Functions ---

    function validatePaymentFields() {
        // Implement robust client-side validation for card number, expiry, CVC, etc.
        // For simulation, we'll just check if the form is generally filled.
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        
        return cardNumber.length > 15 && expiryDate.length > 3; // Basic check
    }

    function processPaymentOnServer(token) {
        // This function SIMULATES the API call to your own backend server.
        // Your server would receive the 'token' and then communicate with the
        // Payment Gateway (Stripe/PayPal) server to finalize the charge.
        
        return new Promise((resolve) => {
            // Simulate a 2-second server processing delay
            setTimeout(() => {
                // Simulate success 80% of the time, failure 20%
                const isSuccess = Math.random() < 0.8; 

                if (isSuccess) {
                    resolve({
                        success: true,
                        orderId: 'VRS' + Math.floor(Math.random() * 100000)
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Card declined by bank or insufficient funds.'
                    });
                }
            }, 2000); // 2 seconds delay
        });
    }
});