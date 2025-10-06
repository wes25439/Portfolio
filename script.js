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
  
  // Enhanced popup handling for Safari and touch devices
  const analyticCircles = document.querySelectorAll('.analytic-circle');
  
  if (analyticCircles.length > 0) {
    // Check if browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    analyticCircles.forEach(circle => {
      // For touch devices and Safari
      circle.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        
        // Remove show class from all other popups
        analyticCircles.forEach(otherCircle => {
          if (otherCircle !== circle) {
            otherCircle.querySelector('.circle-popup')?.classList.remove('show');
          }
        });
        
        // Toggle current popup
        const popup = this.querySelector('.circle-popup');
        if (popup) {
          popup.classList.toggle('show');
        }
      });
      
      // For mouse devices - enhanced hover support
      circle.addEventListener('mouseenter', function() {
        const popup = this.querySelector('.circle-popup');
        if (popup) {
          // Small delay to ensure smooth appearance
          setTimeout(() => {
            popup.classList.add('show');
          }, 100);
        }
      });
      
      circle.addEventListener('mouseleave', function() {
        const popup = this.querySelector('.circle-popup');
        if (popup) {
          popup.classList.remove('show');
        }
      });
      
      // Special handling for Safari
      if (isSafari) {
        // Add specific class for Safari styling if needed
        circle.classList.add('safari');
      }
    });
    
    // Hide popup when touching elsewhere on touch devices
    document.addEventListener('touchstart', function(e) {
      if (!e.target.closest('.analytic-circle')) {
        const popups = document.querySelectorAll('.circle-popup.show');
        popups.forEach(popup => popup.classList.remove('show'));
      }
    }, { passive: true });
    
    // Hide popups when scrolling
    let scrollTimer = null;
    const popups = document.querySelectorAll('.circle-popup');
    
    window.addEventListener('scroll', function() {
      // Hide all popups during scrolling
      popups.forEach(popup => {
        popup.classList.remove('show');
      });
      
      // Show popups again after scrolling stops
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function() {
        // Popups will reappear on hover/touch
      }, 150);
    });
  }
});
// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = contactForm.querySelector('input[placeholder="Full Name"]').value;
            const email = contactForm.querySelector('input[placeholder="Email"]').value;
            const phone = contactForm.querySelector('input[placeholder="Phone Number"]').value;
            const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
            const message = contactForm.querySelector('textarea[placeholder="Your Message"]').value;
            
            // Your WhatsApp number (replace with your actual number)
            const phoneNumber = "254708808854"; 
            
            // Create enhanced message template with emojis and better formatting
            const whatsappMessage = `🌟 *NEW MESSAGE FROM PORTFOLIO* 🌟%0A%0A`
                + `👤 *Name:* ${encodeURIComponent(fullName)}%0A`
                + `📧 *Email:* ${encodeURIComponent(email)}%0A`
                + `📱 *Phone:* ${encodeURIComponent(phone)}%0A`
                + `📌 *Subject:* ${encodeURIComponent(subject)}%0A%0A`
                + `💬 *Message:*%0A${encodeURIComponent(message)}%0A%0A`
                + `---%0A`
                + `📩 *Sent via Portfolio Website*`;
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            
            // Show sending message
            const submitBtn = contactForm.querySelector('input[type="submit"]');
            const originalBtnText = submitBtn.value;
            submitBtn.value = "Sending... 🚀";
            submitBtn.disabled = true;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Show confirmation message
            alert('✅ Thank you! Your message has been sent via WhatsApp. We will get back to you soon. 🙏');
            
            // Reset form and button
            contactForm.reset();
            submitBtn.value = originalBtnText;
            submitBtn.disabled = false;
        });
    }
});