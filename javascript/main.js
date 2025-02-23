   const sections = document.querySelectorAll("section");
    const nav = document.querySelector("nav");
    let currentTheme = "";

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    }, { threshold: 0.2 });

    sections.forEach(section => sectionObserver.observe(section));

    const navObserver = new IntersectionObserver(entries => {
        let mostVisibleSection = null;
        let highestVisibility = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > highestVisibility) {
                mostVisibleSection = entry.target;
                highestVisibility = entry.intersectionRatio;
            }
        });

        if (mostVisibleSection) {
            updateNavbarColor(mostVisibleSection);
        } else {
            resetNavbarColor();
        }
    }, { threshold: 0.6 });

    sections.forEach(section => navObserver.observe(section));

    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Floating Elements (Petals Effect)
    function createPetal() {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 5 + 3}s`;
        document.body.appendChild(petal);

        setTimeout(() => petal.remove(), 8000);
    }

    setInterval(createPetal, 1000);

    // Adding Floating Petals CSS and Navbar Hover Effect
    const style = document.createElement("style");
    style.innerHTML = `
    .petal {
        position: fixed;
        top: -10px;
        width: 15px;
        height: 15px;
        background: rgba(255, 182, 193, 0.7);
        border-radius: 50%;
        opacity: 0.8;
        animation: fall linear infinite;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh);
        }
    }
    `;
    document.head.appendChild(style);



    document.addEventListener("DOMContentLoaded", function () {
        const contactForm = document.getElementById("contact-form");
    
        if (contactForm) {
            contactForm.addEventListener("submit", async function (event) {
                event.preventDefault();
    
                const name = document.getElementById("name").value.trim();
                const email = document.getElementById("email").value.trim();
                const message = document.getElementById("message").value.trim();
    
                if (!name || !email || !message) {
                    alert("All fields are required.");
                    return;
                }
    
                try {
                    const response = await fetch("/send-message", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, email, message }),
                    });
    
                    const result = await response.json();
                    alert(result.message);
                    contactForm.reset();
                } catch (error) {
                    console.error("Error submitting form:", error);
                    alert("Something went wrong. Please try again later.");
                }
            });
        }
    });
    