
  // Carousel 1: LEFT IN-OUT
  const images1 = document.querySelectorAll('.carousel-img');
  let index1 = 0;

  function showLeftImage(i) {
    images1.forEach(img => {
      img.style.left = '-100%';
      img.style.opacity = 0;
    });

    const img = images1[i];
    img.style.left = '0%';
    img.style.opacity = 1;

    setTimeout(() => {
      img.style.left = '-100%';
      img.style.opacity = 0;
    }, 4000); // 1s in + 3s hold
  }

  function cycleLeftImages() {
    showLeftImage(index1);
    index1 = (index1 + 1) % images1.length;
    setTimeout(cycleLeftImages, 8000);
  }

  cycleLeftImages(); // Start immediately



  // Carousel 2: RIGHT IN-OUT
  const images2 = document.querySelectorAll('.carousel-img2');
  let index2 = 0;

  function showRightImage(i) {
    images2.forEach(img => {
      img.style.right = '-100%';
      img.style.left = 'auto';
      img.style.opacity = 0;
    });

    const img = images2[i];
    img.style.right = '0%';
    img.style.opacity = 1;

    setTimeout(() => {
      img.style.right = '-100%';
      img.style.opacity = 0;
    }, 4000);
  }

  function cycleRightImages() {
    showRightImage(index2);
    index2 = (index2 + 1) % images2.length;
    setTimeout(cycleRightImages, 8000);
  }

  // ⏱ Start second carousel after 4s
  setTimeout(cycleRightImages, 4000);

  
// count 
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');

  const startCounting = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 3000;
    const intervalTime = 20;
    let current = 0;
    const increment = target / (duration / intervalTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.innerText = Math.floor(current) + suffix;
    }, intervalTime);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        if (!counter.classList.contains('counted')) {
          startCounting(counter);
          counter.classList.add('counted'); // So it runs only once
        }
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});


const buttons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.card');
const container = document.querySelector('.cards-container');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    // STEP 1: Store initial positions
    const positions = new Map();
    cards.forEach(card => {
      positions.set(card, card.getBoundingClientRect());
    });

    // STEP 2: Apply filtering classes based on multiple data-category values
    cards.forEach(card => {
      const categoryList = card.dataset.category.split(" "); // space-separated list

      if (filter === 'all' || categoryList.includes(filter)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });

    // STEP 3: Animate using FLIP
    requestAnimationFrame(() => {
      cards.forEach(card => {
        const oldPos = positions.get(card);
        const newPos = card.getBoundingClientRect();

        const dx = oldPos.left - newPos.left;
        const dy = oldPos.top - newPos.top;

        if (dx || dy) {
          card.style.transform = `translate(${dx}px, ${dy}px)`;
          card.style.transition = 'none';

          requestAnimationFrame(() => {
            card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            card.style.transform = '';
          });
        }
      });
    });
  });
});

const carousel = document.querySelector('.campus-carousel');
const boxes = document.querySelectorAll('.campus-box');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentIndex = 0;
const itemsPerView = 4;
const totalGroups = Math.ceil(boxes.length / itemsPerView);

function updateCarousel() {
  const translateX = -(currentIndex * 100) + '%';
  carousel.style.transform = `translateX(${translateX})`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < totalGroups - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});





 const track = document.querySelector('.slider-track');
const cardes = Array.from(track.children);

// Clone first 5 to end
cardes.slice(0, 5).forEach(card => track.appendChild(card.cloneNode(true)));

// mobile Number code 


  
 
// Sample from a JSON list of countries with dial codes :contentReference[oaicite:1]{index=1}
const countryData = [
  { "name": "Afghanistan", "dial_code": "+93", "code": "AF" },
  { "name": "Albania",     "dial_code": "+355", "code": "AL" },
  { "name": "Algeria",     "dial_code": "+213", "code": "DZ" },
  // ... include all 200+ entries from the gist
];

const select = document.getElementById('country-code');
const flagImg = document.getElementById('country-flag');

countryData.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.dial_code;
  opt.textContent = `${c.name} (${c.dial_code})`;
  opt.dataset.code = c.code.toLowerCase();
  select.appendChild(opt);
});

// Update flag when country changes
select.addEventListener('change', () => {
  const countryISO = select.selectedOptions[0].dataset.code;
  flagImg.src = `https://flagcdn.com/w320/${countryISO}.png`;
});

// Optionally, set default selection by locale
(function setDefaultByLocale() {
  const userIso = (navigator.language || 'us').slice(-2).toLowerCase();
  const opt = Array.from(select.options).find(o => o.dataset.code === userIso);
  if (opt) {
    select.value = opt.value;
    flagImg.src = `https://flagcdn.com/w320/${userIso}.png`;
  }
})();

//reusable code // include.js



