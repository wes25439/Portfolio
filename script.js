// Text animation code
const words = [
  "Frontend Designer",
  "Web Designer....",
  "UI/UX Designer",
  "Web Developer..",
  "Software Tester",
  "Cloud Practitioner"
];

let wordIndex = 0;
let letterIndex = 0;
const spanElement = document.querySelector(".text-animation span");

function typeText() {
  if (letterIndex < words[wordIndex].length) {
    spanElement.textContent += words[wordIndex][letterIndex];
    letterIndex++;
    setTimeout(typeText, 150); // Typing speed
  } else {
    setTimeout(eraseText, 2000); // Pause before erasing
  }
}

function eraseText() {
  if (letterIndex > 0) {
    spanElement.textContent = words[wordIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(eraseText, 100); // Erasing speed
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeText, 500); // Pause before next word
  }
}

// Start text animation only if span element exists
if (spanElement) {
  typeText();
}

// Skills Chart and all other functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize skill bars animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const targetWidth = parseInt(bar.getAttribute('data-width'));
      const percentageElement = bar.parentElement.previousElementSibling.querySelector('.skill-percentage');
      
      let currentWidth = 0;
      const increment = targetWidth / 50; // Animation steps
      const intervalTime = 30; // ms per step
      
      const interval = setInterval(() => {
        currentWidth += increment;
        if (currentWidth >= targetWidth) {
          currentWidth = targetWidth;
          clearInterval(interval);
        }
        
        // Update both the bar width and the percentage text simultaneously
        bar.style.width = `${currentWidth}%`;
        percentageElement.textContent = `${Math.round(currentWidth)}%`;
      }, intervalTime);
    });
  }
  
  // Trigger animation when skills section is in view
  const skillsSection = document.querySelector('.about');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target); // Run only once
      }
    });
  }, { threshold: 0.5 });
  
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // Mobile menu toggle - SINGLE IMPLEMENTATION
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.querySelector(".navbar");

  // Function to close menu
  function closeMenu() {
    if (navbar && menuIcon) {
      navbar.classList.remove("show");
      // Reset icon to hamburger menu
      if (menuIcon.classList.contains("bx-x")) {
        menuIcon.classList.replace("bx-x", "bx-menu");
      } else {
        menuIcon.classList.remove("open");
      }
    }
  }

  // Toggle menu
  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
      navbar.classList.toggle("show");
      
      // Toggle between hamburger and X icons
      if (menuIcon.classList.contains("bx-menu")) {
        menuIcon.classList.replace("bx-menu", "bx-x");
      } else if (menuIcon.classList.contains("bx-x")) {
        menuIcon.classList.replace("bx-x", "bx-menu");
      } else {
        menuIcon.classList.toggle("open");
      }
    });

    // Close nav when a link is clicked (mobile)
    navbar.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  // Hide menu when scrolling
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateMenuVisibility() {
    // Close menu if it's open while scrolling
    if (navbar && navbar.classList.contains("show")) {
      closeMenu();
    }
    
    ticking = false;
  }

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateMenuVisibility);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
        // Close menu after navigation
        closeMenu();
      }
    });
  });
});