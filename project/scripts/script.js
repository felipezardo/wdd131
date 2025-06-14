document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      title: "Modern Starbucks-Inspired Website – React, Vite & Styled-Components",
      description: "Responsive institutional website built with React, featuring route-based navigation, dynamic styling using styled-components, and a focus on interactivity and visual experience.",
      url: "https://desafio-final-starbucks-zardo.vercel.app/",
      imageMobile: "images/mobile1.png",
      imageDesktop: "images/desktop1.png"
    },
    {
      title: "L'Oréal Landing Page – Responsive HTML & SCSS",
      description: "A modern, fully responsive landing page inspired by L'Oréal, built with semantic HTML and styled using SCSS. Features clean design, mobile-friendly layout, and modular, maintainable code structure.",
      url: "https://felipezardo.github.io/modulo1-desafioFinal-vnw/",
      imageMobile: "images/mobile2.png",
      imageDesktop: "images/desktop2.png"
    },
    {
      title: "Project 3 - In construction",
      description: "Coming soon",
      url: "#",
      imageMobile: "images/mobile3.png",
      imageDesktop: "images/desktop3.png"
    }
  ];

  // --- Render projects dynamically if on projects page ---
  const pathname = window.location.pathname;
  if (pathname.includes("projects")) {
    const projectsList = document.querySelector(".projects-list");
    projects.forEach((project) => {
      // Create button
      const button = document.createElement("button");
      button.className = "project-toggle hidden-fade";
      button.innerHTML = `<span class="arrow">&#9654;</span> ${project.title}`;

      // Create content div
      const content = document.createElement("div");
      content.className = "project-content hidden";
      content.innerHTML = `
        <div class="project-text">
          <p>${project.description}</p>
          ${project.url !== "#" ? `<a href="${project.url}" target="_blank">See more...</a>` : ""}
        </div>
        <div class="project-images">
          <img src="${project.imageMobile}" alt="${project.title} Mobile" class="project-img-mobile" loading="lazy"/>
          <img src="${project.imageDesktop}" alt="${project.title} Desktop" class="project-img-desktop" loading="lazy"/>
        </div>
      `;

      // Append to projects list
      projectsList.appendChild(button);
      projectsList.appendChild(content);
    });
  }

  // --- Typewriter effect ---
  const line1 = document.getElementById("typewriter-line1");
  const line2 = document.getElementById("zardo-text") || document.getElementById("typewriter-line2");
  const blinkingDot = document.querySelector(".blinking-dot");
  const aboutBtn = document.getElementById("toggleAbout");

  let text1 = "";
  let text2 = "";

  if (pathname.includes("projects")) {
    text2 = "PROJECTS";
  } else if (pathname.includes("contact")) {
    text2 = "CONTACT";
  } else {
    text1 = "{HelloWorld!} I'm";
    text2 = "ZARDO";
  }

  if (blinkingDot) blinkingDot.style.display = "none";
  if (aboutBtn) aboutBtn.style.display = "none";

  let i = 0;
  let j = 0;

  function typeLine1() {
    if (i < text1.length) {
      line1.textContent += text1.charAt(i);
      i++;
      setTimeout(typeLine1, 80);
    } else {
      setTimeout(typeLine2, 300);
    }
  }

  function typeLine2() {
    if (j < text2.length) {
      line2.textContent += text2.charAt(j);
      j++;
      setTimeout(typeLine2, 80);
    } else {
      if (blinkingDot) blinkingDot.style.display = "inline-block";
      if (aboutBtn && (pathname.endsWith("index.html") || pathname === "/" || pathname === "")) {
        aboutBtn.style.display = "inline-block";
        aboutBtn.classList.add("fade-in-up");
      }
      if (pathname.includes("projects")) {
        // Fade-in cascade for project buttons
        const projectToggles = document.querySelectorAll(".project-toggle");
        projectToggles.forEach((btn, idx) => {
          setTimeout(() => {
            btn.classList.remove("hidden-fade");
            btn.classList.add("fade-in-up");
            setTimeout(() => btn.classList.remove("fade-in-up"), 700);
          }, idx * 250);
        });
        
      }
    }
  }

  if (text1) {
    typeLine1();
  } else {
    typeLine2();
  }

  // --- About me toggle with fade-in ---
  if (aboutBtn) {
    aboutBtn.addEventListener("click", function () {
      const content = document.getElementById("aboutContent");
      const arrow = this.querySelector(".arrow");
      const isShowing = content.classList.contains("show");

      if (!isShowing) {
        content.classList.add("fade-in-up");
        setTimeout(() => content.classList.remove("fade-in-up"), 800);
      }

      content.classList.toggle("show");
      content.classList.toggle("hidden");
      arrow.classList.toggle("rotate");
    });
  }

  // --- Project toggles with fade-in ---
  // Use event delegation to handle dynamically created buttons
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".project-toggle");
    if (btn) {
      const content = btn.nextElementSibling;
      const arrow = btn.querySelector(".arrow");
      const isShowing = content.classList.contains("show");

      if (!isShowing) {
        content.classList.add("fade-in-up");
        setTimeout(() => content.classList.remove("fade-in-up"), 800);
      }

      content.classList.toggle("show");
      content.classList.toggle("hidden");
      arrow.classList.toggle("rotate");
    }
  });

  // --- Contact form validation and queue (only on contact page) ---
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let valid = true;

      document.getElementById("nameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("messageError").textContent = "";
      document.getElementById("formSuccess").textContent = "";

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      if (name.value.trim().length < 2) {
        document.getElementById("nameError").textContent = "Please enter a valid name.";
        valid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        valid = false;
      }

      if (message.value.trim().length < 10) {
        document.getElementById("messageError").textContent = "Message must be at least 10 characters.";
        valid = false;
      }

      if (valid) {
        document.getElementById("formSuccess").textContent = "Message sent successfully!";
        form.reset();

        let queuePosition = localStorage.getItem("serviceQueue");
        queuePosition = queuePosition ? parseInt(queuePosition) + 1 : 1;
        localStorage.setItem("serviceQueue", queuePosition);

        const messageDiv = document.getElementById("confirmationMessage");
        if (messageDiv) {
          messageDiv.innerHTML = `
            <p>Thanks, <strong>${name.value}</strong>! You are the number <strong>${queuePosition}</strong> in line to be answered. Soon we will contact you!</p>
          `;
          messageDiv.classList.remove("hidden-message");
        }
      }
    });
  }
});