# Web Technologies Lab Midterm — FA24-BCS-076

A responsive e-commerce website inspired by Allbirds, developed using HTML5, CSS3, Bootstrap 5, and JavaScript. The project includes a product listing page, a product detail page, responsive layouts, category filtering, live product search, price sorting, and dynamic product labels.

## Project Overview

This project demonstrates the practical application of front-end web development concepts, including semantic HTML, responsive design, CSS Grid, Bootstrap components, DOM manipulation, and JavaScript event handling.

The website consists of a homepage displaying product categories and best-selling products, alongside a dedicated product detail page.

## Reference Website

- **Name:** Allbirds
- **URL:** https://www.allbirds.com/
- **Reference screenshot:** `screenshots/reference-site.png`

![Allbirds reference website screenshot](screenshots/reference-site.png)

## Technologies Used

- **HTML5** — Semantic page structure and content.
- **CSS3** — Custom styling, responsive layouts, CSS Grid, and visual effects.
- **Bootstrap 5.3.3** — Responsive grid system, navigation, buttons, forms, and utility classes.
- **JavaScript** — Interactive product search, price sorting, announcement controls, and product navigation.
- **Bootstrap Icons** — Interface icons.
- **Google Fonts** — Figtree and Newsreader typography.

## Project Structure

```text
midterm/
│
├── index.html
├── product.html
├── style.css
├── script.js
├── images/
│   ├── Cards/
│   └── Best Sellers/
├── screenshots/
├── FA24-BCS-076-midterm.pdf
└── README.md
```

## Features

### 1. Homepage and Product Listing

The homepage includes:

- Announcement bar with previous and next controls.
- Responsive navigation bar.
- Hero campaign section.
- Product category cards.
- Best Sellers product section.
- Horizontally scrollable product cards.
- Responsive footer.

### 2. Category Filtering

The Best Sellers section provides category-based product filtering.

Available categories include:

- All
- Cruiser
- Canvas
- Runner
- Tree Runner

The category filters are implemented using HTML radio inputs and CSS `:has()` selectors. Products outside the selected category are hidden without using JavaScript for the category-filtering mechanism.

### 3. Product Detail Page

The product page presents product information in a responsive CSS Grid layout.

It includes:

- Product image and product information.
- Product title and price.
- Color information.
- Size selection.
- Quantity selection.
- Add to Cart interface.
- Product description and features.

On smaller screens, the content is arranged vertically. At wider screen sizes, the image and product details appear side by side, while the description spans the layout.

The product information section uses sticky positioning on wider screens to remain visible while scrolling.

### 4. Live Product Search

The product listing includes a search field that filters products as the user types.

Search behavior includes:

- Case-insensitive product-name matching.
- Immediate filtering without page reloads.
- Combined search and category-filter functionality.
- A message displayed when no products match the selected conditions.

### 5. Price Sorting

Products can be sorted by price in two directions:

- Low to High
- High to Low

The sorting functionality reads the displayed product prices and rearranges the existing product card elements in the DOM.

### 6. Premium Product Labels

Products with a price greater than **$7,600** are automatically assigned a Premium label.

The threshold is calculated using the assigned value of `N = 76`, multiplied by 100.

## Responsive Design

The website uses Bootstrap's responsive grid and utility classes alongside custom CSS media queries.

The personalized responsive breakpoint is **676px**.

The layout is designed to adapt to mobile, tablet, and desktop screen sizes.

## Personalization Values

| Parameter                  | Value                |
| -------------------------- | -------------------- |
| Student Name               | Muhammad Saad        |
| Registration Number        | FA24-BCS-076         |
| N                          | 76                   |
| Responsive Breakpoint (BP) | 676px                |
| Accent Hue (H)             | 172°                 |
| Accent Color               | `hsl(172, 70%, 45%)` |
| K                          | 4                    |
| Sticky Top Offset          | 106px                |
| Premium Price Threshold    | $7,600               |

## Running the Project

The project is built with static HTML, CSS, and JavaScript.

1. Download or clone the repository.
2. Open the `midterm` directory.
3. Open `index.html` in a web browser.

For a local development environment, the project can also be opened using the VS Code Live Server extension.

## Project Documentation

The completed midterm documentation is available here:

[FA24-BCS-076 Midterm Report (PDF)](./FA24-BCS-076-midterm.pdf)

## Author

**Muhammad Saad**  
Computer Science Student  
Registration Number: FA24-BCS-076
