// Announcement messages
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

  previousButton.addEventListener("click", () => {
    showAnnouncement(currentAnnouncement - 1);
  });

  nextButton.addEventListener("click", () => {
    showAnnouncement(currentAnnouncement + 1);
  });

  setInterval(() => {
    showAnnouncement(currentAnnouncement + 1);
  }, 5000);
}

// Homepage category-card scroll effect
const smallScreen = window.matchMedia("(max-width: 991.98px)");

const categoryScroll = document.querySelector(".category-scroll");

const categoryCards = document.querySelectorAll(".category-card");

if (
  categoryScroll &&
  categoryCards.length &&
  "IntersectionObserver" in window
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          "is-active",
          smallScreen.matches && entry.isIntersecting,
        );
      });
    },

    {
      root: categoryScroll,
      rootMargin: "0px -49% 0px -49%",
    },
  );

  categoryCards.forEach((card) => {
    observer.observe(card);
  });

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

    productNext.disabled =
      productRow.scrollLeft + productRow.clientWidth >=
      productRow.scrollWidth - 1;
  }

  productPrev.addEventListener("click", () => {
    productRow.scrollBy({
      left: -cardStep(),
      behavior: "smooth",
    });
  });

  productNext.addEventListener("click", () => {
    productRow.scrollBy({
      left: cardStep(),
      behavior: "smooth",
    });
  });

  productRow.addEventListener("scroll", updateArrows);

  window.addEventListener("resize", updateArrows);

  window.addEventListener("load", updateArrows);

  updateArrows();
}

// ======================================
// TASK 3: LIVE SEARCH AND PRICE SORTING
// ======================================

// Get the search, sort and message elements
const productSearch = document.getElementById("product-search");

const sortPriceButton = document.getElementById("sort-price");

const noProductsMessage = document.getElementById("no-products-message");

// Get all category radio buttons
const categoryRadios = document.querySelectorAll(
  'input[name="category-filter"]',
);

if (productRow) {
  // Get existing product cards from the HTML
  const productCards = Array.from(productRow.querySelectorAll(".product-card"));

  // Read the actual price from a product card
  function getCardPrice(card) {
    const priceElement = card.querySelector(".card-body .d-flex .fw-semibold");

    if (!priceElement) return 0;

    const priceText = priceElement.textContent;

    return Number(priceText.replace(/[^0-9.]/g, ""));
  }

  // Add Premium labels when the page loads
  // N = 76
  // Premium threshold = 76 x 100 = $7,600

  productCards.forEach((card) => {
    const price = getCardPrice(card);

    if (price > 7600) {
      const premiumLabel = document.createElement("span");

      premiumLabel.className = "premium-label";

      premiumLabel.textContent = "Premium";

      card.appendChild(premiumLabel);
    }
  });

  // LIVE SEARCH AND CATEGORY FILTER
  function updateProductVisibility() {
    // Get the search text
    const searchText = productSearch
      ? productSearch.value.trim().toLowerCase()
      : "";

    // Get the selected category
    const selectedFilter = document.querySelector(
      'input[name="category-filter"]:checked',
    );

    const selectedCategory = selectedFilter ? selectedFilter.value : "all";

    let visibleCount = 0;

    // Check every existing product card
    productCards.forEach((card) => {
      // Get the product name
      const productName = card.querySelector("h5 a").textContent.toLowerCase();

      // Get the product category
      const category = card.dataset.category;

      // Check whether the product name matches the search
      const matchesSearch = productName.includes(searchText);

      // Check whether the product matches the selected category
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      // A card must match BOTH conditions
      const shouldShow = matchesSearch && matchesCategory;

      // Hide cards that do not match the search
      card.classList.toggle("is-search-hidden", !matchesSearch);

      // Count cards matching both conditions
      if (shouldShow) {
        visibleCount++;
      }
    });

    // Show or hide the No Products Found message
    if (noProductsMessage) {
      noProductsMessage.hidden = visibleCount !== 0;
    }

    // Hide the complete grid when no cards match
    productRow.classList.toggle("d-none", visibleCount === 0);
  }

  // Search while the user types
  if (productSearch) {
    productSearch.addEventListener("input", updateProductVisibility);
  }

  // Update results when a category is selected
  categoryRadios.forEach((radio) => {
    radio.addEventListener("change", updateProductVisibility);
  });

  // PRICE SORTING

  // First click: Low to High
  // Second click: High to Low

  let ascending = true;

  if (sortPriceButton) {
    sortPriceButton.addEventListener("click", () => {
      // Get the existing cards
      const cards = Array.from(productRow.querySelectorAll(".product-card"));

      // Sort according to the actual card prices
      cards.sort((cardA, cardB) => {
        const priceA = getCardPrice(cardA);

        const priceB = getCardPrice(cardB);

        if (ascending) {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });

      // Move existing cards into their sorted order
      // Do not recreate cards or use innerHTML
      cards.forEach((card) => {
        productRow.appendChild(card);
      });

      // Change the button text
      sortPriceButton.textContent = ascending
        ? "Sort: Low to High"
        : "Sort: High to Low";

      // Reverse the sorting direction for next click
      ascending = !ascending;

      // Apply the current search and category filters again
      updateProductVisibility();
    });
  }

  // Run filtering once when the page loads
  updateProductVisibility();
}
