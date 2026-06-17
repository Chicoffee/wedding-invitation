//Up-btn effect
const upBtn = document.querySelector(".up-btn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        upBtn.classList.add("show");
    } else {
        upBtn.classList.remove("show");
    }
});

//Countdown Timer
const Days = document.getElementById('days');
const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');

const targetDate = new Date("August 27 2026 00:12:30").getTime();

function timer () {
    const currentDate = new Date().getTime();
    const distance = targetDate - currentDate;

    const days = Math.floor(distance / 1000 / 60 / 60/ 24);
    const hours = Math.floor(distance / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(distance / 1000 / 60) % 60;
    const seconds = Math.floor(distance / 1000) % 60;

    Days.innerHTML = days;
    Hours.innerHTML = hours;
    Minutes.innerHTML = minutes;
    Seconds.innerHTML = seconds;

    if(distance < 0){
        Days.innerHTML = "00";
        Hours.innerHTML = "00";
        Minutes.innerHTML = "00";
        Seconds.innerHTML = "00";
    }
}

setInterval(timer, 1000);

//Falling Leaves Animation
const container = document.getElementById('leaves');
const leafImages = ['./assets/leaves/leaf.png', './assets/leaves/leaf2.png', './assets/leaves/leaf3.png', './assets/leaves/leaf4.png'];

const colorFilters = [
  "grayscale(1) sepia(1) hue-rotate(320deg) saturate(4.0) brightness(0.6)",   // deep burgundy
  "grayscale(1) sepia(1) hue-rotate(10deg) saturate(3.5) brightness(0.55)",   // dark crimson
  "grayscale(1) sepia(1) hue-rotate(25deg) saturate(3.0) brightness(0.58)",   // brick red
  "grayscale(1) sepia(1) hue-rotate(340deg) saturate(3.8) brightness(0.5)",   // dark wine
  "grayscale(1) sepia(1) hue-rotate(350deg) saturate(2.8) brightness(0.65)"   // russet
];

function createLeaf() {
    const leaf = document.createElement('img');
    leaf.className = 'leaf';

    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15; 
    const size = Math.random() * 18 + 26;    
    const rotation = Math.random() * 100 - 50;
            
    const randomImage = leafImages[Math.floor(Math.random() * leafImages.length)];
    const randomFilter = colorFilters[Math.floor(Math.random() * colorFilters.length)];

    leaf.src = randomImage;
    leaf.style.left = `${left}vw`;
    leaf.style.width = `${size}px`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.transform = `rotate(${rotation}deg)`;
    leaf.style.filter = randomFilter;

    container.appendChild(leaf);


    setTimeout(() => {
        leaf.remove();
        }, duration * 1000 + 4000);
    }

    setInterval(createLeaf, 700);

//slider image
const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides");

let slideIndex = 0;
let intervalId = null;

//initializeSlider();
document.addEventListener("DOMContentLoaded", () => {
    showSlide(slideIndex);
    intervalId = setInterval(nextSlide, 3000);
});

function showSlide(index) {

    if(index >= slides.length) {
        slideIndex = 0;
    } else if(index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }

    slidesContainer.style.transform = 
        `translateX(-${slideIndex * 100}%)`;

           console.log(slidesContainer.style.transform);
}

function nextSlide() {
    console.log("Next Slide");
    slideIndex++;
    showSlide(slideIndex);
}

//Intro sequence: monogram -> welcome -> hero
window.addEventListener('load', () => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const intro = document.getElementById('intro');
    const stageMonogram = document.getElementById('stage-monogram');
    const stageWelcome = document.getElementById('stage-welcome');

    stageMonogram.classList.add('active');

    setTimeout(() => {
        stageMonogram.classList.remove('active');
        stageWelcome.classList.add('active');
    }, 4200);

    setTimeout(() => {
        intro.classList.add('hide');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }, 7000);
});

//Popup
function togglePopup(id) {
    document.getElementById(id).classList.toggle('active');
}

document.getElementById('attending').addEventListener('change', function () {
    const isYes = this.value === 'yes';
    document.getElementById('guestSection').style.display = isYes ? '' : 'none';
    document.getElementById('guestNamesSection').style.display = isYes ? '' : 'none';
});