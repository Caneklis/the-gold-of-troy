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
    console.log("blaa");
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

  const modals = document.querySelectorAll("[data-modal]");

  modals.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = document.getElementById(trigger.dataset.modal);
      modal.classList.add("open");
      const exits = modal.querySelectorAll(".modal-exit");
      exits.forEach(function (exit) {
        exit.addEventListener("click", function (event) {
          event.preventDefault();
          modal.classList.remove("open");
        });
      });
    });
  });
});
