document.addEventListener("DOMContentLoaded", () => {
  // Typewriter effect
  const line1 = document.getElementById("typewriter-line1");
  const line2 = document.getElementById("zardo-text") || document.getElementById("typewriter-line2");
  const blinkingDot = document.querySelector(".blinking-dot");
  const aboutBtn = document.getElementById("toggleAbout");

  // Detect page
  const pathname = window.location.pathname;
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

  // Hide elements before typing
  if (blinkingDot) blinkingDot.style.display = "none";
  if (aboutBtn) aboutBtn.style.display = "none";

  // Esconde os botões dos projetos até o texto ser exibido
  if (pathname.includes("projects")) {
    const projectToggles = document.querySelectorAll(".project-toggle");
    projectToggles.forEach(btn => {
      btn.classList.add("hidden-fade");
    });
  }

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
      // Show blinking dot
      if (blinkingDot) blinkingDot.style.display = "inline-block";
      // Show About button with animation (only on home)
      if (aboutBtn && (pathname.endsWith("index.html") || pathname === "/" || pathname === "")) {
        aboutBtn.style.display = "inline-block";
        aboutBtn.classList.add("fade-in-up");
      }
      // Show project buttons in cascade (only on projects page)
      if (pathname.includes("projects")) {
        const projectToggles = document.querySelectorAll(".project-toggle");
        projectToggles.forEach((btn, idx) => {
          setTimeout(() => {
            btn.classList.remove("hidden-fade");
            btn.classList.add("fade-in-up");
            setTimeout(() => btn.classList.remove("fade-in-up"), 700);
          }, idx * 250); // 250ms de diferença entre cada botão
        });
      }
    }
  }

  // Start typing
  if (text1) {
    typeLine1();
  } else {
    typeLine2();
  }

  // About me toggle with fade-in
  if (aboutBtn) {
    aboutBtn.addEventListener("click", function () {
      const content = document.getElementById("aboutContent");
      const arrow = this.querySelector(".arrow");
      const isShowing = content.classList.contains("show");

      if (!isShowing) {
        content.classList.add("fade-in-up");
        setTimeout(() => content.classList.remove("fade-in-up"), 600);
      }

      content.classList.toggle("show");
      content.classList.toggle("hidden");
      arrow.classList.toggle("rotate");
    });
  }

  // Project toggles with fade-in
  const projectToggles = document.querySelectorAll(".project-toggle");
  projectToggles.forEach((btn) => {
    btn.addEventListener("click", function () {
      const content = btn.nextElementSibling;
      const arrow = btn.querySelector(".arrow");
      const isShowing = content.classList.contains("show");

      if (!isShowing) {
        content.classList.add("fade-in-up");
        setTimeout(() => content.classList.remove("fade-in-up"), 600);
      }

      content.classList.toggle("show");
      content.classList.toggle("hidden");
      arrow.classList.toggle("rotate");
    });
  });

  // Contact form validation and queue (only on contact page)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let valid = true;

      // Reset all messages
      document.getElementById("nameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("messageError").textContent = "";
      document.getElementById("formSuccess").textContent = "";

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      // Name validation
      if (name.value.trim().length < 2) {
        document.getElementById("nameError").textContent = "Please enter a valid name.";
        valid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        valid = false;
      }

      // Message validation
      if (message.value.trim().length < 10) {
        document.getElementById("messageError").textContent = "Message must be at least 10 characters.";
        valid = false;
      }

      // If valid, simulate form submission
      if (valid) {
        document.getElementById("formSuccess").textContent = "Message sent successfully!";
        form.reset();

        // Queue logic
        let queuePosition = localStorage.getItem("serviceQueue");
        queuePosition = queuePosition ? parseInt(queuePosition) + 1 : 1;
        localStorage.setItem("serviceQueue", queuePosition);

        // Confirmation message
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