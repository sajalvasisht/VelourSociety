
document.addEventListener('DOMContentLoaded', () => {


  const header = document.getElementById('main-header');
  const scrollContainer = document.querySelector('.scroll-container');
  
  scrollContainer.addEventListener('scroll', () => {
      if (scrollContainer.scrollTop > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
  
  
  const loginTrigger = document.getElementById('login-trigger');
  const panel = document.getElementById('login-signup-panel');
  const closeBtn = document.getElementById('close-panel-btn');
  const overlay = document.getElementById('page-overlay');
  const showLoginBtn = document.getElementById('show-login-btn');
  const showSignupBtn = document.getElementById('show-signup-btn');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  function openPanel() {
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('panel-open'); 
  }
  
  function closePanel() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('panel-open');
  }

  loginTrigger.addEventListener('click', (event) => {
    event.preventDefault(); 
    openPanel();
  });
  
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });

  showLoginBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    showLoginBtn.classList.add('active'); 
    showSignupBtn.classList.remove('active');
  });

  showSignupBtn.addEventListener('click', () => {
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    showSignupBtn.classList.add('active');
    showLoginBtn.classList.remove('active');
  });
  
  

  const hamburger = document.getElementById('hamburger-menu');
  const mobileNav = document.getElementById('mobile-nav-panel');

  hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
  });
  
  mobileNav.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
          mobileNav.classList.remove('is-open');
      }
  });

});
