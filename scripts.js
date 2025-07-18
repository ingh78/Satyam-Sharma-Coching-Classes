// GSAP Animations
gsap.from(".navbar", { duration: 1, y: -40, opacity: 0, ease: "power2.out" });
gsap.from(".hero-content h1", { duration: 1.2, y: 40, opacity: 0, ease: "power2.out" });
gsap.from(".hero-content p", { duration: 1.2, y: 40, opacity: 0, delay: 0.4, ease: "power2.out" });
gsap.from(".hero-content .btn-cta", { duration: 1.2, y: 40, opacity: 0, delay: 0.8, ease: "power2.out" });
gsap.from(".card", { duration: 0.8, y: 20, opacity: 0, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: "#courses" } });
gsap.from(".tribute-img", { duration: 0.8, scale: 0.9, opacity: 0, ease: "back.out(1.7)", scrollTrigger: { trigger: "#tribute" } });

// Smooth Scrolling
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target.startsWith('#')) {
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = target;
        }
    });
});

// Scroll to Top
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Language Toggle
const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('change', () => {
    const lang = langToggle.value;
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.style.display = el.getAttribute('data-lang') === lang ? 'block' : 'none';
    });
});
// Navbar scroll animation
const header = document.getElementById("myHeader");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Form Submission (Client-Side)
document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const message = form.querySelector('textarea[name="message"]').value;

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, message })
            });
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                alert('Error sending message. Please try again.');
            }
        } catch (error) {
            alert('Error connecting to server. Please try again later.');
        }
    });
});
