'use strict';
if (typeof window === 'undefined') {
  console.log("This module needs a browser to run!");
  process.exit();
}

//////////////////
// Advanced DOM //
//////////////////

// selectCreateDelete()
function selectCreateDelete() {
  // Selecting
  console.log(document.documentElement);
  console.log(document.head);
  console.log(document.body);

  console.log(document.querySelector('.header'));
  console.log(document.querySelectorAll('.section'));

  console.log(document.getElementById('section--1'));
  console.log(document.getElementsByTagName('button'));
  console.log(document.getElementsByClassName('btn'));

  // Creating and Inserting
  const message = document.createElement('div');
  message.classList.add('cookie-message');
  // message.textContent = "We use cookies for improved functionality and analytics.";
  message.innerHTML = "We use cookies for improved functionality and analytics. <button class='btn" +
    " btn--close-cookie'> Got it!</button>";
  console.log(message);

  document.querySelector('.header').prepend(message);
  // An element can only be inserted to one place, to show it at more places, clone it before assigning a position
  document.querySelector('.header').append(message.cloneNode(true));

  // To create sibling elements
  document.querySelector('.header').before(document.createElement('div').textContent = "BEFORE");
  document.querySelector('.header').after(document.createElement('div').textContent = "AFTER");

  // To remove elements
  document.querySelectorAll('.btn--close-cookie').forEach((btn) => {
    btn.addEventListener('click', () => message.remove());
  });
}

// stylesAttribsClasses();
function stylesAttribsClasses() {
  // styles
  const message = document.createElement('div');
  message.classList.add('cookie-message');
  message.textContent = "We use cookies for improved functionality and analytics.";
  document.querySelector('.header').append(message);

  /* Use dot style setters to edit the style */
  message.style.backgroundColor = '#37383d';
  message.style.width = "120%";

  /* `Dot` Style getters only work for inline styles */
  console.log(message.style.width);
  console.log(message.style.height);

  /* Use getComputedStyle to get all styles of an element */
  console.log(getComputedStyle(message).color);
  console.log(getComputedStyle(message).height);
  message.style.height = Number.parseInt(getComputedStyle(message).height) + 20 + "px";
  console.log(getComputedStyle(message).height);

  /* Set CSS root (JavaScript DocumentElement) style */
  document.documentElement.style.setProperty('--color-primary', 'yellow ');

  // Attributes
  const logo = document.querySelector('.nav__logo');
  console.log(logo.alt);
  console.log(logo.src);
  console.log(logo.className); // It's just element's class

  /* Dot getter wouldn't work for non-standard attributes for an element */
  console.log(logo.designer);
  console.log(logo.getAttribute('designer')); // Use getAttribute to set non-standard attribute
  console.log(logo.src); // This gets the absolute source
  console.log(logo.getAttribute('src')); // Use getAttribute to get relative src
  logo.setAttribute("Institution", "Northeastern");
  // Attributes that starts with `data-` is under {this}.dataset. Dashes are omitted camel case is applied instead.
  console.log(logo.dataset.versionNumber);
}

// eventPropagation();
function eventPropagation() {
  const randomColor = () => `rgb(${Math.floor(Math.random() * 255 + 1)},
                                 ${Math.floor(Math.random() * 255 + 1)},${Math.floor(Math.random() * 255 + 1)})`;
  document.querySelector('.nav__links').querySelectorAll('.nav__link').forEach(el => el.href = "#");
  document.querySelector('.nav').addEventListener('click', function (e) {
    e.currentTarget.style.backgroundColor = randomColor();
  });
  document.querySelector('.nav__links').addEventListener('click', function (e) {
    // `this` & `e.currentTarget` are equivalent, both referring to the element that the listener attached to
    // As arrow function cannot access current level's `this`, use `this` only when using declared handler functions
    e.currentTarget.style.backgroundColor = randomColor();

    // `e.target` refers to the origination of the event.
    e.target.style.backgroundColor = randomColor();

    // To stop event propagation at the current level
    e.stopPropagation();
  });

  /* addEventHandler accepts a third parameter, indicating if (or not) the event is triggered during the capturing
   phase from parent to children (otherwise during the bubbling phase from children to parent). If it's on, use it
    with stopPropagation at the parent level can stop children element to accept the event. */
}

// domTraversal();
function domTraversal() {
  const h1 = document.querySelector('h1');

  // Traversing down
  console.log('----------------DN----------------');
  console.log(h1.querySelectorAll('.highlight'));
  console.log(h1.childNodes);
  console.log(h1.children);
  h1.firstElementChild.style.color = "white";
  h1.lastElementChild.style.color = "orangered";

  // Traversing up
  console.log('----------------UP----------------');
  console.log(h1.parentNode);
  console.log(h1.parentElement);
  console.log(h1.closest('.header'));
  h1.closest('.header').style.background = "var(--gradient-secondary)";
  //// Looking for the closest element with the same element type of the caller will be the element itself.
  //// Failed to find such an element will return null
  console.log(h1.closest('h1'));

  // Traversing sideways
  console.log('----------------SD----------------');
  console.log(h1.previousElementSibling);
  console.log(h1.nextElementSibling);
  console.log(h1.previousSibling);
  console.log(h1.nextSibling);
  console.log(h1.parentElement.children);
}

// IntersectionObserverAPI();
function IntersectionObserverAPI() {
  // entries is a list structure of one entry
  const obsCallback = (entries, observer) => {
    entries.forEach(entry => console.log(entry));
    console.log(observer);
  };
  const obsOptions = {
    root: null, // set to null to observe the target intersecting the entire viewport
    threshold: 0.1, // use a list to observe multiple thresholds
  };
  // Notice IO's default behavior -- the callback will be fired immediately on page load
  const observer = new IntersectionObserver(obsCallback, obsOptions);
  const section1 = document.querySelector('#section--1');
  observer.observe(section1);
}

/////////////////////
// Web Application //
/////////////////////

// 0. Element Selection & Modal Window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((trig) => {
  trig.addEventListener('click', openModal);
})
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// 1. Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', (e) => {
  // developing();
  function developing() {
    console.log(e.target.getBoundingClientRect());
    console.log(section1.getBoundingClientRect());
    console.log('Current scroll (X/Y) [deprecated]', window.pageXOffset, window.pageYOffset);
    console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  }

  // deprecated();
  function deprecated() {
    window.scrollTo({
      left: section1.getBoundingClientRect().left + window.pageXOffset,
      top: section1.getBoundingClientRect().top + window.pageYOffset,
      behavior: "smooth"
    });
  }

  // Modern
  section1.scrollIntoView({behavior: "smooth"});
});

// 2. Events Delegation
/* 1. Add event listener to common parent element
   2. Determine what element originated the event */
document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.classList.contains('nav__link') ||
    !e.target.getAttribute('href') ||
    e.target.getAttribute('href').length <= 1) return;
  document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
});

// 3. Tab Selections
document.querySelector('.operations__tab-container').addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  document.querySelector('.operations__tab--active').classList.remove('operations__tab--active');
  clicked.classList.add('operations__tab--active');
  document.querySelector('.operations__content--active').classList.remove('operations__content--active');
  const currContent = `.operations__content--${clicked.getAttribute('data-tab')}`;
  document.querySelector(currContent).classList.add('operations__content--active');
});

// 4. Menu fade animation
const fadeoutHandler = (e, op) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = op;
      }
      logo.style.opacity = op;
    });
  }
};
nav.addEventListener('mouseover', e => {
  fadeoutHandler(e, 0.5);
});
nav.addEventListener('mouseout', e => {
  fadeoutHandler(e, 1);
});

// x. Sticky navigation with scroll bar -- INEFFICIENT
// barStickyNav()
function barStickyNav() {
  window.addEventListener('scroll', () => {
    const initialCoords = section1.getBoundingClientRect();
    if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
}

// 5. Sticky navigation with Intersection Observer API
const header = document.querySelector('.header');
const headerObserver = new IntersectionObserver(
  ([entry]) => {entry.isIntersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky');},
  {root: null, threshold: 0, rootMargin: `-${nav.getBoundingClientRect().height}px`});
headerObserver.observe(header);

// 6. Reveal sections
const sectionObserver = new IntersectionObserver(([entry], observer) => {
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
}, {root: null, threshold: 0.15,});
document.querySelectorAll('.section').forEach(sec => {
  sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
})

// 7. Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const imgObs = new IntersectionObserver(([entry], observer) => {
  if (!entry.isIntersecting) return;
  const target = entry.target;
  target.setAttribute('src', target.dataset.src);
  target.addEventListener('load', () => {
    target.classList.remove('lazy-img');
  })
  imgObs.unobserve(target);
}, {root: null, threshold: 1, rootMargin: '100px',});
imgTargets.forEach(img => imgObs.observe(img));

// 8. Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide = "${i}"></button>`);
  });
  dotContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('dots__dot')) return;
    const slide = e.target.dataset.slide;
    currentSlide = slide;
    goToSlide(slide);
  });
}
createDots();

const goToSlide = (targetSlide) => {
  slides.forEach((s, i) => s.style.transform = `translateX(${(i - targetSlide) * 100}%)`);
  dotContainer.querySelector('.dots__dot--active')?.classList.remove('dots__dot--active');
  document.querySelector(`.dots__dot[data-slide="${targetSlide}"]`).classList.add('dots__dot--active');
}
let currentSlide = 0;
goToSlide(currentSlide);

const nextSlide = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}
const prevSlide = () => {
  currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  goToSlide(currentSlide);
}
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') {prevSlide();}
  if (e.key === 'ArrowRight') {nextSlide();}
});

// 9. Lifecycle DOM Events
// DOMContentLoaded
// This is not normally used because the script tag is at the end of the HTML document -- as it loads, the tree is built
document.addEventListener("DOMContentLoaded", (e) => {
  console.log('HTML parsed and DOM tree built!', e);
});

// load
// This checks all the images and external resources are ready
window.addEventListener("load", (e) => {
  console.log('Page is fully loaded', e);
});

// beforeunload
// This adds a listener when the page is about to be reloaded or closed -- Do not abuse this
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "";
});













