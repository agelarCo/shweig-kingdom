import {
  isWebp,
  headerFixed,
  togglePopupWindows,
  addTouchClass,
  addLoadedClass,
  menuInit,
} from "./modules";

import Swiper, { Navigation, Pagination, Thumbs, Controller } from "swiper";
import SimpleBar from "simplebar";

import Tabs from "./tabs.js";
import { Modal, Collapse, Dropdown, Tooltip } from "bootstrap";
import LazyLoad from "vanilla-lazyload";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";
import AgelarMap from "./agelar-map.js";

import StarRating from "./starRating.js";
import "./blocks/catalog.js";
import "./blocks/last-news.js";

if (window.innerWidth > 1200) {
  document.querySelectorAll(".zoom").forEach((elem, index) => {
    elem.addEventListener("mousemove", (e) => {
      var zoomer = e.currentTarget;
      let offsetX;
      let offsetY;
      e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
      e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
      let x = (offsetX / zoomer.offsetWidth) * 100;
      let y = (offsetY / zoomer.offsetHeight) * 100;
      console.log(x, offsetX / zoomer.offsetWidth);

      zoomer.style.backgroundPosition = x + "% " + y + "%";
      zoomer.style.backgroundSize = `${zoomer.offsetWidth * 1.5}px ${
        zoomer.offsetHeight * 1.5
      }px !important`;
    });
    elem.addEventListener("mouseleave", (e) => {
      var zoomer = e.currentTarget;
      console.log("red");
      zoomer.style.backgroundSize = `${zoomer.offsetWidth}px ${zoomer.offsetHeight}px !important`;
    });
  });
}

const wrapper = document.querySelector(".parallax");
const layers = document.querySelectorAll(".parallax__layer");

if (wrapper) {
  const reset = () => {
    layers.forEach((layer) => {
      layer.removeAttribute("style");
    });
  };

  wrapper.addEventListener("mousemove", (evt) => {
    console.log(2123123);

    //размер области просмотра
    const parallaxLeftOffset = wrapper.getBoundingClientRect().left;
    const parallaxTopOffset = wrapper.getBoundingClientRect().top;

    // координаты центра экрана
    const coordX = evt.clientX - parallaxLeftOffset - 0.5 * wrapper.offsetWidth;
    const coordY = evt.clientY - parallaxTopOffset - 0.5 * wrapper.offsetHeight;

    layers.forEach((layer) => {
      const layerSpeed = layer.dataset.speed;
      const x = -(coordX * layerSpeed).toFixed(2);
      const y = -(coordY * layerSpeed).toFixed(2);
      layer.setAttribute("style", `transform: translate(${x}px, ${y}px);`);
    });
  });
  wrapper.addEventListener("mouseout", reset);
}

let ratings = document.querySelectorAll(".rating");

window.addEventListener("load", () => {
  if (ratings) {
    ratings.forEach((elem, index) => {
      new StarRating(elem);
    });
  }
});

/* nav-down__down-btn */
/* 
.nav-down {
  width: 330px;
  background-color: white;
  &__container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    border-right-color: white;
    padding: 15px;
    &--active {
      color: $primary
    }
 */
let btnForNavDown = document.querySelectorAll(".nav-down__down-btn");

btnForNavDown.forEach((elem, item) => {
  elem.addEventListener("click", () => {
    elem.parentElement.classList.toggle("nav-down__container--active");
  });
});

let headerLineMenuCatalog = document.querySelectorAll(
  ".header-line-menu-catalog"
);

let navDropdwn = document.querySelector(".nav-down-container");

let lastIndex;
headerLineMenuCatalog.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    lastIndex = index;
    elem.classList.toggle("header-line-menu-catalog--active");
    navDropdwn.classList.toggle("nav-down-container--visible");
  });
});

document.querySelector(".hide-collapse").addEventListener("click", () => {
  headerLineMenuCatalog[lastIndex].classList.toggle(
    "header-line-menu-catalog--active"
  );
});

let listSity = document.querySelectorAll(".list-sity div");
let listRawSity = [];
listSity.forEach((elem, item) => {
  if (elem.textContent.trim() !== "") {
    listRawSity.push(
      elem.textContent
        .replace(/\n/g, "")
        .trim()
        .substring(3)
        .replace("                 ", "")
        .replace(/&nbsp;/g, "")
    );
  }
});
if (listRawSity.length) {
  listRawSity.length = listRawSity.length - 3;
}

let containerForScroller = document.querySelector(
  ".map-controls-block__scroller ul"
);
if (listRawSity) {
  listRawSity.forEach((element, index, array) => {
    containerForScroller.insertAdjacentHTML(
      "afterbegin",
      `
    <li class="map-controls-button" data-address="${element}" data-point-x="" data-point-y="">${element}
      
    
  </li>`
    );
  });
}

/* map-controls-block__input */
window.addEventListener("load", () => {
  let filteredButtons = document.querySelectorAll(".map-controls-button");
  if (document.querySelector(".map-controls-block__input")) {
    document
      .querySelector(".map-controls-block__input")
      .addEventListener("input", (e) => {
        let maineText = e.target.value.toLowerCase();
        filteredButtons.forEach((elem, index) => {
          if (elem.textContent.toLowerCase().indexOf(maineText) >= 1) {
            elem.classList.remove("d-none");
          } else if (maineText == "") {
            elem.classList.remove("d-none");
          } else {
            elem.classList.add("d-none");
          }
        });
      });
  }
});

let tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl);
});

new AgelarMap("init-map--js", {
  pointImage: "./images/pickup/time.svg",
});

let inputCart = document.querySelectorAll(".cart-input");

let inputCartIncr = document.querySelectorAll(".btn-incr");
let inputCartDec = document.querySelectorAll(".btn-dec");
let currentValue = 0;

if (inputCartIncr.length && inputCartDec.length) {
  inputCart.forEach((elem, index) => {
    inputCartDec[index].addEventListener("click", () => {
      let currentValue = parseInt(elem.value);
      currentValue >= 1 ? currentValue-- : "";
      elem.value = currentValue;
    });

    inputCartIncr[index].addEventListener("click", () => {
      let currentValue = parseInt(elem.value);
      currentValue++;
      elem.value = currentValue;
    });
  });
}

/* let maps = new AgelarMap() */

const lightboxCertificate = new PhotoSwipeLightbox({
  gallery: "#gallery--no-dynamic-import",
  children: "a",
  pswpModule: PhotoSwipe,
});

const lightboxCertificateOnce = new PhotoSwipeLightbox({
  gallery: ".lets-note",
  children: "a",
  pswpModule: PhotoSwipe,
});

lightboxCertificate.init();
lightboxCertificateOnce.init();

if (
  document.querySelector(".product-detail-tabs") &&
  document.querySelector(".btn-char-movie")
) {
  let newTabs = new Tabs(".product-detail-tabs");

  const btnCharMovie = document.querySelector(".btn-char-movie");

  let charTabBtn = document.querySelectorAll(".tabs__btn")[0];

  btnCharMovie.addEventListener("click", () => {
    newTabs.show(charTabBtn);
    charTabBtn.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

document.querySelectorAll(".btn-comparison").forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("btn-comparison--active");
  });
});

if (document.querySelector(".header-burder-menu-container__scroller")) {
  new SimpleBar(
    document.querySelector(".header-burder-menu-container__scroller")
  );
}

if (document.querySelector(".scroll-mobile-decorator-scroller")) {
  new SimpleBar(document.querySelector(".scroll-mobile-decorator-scroller"));
}

if (document.querySelector(".table-compare")) {
  new SimpleBar(document.querySelector(".table-compare"));
}

if (document.querySelector(".scroll-mobile-decorator-scroller-new")) {
  new SimpleBar(
    document.querySelector(".scroll-mobile-decorator-scroller-new")
  );
}

if (document.querySelector(".map-controls-block__scroller")) {
  new SimpleBar(document.querySelector(".map-controls-block__scroller"));
}

if (document.querySelector(".similar-news-slider")) {
  let similarNews = new Swiper(".similar-news-slider", {
    modules: [Navigation],
    navigation: {
      prevEl: ".similar-news-button-prev",
      nextEl: ".similar-news-button-next",
    },
    breakpoints: {
      1200: {
        spaceBetween: 30,
        slidesPerView: 4,
      },
      992: {
        spaceBetween: 30,
        slidesPerView: 3,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    },
  });
}

if (document.querySelector(".dont-forget-slider")) {
  let dontForgetSlider = new Swiper(".dont-forget-slider", {
    modules: [Navigation],
    navigation: {
      prevEl: ".dont-forget-slider-button-prev",
      nextEl: ".dont-forget-slider-button-next",
    },
    breakpoints: {
      1200: {
        spaceBetween: 30,
        slidesPerView: 4,
      },
      992: {
        spaceBetween: 30,
        slidesPerView: 3,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    },
  });
}

let productPageMinSlider = new Swiper(".product-page-min-slider", {
  direction: "vertical",
  spaceBetween: 10,
  slidesPerView: 6,
  grabCursor: true,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});

let productPageBigSlider = new Swiper(".product-page-big-slider", {
  modules: [Thumbs, Controller],
  spaceBetween: 10,
  grabCursor: true,
  slidesPerView: 1,
  thumbs: {
    swiper: productPageMinSlider,
  },
});

if (document.querySelector(".top-slider")) {
  let topSlider = new Swiper(".top-slider", {
    modules: [Navigation],
    navigation: {
      prevEl: ".top-slider-button-prev",
      nextEl: ".top-slider-button-next",
    },
    slidesPerView: 1,
  });
}

if (document.querySelector(".slider-filter")) {
  let sliderFilter = new Swiper(".slider-filter", {
    modules: [Navigation],
    spaceBetween: 30,
    navigation: {
      prevEl: ".filter-navigation-btn-prev",
      nextEl: ".filter-navigation-btn-next",
    },
    slidesPerView: 1,
  });
}

let lastNewsSlider = new Swiper(".last-news-slider", {
  modules: [Navigation],
  navigation: {
    prevEl: ".last-news-button-prev",
    nextEl: ".last-news-button-next",
  },
  breakpoints: {
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    575: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
  },
});

let catalogSlider = new Swiper(".catalog-slider", {
  modules: [Navigation],
  spaceBetween: 30,
  /* navigation: {
      prevEl: ".related-products-button-prev",
      nextEl: ".related-products-button-next",
    }, */
  breakpoints: {
    1440: {
      slidesPerView: 5,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 3.3,
    },
    575: {
      slidesPerView: 2.7,
      spaceBetween: 15,
    },
    320: {
      slidesPerView: 2.3,
      spaceBetween: 15,
    },
  },
});

let certSlider = new Swiper(".certificate-slider", {
  modules: [Navigation],
  navigation: {
    prevEl: ".certificate-button-prev",
    nextEl: ".certificate-button-next",
  },
  breakpoints: {
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    575: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
  },
});

window["FLS"] = location.hostname === "localhost";
