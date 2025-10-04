const words = [
  "Frontend Designer",
  "Web Designer",
  "UI/UX Designer",
  "Web Developer",
  "Software Tester"
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

typeText();

// Skills Chart

// Skills Chart
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
});

/* ============ Mobile menu toggle ============ */
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("show");
    menuIcon.classList.toggle("open");
  });

  // Close nav when a link is clicked (mobile)
  navbar.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navbar.classList.remove("show");
      menuIcon.classList.remove("open");
    });
  });
}

