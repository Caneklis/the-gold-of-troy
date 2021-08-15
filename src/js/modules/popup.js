const modalTriggers = document.querySelectorAll(".popup-trigger");
const modalContent = document.querySelectorAll(".timeline__content-item");

if (modalContent > 0) {
  setTimeout(() => {
    if (modalContent) {
      modalContent[0].classList.add("timeline__content-item--active");
    }
    if (modalTriggers) {
      modalTriggers[0].classList.add("timeline__year-btn--active");
      modalTriggers[0].parentElement.classList.add(
        "timeline__list-year--active"
      );
    }
  }, 1000);
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const { popupTrigger } = trigger.dataset;
    const popupModal = document.querySelector(
      `[data-popup-modal="${popupTrigger}"]`
    );

    const popupModalOpen = document.querySelector(
      ".timeline__content-item--active"
    );
    const trigerActive = document.querySelectorAll(".timeline__year-btn");

    trigerActive.forEach((item) => {
      item.parentElement.classList.remove("timeline__list-year--active");
      item.classList.remove("timeline__year-btn--active");
    });

    trigger.parentElement.classList.add("timeline__list-year--active");
    trigger.classList.add("timeline__year-btn--active");
    popupModalOpen.classList.remove("timeline__content-item--active");
    popupModal.classList.add("timeline__content-item--active");
  });
});
