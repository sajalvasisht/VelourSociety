// My JavaScript file for Velour Society
// I'll put all the interactive stuff in here.

// I'm waiting for the whole HTML page to load before I run my script
document.addEventListener('DOMContentLoaded', () => {

  // --- Code for the Header to change color on scroll ---
  
  // First, I need to grab the header and the thing that scrolls
  const header = document.getElementById('main-header');
  const scrollContainer = document.querySelector('.scroll-container');
  
  // Now, I'll listen for when the user scrolls inside the container
  scrollContainer.addEventListener('scroll', () => {
      // If the user has scrolled down more than 50 pixels...
      if (scrollContainer.scrollTop > 50) {
          // ...add the 'scrolled' class to my header.
          header.classList.add('scrolled');
      } else {
          // ...otherwise, remove it.
          header.classList.remove('scrolled');
      }
  });
  
  
  // --- Code for the Login/Signup Panel ---

  // Getting all the buttons and panels I need to work with
  const loginTrigger = document.getElementById('login-trigger');
  const panel = document.getElementById('login-signup-panel');
  const closeBtn = document.getElementById('close-panel-btn');
  const overlay = document.getElementById('page-overlay');
  const showLoginBtn = document.getElementById('show-login-btn');
  const showSignupBtn = document.getElementById('show-signup-btn');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  // A function to open the panel
  function openPanel() {
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('panel-open'); // Stops the background from scrolling
  }
  
  // A function to close the panel
  function closePanel() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('panel-open');
  }

  // Event Listeners for the panel
  loginTrigger.addEventListener('click', (event) => {
    event.preventDefault(); // This stops the '#' from making the page jump
    openPanel();
  });
  
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  
  // Also let the user close it by pressing the Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });

  // Event listeners to switch between Login and Signup forms
  showLoginBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    showLoginBtn.classList.add('active'); // Style for the active button
    showSignupBtn.classList.remove('active');
  });

  showSignupBtn.addEventListener('click', () => {
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    showSignupBtn.classList.add('active');
    showLoginBtn.classList.remove('active');
  });
  
  
  // --- Code for the Mobile Hamburger Menu ---

  const hamburger = document.getElementById('hamburger-menu');
  const mobileNav = document.getElementById('mobile-nav-panel');

  // When the hamburger icon is clicked, show/hide the mobile menu
  hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
  });
  
  // If a link inside the mobile menu is clicked, close the menu
  mobileNav.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
          mobileNav.classList.remove('is-open');
      }
  });

});
