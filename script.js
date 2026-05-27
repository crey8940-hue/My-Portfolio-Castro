/* =========================
FILE: script.js
========================= */

// AOS Animation
AOS.init({
  duration: 1000,
  once: true
});

// Typing Animation
const typed = new Typed(".typing", {
  strings: [
    "Video Editor",
    "UI/UX Designer",
    "Creative Editor",
    "Figma Designer"
  ],
  typeSpeed: 80,
  backSpeed: 50,
  loop: true
});

// Mobile Navbar
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close navbar when clicking links
navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Highlight current section in navbar
const sections = document.querySelectorAll("section[id]");

const highlightCurrentSection = () => {
  const scrollPosition = window.scrollY + 140;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navItems.forEach(item => item.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
};

highlightCurrentSection();
window.addEventListener("scroll", highlightCurrentSection);

// Contact message form
const messageForm = document.querySelector(".message-form");
const messageStatus = document.querySelector(".message-status");

messageForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("messageName").value.trim();
  const email = document.getElementById("messageEmail").value.trim();
  const subject = document.getElementById("messageSubject").value.trim();
  const message = document.getElementById("messageBody").value.trim();
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailLink = `mailto:crey8940@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailLink;
  messageStatus.textContent = "Opening your email app to send the message.";
  messageForm.reset();
});

// Rate and review form
const reviewForm = document.querySelector(".review-form");
const ratingInputs = document.querySelectorAll(".star-rating input");
const ratingLabels = document.querySelectorAll(".star-rating label");
const reviewStatus = document.querySelector(".review-status");
const reviewList = document.querySelector(".review-list");
const savedReviews = JSON.parse(localStorage.getItem("portfolioReviews")) || [];

const escapeHtml = text => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const updateRatingStars = rating => {
  ratingLabels.forEach((label, index) => {
    label.classList.toggle("active", index < rating);
  });
};

const renderReviews = () => {
  if (!savedReviews.length) {
    reviewList.innerHTML = '<p class="empty-reviews">No comments yet. Be the first to leave a review.</p>';
    return;
  }

  reviewList.innerHTML = savedReviews.map(review => `
    <div class="review-item">
      <div class="review-stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
      <p>${escapeHtml(review.comment)}</p>
    </div>
  `).join("");
};

ratingInputs.forEach(input => {
  input.addEventListener("change", () => {
    updateRatingStars(Number(input.value));
  });
});

reviewForm.addEventListener("submit", event => {
  event.preventDefault();

  const selectedRating = document.querySelector(".star-rating input:checked");
  const comment = document.getElementById("reviewComment").value.trim();

  savedReviews.unshift({
    rating: Number(selectedRating.value),
    comment
  });

  localStorage.setItem("portfolioReviews", JSON.stringify(savedReviews));
  renderReviews();
  reviewStatus.textContent = "Thank you. Your review has been added.";
  reviewForm.reset();
  updateRatingStars(0);
});

renderReviews();
