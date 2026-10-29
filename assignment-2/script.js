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

// One reusable product page selected by ?product=product-slug
const productTitleElement = document.getElementById("product-title");

if (productTitleElement) {
  const womensSizes = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];
  const mensSizes = ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "15"];

  const productCatalog = {
    "womens-cruiser-slip-on-blizzard": {
      title: "Women's Cruiser Slip On", category: "Women's Shoes", color: "Blizzard", price: 100,
      image: "images/Best Sellers/women_cruiser_slip_on.png", alt: "Women's Cruiser Slip On in Blizzard",
      description: "Slip in and go. The Cruiser Slip On keeps the classic Cruiser look, drops the laces, and uses a breathable tree-knit upper for a light, comfortable feel.",
      sizesLabel: "Women's US size", sizes: womensSizes, fitNote: "The Cruiser Slip On fits true to size for most customers.",
      officialUrl: "https://www.allbirds.com/products/womens-cruiser-slip-on-blizzard",
      features: [
        "Breathable tree-knit upper made with TENCEL™ Lyocell and recycled polyester.",
        "Soft Merino wool-blend lining.",
        "Sugarcane-based SweetFoam® cushioning.",
        "Featherbed™ memory foam insole for extra comfort."
      ]
    },
    "womens-canvas-cruiser-slip-on-warm-white": {
      title: "Women's Canvas Cruiser Slip On", category: "Women's Shoes", color: "Warm White", price: 75,
      image: "images/Best Sellers/women_canvas_cruiser_slip_on.png", alt: "Women's Canvas Cruiser Slip On in Warm White",
      description: "A lace-free take on the Cruiser, with a light, breathable hemp-and-organic-cotton canvas upper designed for easy everyday wear.",
      sizesLabel: "Women's US size", sizes: womensSizes, fitNote: "The Cruiser Slip On Canvas fits true to size for most customers.",
      officialUrl: "https://www.allbirds.com/products/womens-cruiser-slip-on-canvas",
      features: [
        "Breathable canvas upper made with a blend of hemp and organic cotton.",
        "Light slip-on design for everyday wear.",
        "Plush Featherbed™ insole for added comfort."
      ]
    },
    "womens-runner-nz-slip-on-mushroom": {
      title: "Women's Runner NZ Slip On", category: "Women's Shoes", color: "Mushroom", price: 105,
      image: "images/Best Sellers/women_runner_nz_slip_on.png", alt: "Women's Runner NZ Slip On in Mushroom",
      description: "A lightweight slip-on with a sleek profile and subtle texture. The Runner NZ Slip On is designed for easy everyday movement without laces.",
      sizesLabel: "Women's US size", sizes: womensSizes, fitNote: "The Runner NZ Slip On fits true to size for most customers.",
      officialUrl: "https://www.allbirds.com/products/womens-runner-nz-slip-on-mushroom",
      features: [
        "Breathable TENCEL™ Lyocell and recycled-polyester blend upper.",
        "Plush Featherbed® memory-foam insole.",
        "Flexible construction designed to move naturally.",
        "Sugarcane-based SweetFoam® cushioning."
      ]
    },
    "womens-canvas-cruiser-sea-spray": {
      title: "Women's Canvas Cruiser", category: "Women's Shoes", color: "Sea Spray", price: 75,
      image: "images/Best Sellers/women_canvas_cruiser.png", alt: "Women's Canvas Cruiser in Sea Spray",
      description: "Classic court-inspired style in a subtly textured canvas shoe. Its hemp-and-organic-cotton upper is lightweight, breathable, and easy to wear.",
      sizesLabel: "Women's US size", sizes: womensSizes, fitNote: "The Cruiser Canvas fits true to size for most customers.",
      officialUrl: "https://www.allbirds.com/products/womens-cruiser-canvas-sea-spray",
      features: [
        "Lightweight canvas upper made from hemp and organic cotton.",
        "Merino wool-blend lining.",
        "Sugarcane-based SweetFoam® cushioning.",
        "Featherbed™ memory foam insole."
      ]
    },
    "womens-tree-runner-nz-medium-grey": {
      title: "Women's Tree Runner NZ", category: "Women's Shoes", color: "Medium Grey", price: 100,
      image: "images/Best Sellers/womens_tree_runner_nz.png", alt: "Women's Tree Runner NZ in Medium Grey",
      description: "A breathable everyday sneaker with a slightly more structured build. The Tree Runner NZ combines a clean profile with lightweight comfort for walking, commuting, and travel.",
      sizesLabel: "Women's US size", sizes: womensSizes, fitNote: "The Tree Runner NZ fits true to size for most customers.",
      officialUrl: "https://www.allbirds.com/products/womens-tree-runner-nz-medium-grey",
      features: [
        "Breathable TENCEL™ Lyocell and recycled-polyester blend upper.",
        "Soft Merino wool-blend lining.",
        "Sugarcane-based SweetFoam® cushioning.",
        "Featherbed™ memory foam insole."
      ]
    },
    "mens-runner-nz-slip-on-mushroom": {
      title: "Men's Runner NZ Slip On", category: "Men's Shoes", color: "Mushroom", price: 105,
      image: "images/Best Sellers/mens_runner_nz.png", alt: "Men's Runner NZ Slip On in Mushroom",
      description: "A lightweight slip-on with a sleek profile and subtle texture. The Runner NZ Slip On is designed for easy everyday movement without laces.",
      sizesLabel: "Men's US size", sizes: mensSizes, fitNote: "The Runner NZ Slip On fits true to size for most customers.",
      officialUrl: "https://www.allbirds.com/products/mens-runner-nz-slip-on",
      features: [
        "Breathable TENCEL™ Lyocell and recycled-polyester blend upper.",
        "Plush Featherbed® memory-foam insole.",
        "Flexible construction designed to move naturally.",
        "Sugarcane-based SweetFoam® cushioning."
      ]
    },
    "mens-runner-nz-slip-on-dark-navy": {
      title: "Men's Runner NZ Slip On", category: "Men's Shoes", color: "Dark Navy", price: 105,
      image: "images/Best Sellers/mens_runner_nz_1.png", alt: "Men's Runner NZ Slip On in Dark Navy",
      description: "A lightweight slip-on with a sleek profile and subtle texture. The Runner NZ Slip On is designed for easy everyday movement without laces.",
      sizesLabel: "Men's US size", sizes: mensSizes, fitNote: "The Runner NZ Slip On fits true to size for most customers.",
      officialUrl: "https://www.allbirds.com/products/mens-runner-nz-slip-on-dark-navy",
      features: [
        "Breathable TENCEL™ Lyocell and recycled-polyester blend upper.",
        "Plush Featherbed® memory-foam insole.",
        "Flexible construction designed to move naturally.",
        "Sugarcane-based SweetFoam® cushioning."
      ]
    },
    "mens-cruiser-medium-grey": {
      title: "Men's Cruiser", category: "Men's Shoes", color: "Medium Grey", price: 105,
      image: "images/Best Sellers/mens_cruiser.png", alt: "Men's Cruiser in Medium Grey",
      description: "An everyday sneaker with a clean, understated profile, designed to pair with casual outfits and daily routines.",
      sizesLabel: "Men's US size", sizes: mensSizes, fitNote: "The Cruiser fits true to size for most customers.",
      officialUrl: "https://www.allbirds.com/products/mens-cruiser-medium-grey",
      features: [
        "Simple, versatile design for everyday wear.",
        "Comfort-focused construction.",
        "Medium Grey colour shown in the product listing."
      ]
    }
  };

  const requestedProduct = new URLSearchParams(window.location.search).get("product");
  const product = productCatalog[requestedProduct] || productCatalog["womens-cruiser-slip-on-blizzard"];

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  const image = document.getElementById("product-image");
  if (image) {
    image.src = product.image;
    image.alt = product.alt;
  }

  setText("product-category", product.category);
  setText("product-breadcrumb-name", product.title);
  setText("product-title", product.title);
  setText("product-price", "$" + product.price);
  setText("product-color", product.color);
  setText("product-description", product.description);
  setText("product-size-note", product.fitNote);
  setText("product-button-price", "$" + product.price);
  document.title = product.title + " - Allbirds Clone";

  const sizeLabel = document.getElementById("shoe-size-label");
  if (sizeLabel) sizeLabel.textContent = product.sizesLabel;

  const sizeSelect = document.getElementById("shoe-size");
  if (sizeSelect) {
    sizeSelect.replaceChildren();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select a size";
    placeholder.disabled = true;
    placeholder.selected = true;
    sizeSelect.appendChild(placeholder);

    product.sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });
  }

  const featuresList = document.getElementById("product-feature-list");
  if (featuresList) {
    featuresList.replaceChildren();
    product.features.forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      featuresList.appendChild(item);
    });
  }

  const officialLink = document.getElementById("official-product-link");
  if (officialLink) officialLink.href = product.officialUrl;
}
