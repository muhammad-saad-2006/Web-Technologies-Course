# Web Technologies Lab Midterm — FA24-BCS-076

**Name:** Muhammad Saad  
**Registration Number:** FA24-BCS-076  
**N:** 76  
**Breakpoint (BP):** 676px  
**Accent hue (H):** 172° — `hsl(172, 70%, 45%)`  
**K:** 4  
**Sticky top offset:** 106px  
**Premium threshold:** $7,600  

## Files changed
- `index.html` — added the four CSS-only category radio filters, search box, sort button and category attributes to the existing eight cards.
- `product.html` — arranged the existing image, details and description into named CSS Grid areas.
- `style.css` — added personal accent styling, category filtering, search/premium styles, responsive Grid and sticky positioning.
- `script.js` — added live search, combined filter logic, alternating price sorting with existing card nodes, and Premium labels.
- `README.md` — recorded personal values, files changed and task summaries.

## Task 1 — CSS-only category filter
Added four shop-relevant categories to the existing cards and four radio filters plus All. CSS `:has()` checks the selected radio and hides cards outside that category. `display: none` removes hidden cards from the layout, so no empty spaces remain. The active filter uses `hsl(172, 70%, 45%)`. No JavaScript is used for the category filter.

## Task 2 — Product page Grid and sticky details
Rearranged the existing product page into named Grid areas: image, details and description. Below 676px they stack in that order. At 676px and wider, image and details sit side by side and the description spans both columns. The details box uses `position: sticky; top: 106px`. The description is long enough to test the sticky behaviour while scrolling.

## Task 3 — Live search, price sorting and Premium labels
Added case-insensitive search through each product name. Search and category filtering work together, and the no-results message appears when no card passes both filters. The sort button alternates ascending and descending price order by reading each displayed price and moving the existing card nodes with `appendChild()`; it does not rebuild the grid with `innerHTML`. Cards over $7,600 receive a Premium label when the page loads. Existing announcement and carousel JavaScript is retained.

## Responsive checks
Test the listing and product pages at **375px**, **676px** and **1280px**. For Task 3, capture screenshots showing search and price sorting.

## AI tools used
- ChatGPT (OpenAI) — interpretation and implementation assistance.
