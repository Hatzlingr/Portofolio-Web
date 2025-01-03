// keep track of previous scroll position
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function () {
    // current scroll position
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        // user has scrolled up
        document.querySelector('.navbar').classList.add('show');
    } else {
        // user has scrolled down
        document.querySelector('.navbar').classList.remove('show');
    }

    // update previous scroll position
    prevScrollPos = currentScrollPos;
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section');
const navLinksA = document.querySelectorAll('.nav-links a');
function setActiveLink() {
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute('id');

        // Jika bagian terlihat di viewport
        if (rect.top <= 150 && rect.bottom >= 150) {
            navLinksA.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', setActiveLink);

// Home
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animasi Saat Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

// Elemen yang Diamati
const elementsToAnimate = document.querySelectorAll('.profile-image, .intro-text, .about-header, .about-content, .timeline-wrapper, .timeline-box, .timeline-heading, .skill-header, .skill-tech, .project-header, .project-content');
elementsToAnimate.forEach(el => observer.observe(el));


// for Typewriter effect

const texts = [
    "Student",
    "Programmer",
    "Designer"
]

let speed = 100;

const textElements = document.querySelector(".typewriter-text")

let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
    if (charcterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else {
        setTimeout(eraseText, 1000)
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1)
        setTimeout(eraseText, 50)
    }
    else {
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

window.onload = typeWriter;

// Typerwritter About
const textAbout = "Hi, I'm Amirul Nur Cahyo, but you can call me Amir. I am a Web Developer with skills in Java, JavaScript, and Python. Currently, I am pursuing my studies in Informatics Engineering at Universitas Sriwijaya, while continuously learning and improving my programming skills. My goal is to become a skilled and proficient programmer, and I’m passionate about creating impactful web solutions. I am always eager to take on new challenges and collaborate on exciting projects. Feel free to reach out if you’d like to connect!"; // Teks yang akan diketik
let i = 0;
const speedAbout = 30; // Kecepatan pengetikan (dalam milidetik)
const elementAbout = document.getElementById("typewriter-about");

function typeWriter2() {
  if (i < textAbout.length) {
    elementAbout.innerHTML += textAbout.charAt(i); // Menambahkan karakter satu per satu
    i++;
    setTimeout(typeWriter2, speedAbout); // Memanggil fungsi lagi setelah waktu yang ditentukan
  }
}

typeWriter2(); 

// Carousel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

let currentIndex = 1; // Mulai dari slide pertama asli
const slideWidth = slides[0].getBoundingClientRect().width;

// Clone slide pertama dan terakhir
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Tambahkan clone ke track
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Perbarui daftar slides dengan clones
const updatedSlides = Array.from(track.children);

// Atur posisi awal slider
track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

// Fungsi untuk memindahkan slider
const moveToSlide = (index, smooth = true) => {
    track.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;
};

// Fungsi untuk menangani loop
const handleInfiniteLoop = () => {
    if (currentIndex === 0) {
        // Jika di clone terakhir, lompat ke slide terakhir asli
        moveToSlide(updatedSlides.length - 2, false);
    }
    if (currentIndex === updatedSlides.length - 1) {
        // Jika di clone pertama, lompat ke slide pertama asli
        moveToSlide(1, false);
    }
};

// Event listeners untuk tombol
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % updatedSlides.length; // Loop slide
    moveToSlide(currentIndex);
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + updatedSlides.length) % updatedSlides.length; // Loop slide
    moveToSlide(currentIndex);
});

// Event listener untuk menangani transisi loop
track.addEventListener('transitionend', handleInfiniteLoop);

// Auto-play functionality
let autoPlay = setInterval(() => {
    currentIndex = (currentIndex + 1) % updatedSlides.length;
    moveToSlide(currentIndex);
}, 3000); // Change every 3 seconds

// da
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-progress');

    const isInViewPort = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const animateSkillBars = () => {
        skillBars.forEach((skillBar) => { // Mengganti nama parameter
            if (isInViewPort(skillBar)) {
                const percent = skillBar.getAttribute("data-percent");
                skillBar.style.setProperty("--percent", `${percent}%`);
                skillBar.classList.add("animate");
                setTimeout(() => {
                    skillBar.style.width = `${percent}%`; // Menambahkan % untuk style.width
                }, 1000);
            }
        });
    };

    // Jalankan animasi saat halaman dimuat
    animateSkillBars();

    // Tambahkan event listener untuk scroll
    window.addEventListener('scroll', animateSkillBars);
});


document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer');
    const socialIcons = document.querySelectorAll('.social-icon');

    // Animate social icons on hover
    socialIcons.forEach((icon) => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2)';
        });

        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
        });
    });

    // Change footer color on scroll
    
});


  