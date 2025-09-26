document.addEventListener('DOMContentLoaded', function() {

    // --- Ambient Noodle & Lantern Animation ---
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Lantern {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 20 + 20;
            this.speed = Math.random() * 0.5 + 0.2;
            this.color = 'rgba(218, 31, 38, 0.7)';
        }
        update() {
            this.y -= this.speed;
            if (this.y < -this.size) {
                this.y = canvas.height + this.size;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
        }
    }

    class Noodle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -100;
            this.length = Math.random() * 20 + 10;
            this.speed = Math.random() * 1 + 1;
            this.sway = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.y += this.speed;
            this.x += this.sway;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.sway * 5, this.y + this.length);
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 10; i++) {
            particles.push(new Lantern());
        }
        for (let i = 0; i < 50; i++) {
            particles.push(new Noodle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        ctx.shadowBlur = 0;
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // --- Previous functionality ---

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal on Scroll
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Pricing Plan Switcher
    const tabsContainer = document.querySelector(".pricing-tabs");
    if (tabsContainer) {
        tabsContainer.addEventListener("click", function(e) {
            const clicked = e.target.closest(".tab-btn");
            if (!clicked) return;

            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove("active"));
            clicked.classList.add("active");

            const pricingContent = document.querySelector('.pricing-content');
            pricingContent.querySelectorAll('.plan-details').forEach(plan => plan.classList.remove("active"));
            document.getElementById(clicked.dataset.plan).classList.add("active");
        });
    }

    // AI Recipe Maker Modal
    const aiModal = document.getElementById("ai-modal");
    const aiButton = document.getElementById("ai-maker-btn");
    const closeButton = aiModal.querySelector(".close-button");

    aiButton.addEventListener("click", () => aiModal.style.display = "flex");
    closeButton.addEventListener("click", () => aiModal.style.display = "none");
    window.addEventListener("click", (event) => {
        if (event.target == aiModal) {
            aiModal.style.display = "none";
        }
    });

    // The 3D Tilt Effect code block has been removed.

});