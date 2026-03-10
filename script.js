document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar dynamique au scroll
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "0.5rem 5%";
      navbar.style.background = "rgba(13, 15, 26, 0.95)";
      navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    } else {
      navbar.style.padding = "1rem 5%";
      navbar.style.background = "var(--nav-bg)";
      navbar.style.boxShadow = "none";
    }
  });

  // 2. Effet 3D interactif au survol de la souris sur la carte (Glassmorphism)
  const heroVisual = document.querySelector(".hero-visual");
  const glassCard = document.querySelector(".glass-card");

  if (heroVisual && glassCard) {
    heroVisual.addEventListener("mousemove", (e) => {
      // Active l'effet 3D uniquement sur grand écran
      if (window.innerWidth > 768) {
        // Calcule les coordonnées par rapport au centre de la zone
        const rect = heroVisual.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const xAxis = (centerX - e.clientX) / 25;
        const yAxis = (centerY - e.clientY) / 25;

        glassCard.style.transition = "none";
        glassCard.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    });

    heroVisual.addEventListener("mouseleave", () => {
      // Rétablit la position initiale avec une animation douce
      glassCard.style.transition = "transform 0.5s ease";
      glassCard.style.transform =
        "perspective(1000px) rotateY(-5deg) rotateX(5deg)";
    });
  }

  // 3. Apparition des éléments au fil du scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.2, // L'animation se déclenche quand 20% de l'élément est visible
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target); // Arrête d'observer une fois l'élément affiché
      }
    });
  }, observerOptions);

  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    // Configuration initiale avant l'animation
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    // Délai en cascade pour chaque carte (0s, 0.15s, 0.3s...)
    card.style.transition = `opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;

    observer.observe(card);
  });

  // 4. Défilement fluide (Smooth Scroll) personnalisé pour les liens du menu
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Met à jour la classe "active" du menu
        document
          .querySelectorAll(".nav-links a")
          .forEach((a) => a.classList.remove("active"));
        this.classList.add("active");

        // Scroll vers l'élément en tenant compte de la hauteur de la navbar
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
