import Swiper from "swiper/bundle";
import simpleParallax from "simple-parallax-js";
// import Masonry from "masonry-layout";

document.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line no-console
  console.log("DOM полностью загружен и разобран");
  require("./modules/main-nav");
  require("./modules/popup");
  require("./modules/video");
  require("./modules/timeline");
  require("./modules/tab-section");

  const menuItems = document.querySelectorAll(".main-nav__link");
  menuItems.forEach((item) => {
    console.log(item.textContent);
    return item.textContent;
  });

  var menu = [...menuItems];
  // init Swiper:
  const mainSlider = new Swiper(".swiper-container-h", {
    direction: "horizontal",
    loop: false,
    // effect: "fade",
    // mousewheel: {
    //   releaseOnEdges: true,
    // },
    speed: 500,
    parallax: true,
    allowTouchMove: true,

    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    pagination: {
      el: ".main-nav__list",
      clickable: true,
      renderBullet: function (index, className) {
        return `
          <li class="main-nav__item  ${className}">
            <a class="main-nav__link main-nav__link--current">${menu[index].textContent}</a>
          </li>
          `;
      },
    },

    hashNavigation: {
      replaceState: true,
    },
  });

  const body = document.querySelector("body");

  if (document.querySelector(".swiper-container-h")) {
    body.classList.add(`page__body--slide-${mainSlider.activeIndex + 1}`);
  }

  mainSlider.on("afterInit", function (e) {
    const slides = document.querySelectorAll(".main-slide");

    for (let i = 0; i < slides.length; i++) {
      if (this.activeIndex == i) {
        body.className = "page__body";
        body.classList.add(`page__body--slide-${i + 1}`);
      }
    }
  });

  mainSlider.on("transitionEnd", function (e) {
    const slides = document.querySelectorAll(".main-slide");

    for (let i = 0; i < slides.length; i++) {
      if (this.activeIndex == i) {
        body.className = "page__body";
        body.classList.add(`page__body--slide-${i + 1}`);
      }
    }
  });

  mainSlider.on("transitionStart", function (e) {
    const slides = document.querySelectorAll(".main-slide");

    for (let i = 0; i < slides.length; i++) {
      if (this.activeIndex == i) {
        body.className = "page__body";
        body.classList.add(`page__body--slide-${i + 1}`);
      }
    }
  });

  var galleryThumbs = new Swiper(".gallery-thumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    nasted: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  var galleryTop = new Swiper(".gallery-top", {
    spaceBetween: 10,
    thumbs: {
      swiper: galleryThumbs,
    },
    nasted: true,
  });

  var catalogSlider = new Swiper(".collections__catalog-slider", {
    spaceBetween: 36,
    nasted: true,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".collections__catalog-slider-button-next",
      prevEl: ".collections__catalog-slider-button-prev",
    },
    loop: false,
    allowTouchMove: false,
  });

  // (function () {
  //   // Add event listener
  //   document.addEventListener("mousemove", parallax);
  //   const elem = document.querySelector("#parallax");
  //   // Magic happens here
  //   function parallax(e) {
  //     let _w = window.innerWidth / 2;
  //     let _h = window.innerHeight / 2;
  //     let _mouseX = e.clientX;
  //     let _mouseY = e.clientY;
  //     let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${
  //       50 - (_mouseY - _h) * 0.01
  //     }%`;
  //     let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${
  //       50 - (_mouseY - _h) * 0.02
  //     }%`;
  //     let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${
  //       50 - (_mouseY - _h) * 0.06
  //     }%`;
  //     let x = `${_depth3}, ${_depth2}, ${_depth1}`;
  //     console.log(x);
  //     elem.style.backgroundPosition = x;
  //   }
  // })();

  // swiper.slideTo(3, false, false);

  // init with selector
  // var msnry = new Masonry(".grid", {
  //   itemSelector: ".grid-item",
  // });

  var description = $(".timeline__pin-description");
  // var mp = null;

  // function init(evt) {
  //   if (window.svgDocument == null) {
  //     svgDocument = evt.target.ownerDocument;
  //   }
  //   tooltip = svgDocument.getElementById("tooltip");
  // }

  $(".timeline__pin").on("click", function (e) {
    this.classList.add("bla--active");
    description.removeClass("timeline__pin-description--active");
    description.addClass("timeline__pin-description--active");
    description.html($(this).data("id"));

    let elem = this.getBoundingClientRect();

    console.log(elem.top + pageYOffset);
    console.log(elem.left + pageXOffset);

    description.css({
      top: elem.top + pageYOffset,
      left: elem.left + pageXOffset,
    });
  });

  // $(document).on('mousemove', function(e){

  //   description.css({
  //     left:  e.pageX,
  //     top:   e.pageY - 70
  //   });

  // });

  const modalNext = document.querySelectorAll(".modal__next");
  const modalPrev = document.querySelectorAll(".modal__prev");
  const modals = document.querySelectorAll("[data-modal]");

  modals.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      // const modal = document.getElementById(trigger.dataset.modal);
      let src = trigger.getAttribute("href");

      var modal = document.querySelector(".modal");
      modal.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="modal__container">
          <img src="${src}" alt="">
        </div>
        <button class="modal__prev" type="button"">
          <svg width="23px" height="8px" viewBox="0 0 23 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="icon-back" fill="currentColor" fill-rule="nonzero">
                  <path d="M0.646447,3.64645 C0.451184,3.84171 0.451184,4.15829 0.646447,4.35355 L3.82843,7.53553 C4.02369,7.7308 4.34027,7.7308 4.53553,7.53553 C4.7308,7.34027 4.7308,7.02369 4.53553,6.82843 L1.70711,4 L4.53553,1.17157 C4.7308,0.976311 4.7308,0.659728 4.53553,0.464466 C4.34027,0.269204 4.02369,0.269204 3.82843,0.464466 L0.646447,3.64645 Z M1,4.5 L23,4.5 L23,3.5 L1,3.5 L1,4.5 Z" id="Shape"></path>
              </g>
          </g>
          </svg>
        </button>
        <button class="modal__next" type="button">
          <svg width="23px" height="8px" viewBox="0 0 23 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="icon-back" transform="translate(11.500000, 4.000000) rotate(180.000000) translate(-11.500000, -4.000000) " fill="currentColor" fill-rule="nonzero">
                  <path d="M0.646447,3.64645 C0.451184,3.84171 0.451184,4.15829 0.646447,4.35355 L3.82843,7.53553 C4.02369,7.7308 4.34027,7.7308 4.53553,7.53553 C4.7308,7.34027 4.7308,7.02369 4.53553,6.82843 L1.70711,4 L4.53553,1.17157 C4.7308,0.976311 4.7308,0.659728 4.53553,0.464466 C4.34027,0.269204 4.02369,0.269204 3.82843,0.464466 L0.646447,3.64645 Z M1,4.5 L23,4.5 L23,3.5 L1,3.5 L1,4.5 Z" id="Shape"></path>
              </g>
          </g>
          </svg>
        </button>

        <button class="modal__close modal-exit" aria-label="Закрыть окно">
        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="-0.5" x2="41.0366" y2="-0.5" transform="matrix(-0.682318 -0.731055 0.547452 -0.836837 29 30)"
            stroke="#F2CC91" />
          <line y1="-0.5" x2="41.0366" y2="-0.5" transform="matrix(0.682318 -0.731055 -0.547452 -0.836837 1 30)"
            stroke="#F2CC91" />
        </svg>

      </button>
      `
      );
      const thumbs = document.querySelectorAll(".item__article-thumb a");

      const btnNext = document.querySelector(".modal__next");
      const btnPrev = document.querySelector(".modal__prev");

      btnNext.addEventListener("click", () => {
        next();
      });
      btnPrev.addEventListener("click", () => {
        prev();
      });

      const slider_img = document.querySelector(".modal img");
      // var images = document.querySelectorAll(".item__article-thumb a");
      let i = 0;

      function prev() {
        if (i <= 0) i = thumbs.length;
        i--;
        return setImg();
      }

      function next() {
        if (i >= thumbs.length - 1) i = -1;
        i++;
        return setImg();
      }

      function setImg() {
        return slider_img.setAttribute("src", thumbs[i].getAttribute("href"));
      }

      modal.classList.add("open");
      const exits = modal.querySelectorAll(".modal-exit");
      exits.forEach(function (exit) {
        exit.addEventListener("click", function () {
          modal.classList.remove("open");
          modal.innerHTML = "";
        });
      });
    });
  });
});
