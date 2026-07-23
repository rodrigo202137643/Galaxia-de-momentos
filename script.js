document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const introScreen = document.getElementById("intro-screen");
  const mainUniverse = document.getElementById("main-universe");
  const spotifyPlayer = document.getElementById("spotify-player");

  // Transición y activación de audio
  startBtn.addEventListener("click", () => {
    introScreen.style.display = "none";
    mainUniverse.style.display = "block";
    
    // Forzar reproducción del iframe si el navegador lo permite
    let iframeSrc = spotifyPlayer.src;
    spotifyPlayer.src = iframeSrc; 

    initGalaxy();
  });

  // Control de las tarjetas
  const icons = document.querySelectorAll('.icon');
  const closeBtns = document.querySelectorAll('.close-btn');

  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      const modalId = icon.getAttribute('data-modal');
      document.getElementById(modalId).classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.closest('.modal').classList.remove('active');
    });
  });

  // Generador visual de la Galaxia Rosa
  function initGalaxy() {
    const canvas = document.getElementById("galaxy-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const colors = ['#ff0066', '#ff4da6', '#ff99cc', '#ffffff'];

    class Particle {
      constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.distance = Math.random() * (canvas.width > canvas.height ? canvas.width : canvas.height);
        this.angle = Math.random() * Math.PI * 2;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = (Math.random() * 0.01) + 0.002;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.angle += this.speed;
        this.distance -= 0.5; // Efecto de absorción hacia el centro
        
        if (this.distance < 10) {
          this.distance = Math.random() * (canvas.width / 1.5);
          this.angle = Math.random() * Math.PI * 2;
        }

        this.x = canvas.width / 2 + Math.cos(this.angle) * this.distance;
        this.y = canvas.height / 2 + Math.sin(this.angle) * this.distance;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    for (let i = 0; i < 400; i++) {
      particlesArray.push(new Particle());
    }

    function animate() {
      ctx.fillStyle = 'rgba(3, 0, 5, 0.1)'; // Estela oscura para efecto de remolino
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
});