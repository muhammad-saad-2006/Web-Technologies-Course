const announcements = [
  "Due to increased demand, orders may take up to 30 days to ship.",
  "Free ground shipping on orders over $100",
];

let currentAnnouncement = 0;

const announcementMessage = document.getElementById("announcement-message");

const previousButton = document.getElementById("previous-announcement");

const nextButton = document.getElementById("next-announcement");

function showAnnouncement(index) {
  if (announcementMessage.classList.contains("is-changing")) {
    return;
  }
  currentAnnouncement = (index + announcements.length) % announcements.length;

  announcementMessage.classList.add("is-changing");

  setTimeout(function () {
    announcementMessage.textContent = announcements[currentAnnouncement];
    announcementMessage.classList.remove("is-changing");
  }, 180);
}

previousButton.addEventListener("click", function () {
  showAnnouncement(currentAnnouncement - 1);
});

nextButton.addEventListener("click", function () {
  showAnnouncement(currentAnnouncement + 1);
});
