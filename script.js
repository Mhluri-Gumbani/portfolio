// Theme Toggle
const themeToggle = document.getElementById('toggleTheme');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  
  if (document.body.classList.contains('dark')) {
    icon.className = 'fas fa-sun';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    icon.className = 'fas fa-moon';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.querySelector('i').className = 'fas fa-bars';
  });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Show success message
  toastMessage.textContent = 'Message prepared! Opening email client...';
  toast.classList.add('show');
  
  // Prepare mailto link
  const mailtoLink = `mailto:Mhlurinovela801@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  
  // Open email client
  setTimeout(() => {
    window.location.href = mailtoLink;
  }, 1500);
  
  // Hide toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
  
  // Clear form
  setTimeout(() => {
    contactForm.reset();
  }, 1000);
});

// Download CV buttons
const downloadCVBtns = document.querySelectorAll('#downloadCV, #downloadCVBtn');

downloadCVBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toastMessage.textContent = 'CV download initiated!';
    toast.classList.add('show');
    
    // Simulate download (replace with actual CV file)
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = 'Professional_CV_Contact.pdf';
      link.download = 'Professional_CV_Contact.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  
  // Update active nav link
  updateActiveNavLink();
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').className = 'fas fa-bars';
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Section fade-in animation
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});

// Update active nav link on scroll
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;
  
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) {
      if (section.offsetTop <= scrollPosition && 
          section.offsetTop + section.offsetHeight > scrollPosition) {
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// Initialize active nav link
updateActiveNavLink();

// Add hover effects to cards on touch devices
if ('ontouchstart' in window) {
  document.querySelectorAll('.card, .project, .service').forEach(element => {
    element.addEventListener('touchstart', function() {
      this.classList.add('touched');
    });
    
    element.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('touched');
      }, 150);
    });
  });
}

// Skills animation on hover
document.querySelectorAll('.skill').forEach(skill => {
  skill.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  skill.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Print functionality
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
    window.print();
  }
});

// Load images with fallback
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    if (this.classList.contains('profile-img')) {
      this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80';
    }
  });
});