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


// Task 3: live search and sorting of the existing HTML product cards.
const productSearch = document.getElementById("product-search");
const sortPriceButton = document.getElementById("sort-price");
const noProductsMessage = document.getElementById("no-products-message");
const categoryRadios = document.querySelectorAll('input[name="category-filter"]');

if (productRow) {
  const originalCards = Array.from(productRow.querySelectorAll(".product-card"));
  let highestPriceFirst = false;

  // Add a Premium label on page load (N x 100 = $7,600).
  originalCards.forEach((card) => {
    const priceText = card.querySelector(".card-body .fw-semibold").textContent;
    const price = Number(priceText.replace(/[^0-9.]/g, ""));

    if (price > 7600 && !card.querySelector(".premium-label")) {
      const label = document.createElement("span");
      label.className = "premium-label";
      label.textContent = "Premium";
      card.appendChild(label);
    }
  });

  // Cards must match the search text AND the selected category.
  function updateProductVisibility() {
    const searchText = productSearch ? productSearch.value.trim().toLowerCase() : "";
    const selectedFilter = document.querySelector('input[name="category-filter"]:checked');
    const selectedCategory = selectedFilter ? selectedFilter.value : "all";
    let visibleCount = 0;

    originalCards.forEach((card) => {
      const productName = card.querySelector("h5 a").textContent.toLowerCase();
      const category = card.dataset.category || "";
      const matchesSearch = productName.includes(searchText);
      const matchesCategory =
        selectedCategory === "all" || category.includes(selectedCategory);

      card.classList.toggle("is-search-hidden", !matchesSearch);
      if (matchesSearch && matchesCategory) visibleCount++;
    });

    if (noProductsMessage) {
      noProductsMessage.hidden = visibleCount !== 0;
    }
  }

  if (productSearch) {
    productSearch.addEventListener("input", updateProductVisibility);
  }
  categoryRadios.forEach((radio) => {
    radio.addEventListener("change", updateProductVisibility);
  });

  // Read the price from each card, then move the existing card nodes.
  if (sortPriceButton) {
    sortPriceButton.addEventListener("click", () => {
      highestPriceFirst = !highestPriceFirst;
      const cards = Array.from(productRow.querySelectorAll(".product-card"));

      cards.sort((cardA, cardB) => {
        const priceA = Number(
          cardA.querySelector(".card-body .fw-semibold").textContent.replace(/[^0-9.]/g, "")
        );
        const priceB = Number(
          cardB.querySelector(".card-body .fw-semibold").textContent.replace(/[^0-9.]/g, "")
        );
        return highestPriceFirst ? priceB - priceA : priceA - priceB;
      });

      cards.forEach((card) => productRow.appendChild(card));
      sortPriceButton.textContent = highestPriceFirst
        ? "Sort: High to Low"
        : "Sort: Low to High";
      updateProductVisibility();
    });
  }

  updateProductVisibility();
}
