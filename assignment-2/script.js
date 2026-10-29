const announcements = [
  "Due to increased demand, orders may take up to 30 days to ship.",
  "Free ground shipping on orders over $100",
];

// Homepage announcement controls
const announcementMessage = document.getElementById("announcement-message");
const previousButton = document.getElementById("previous-announcement");
const nextButton = document.getElementById("next-announcement");

if (announcementMessage && previousButton && nextButton) {
  let currentAnnouncement = 0;
  let animationInProgress = false;

  function showAnnouncement(index) {
    if (animationInProgress) return;
    animationInProgress = true;
    currentAnnouncement = (index + announcements.length) % announcements.length;
    announcementMessage.classList.add("is-changing");
    setTimeout(() => {
      announcementMessage.textContent = announcements[currentAnnouncement];
      announcementMessage.classList.remove("is-changing");
      animationInProgress = false;
    }, 180);
  }

  previousButton.addEventListener("click", () => showAnnouncement(currentAnnouncement - 1));
  nextButton.addEventListener("click", () => showAnnouncement(currentAnnouncement + 1));
  setInterval(() => showAnnouncement(currentAnnouncement + 1), 5000);
}

// Homepage category-card scroll effect
const smallScreen = window.matchMedia("(max-width: 991.98px)");
const categoryScroll = document.querySelector(".category-scroll");
const categoryCards = document.querySelectorAll(".category-card");

if (categoryScroll && categoryCards.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-active", smallScreen.matches && entry.isIntersecting);
      });
    },
    { root: categoryScroll, rootMargin: "0px -49% 0px -49%" },
  );

  categoryCards.forEach((card) => observer.observe(card));
  smallScreen.addEventListener("change", () => {
    categoryCards.forEach((card) => {
      card.classList.remove("is-active");
      observer.unobserve(card);
      observer.observe(card);
    });
  });
}

// Homepage Best Sellers arrow controls
const productRow = document.getElementById("product-row");
const productPrev = document.getElementById("products-prev");
const productNext = document.getElementById("products-next");

if (productRow && productPrev && productNext) {
  function cardStep() {
    const card = productRow.querySelector(".product-card");
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(productRow).columnGap) || 0;
    return card.offsetWidth + gap;
  }

  function updateArrows() {
    productPrev.disabled = productRow.scrollLeft <= 1;
    productNext.disabled = productRow.scrollLeft + productRow.clientWidth >= productRow.scrollWidth - 1;
  }

  productPrev.addEventListener("click", () => productRow.scrollBy({ left: -cardStep(), behavior: "smooth" }));
  productNext.addEventListener("click", () => productRow.scrollBy({ left: cardStep(), behavior: "smooth" }));
  productRow.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);
  window.addEventListener("load", updateArrows);
  updateArrows();
}
