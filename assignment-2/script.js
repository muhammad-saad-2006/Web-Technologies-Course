const announcements = [
  "Due to increased demand, orders may take up to 30 days to ship.",
  "Free ground shipping on orders over $100",
];

let currentAnnouncement = 0;
let rotationTimer;
let animationInProgress = false;

const announcementMessage = document.getElementById("announcement-message");

const previousButton = document.getElementById("previous-announcement");

const nextButton = document.getElementById("next-announcement");

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

function startRotation() {
  clearInterval(rotationTimer);

  rotationTimer = setInterval(() => {
    showAnnouncement(currentAnnouncement + 1);
  }, 5000);
}

previousButton.addEventListener("click", function () {
  showAnnouncement(currentAnnouncement - 1);
});

nextButton.addEventListener("click", function () {
  showAnnouncement(currentAnnouncement + 1);
});

startRotation();

// Cards that open/zoom by themselves while scrolling (small screens only)
const smallScreen = window.matchMedia("(max-width: 991.98px)");

function activateOnScroll(cards, rootEl, rootMargin) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle(
          "is-active",
          smallScreen.matches && entry.isIntersecting,
        );
      });
    },
    { root: rootEl, rootMargin: rootMargin },
  );

  cards.forEach(function (card) {
    observer.observe(card);
  });

  // When the window crosses the 992px line, reset and re-check every card
  smallScreen.addEventListener("change", function () {
    cards.forEach(function (card) {
      observer.unobserve(card);
      card.classList.remove("is-active");
      observer.observe(card);
    });
  });
}

// Category cards: the one under a thin strip in the middle of the swipe row
activateOnScroll(
  document.querySelectorAll(".category-card"),
  document.querySelector(".category-scroll"),
  "0px -49% 0px -49%",
);
