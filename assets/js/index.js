var togglebtn = document.getElementById("theme-toggle-button");
var htmlElement = document.documentElement;
var navLinks = document.querySelectorAll(".nav-links a");
var sections = document.querySelectorAll("section[id]");
var portfolioSection = document.getElementById("portfolio");
var filterButtons = portfolioSection.querySelectorAll(".portfolio-filter");
var portfolioItems = portfolioSection.querySelectorAll(".portfolio-item");
var carousel = document.getElementById("testimonials-carousel");
var cards = document.querySelectorAll(".testimonial-card");
var indicators = document.querySelectorAll(".carousel-indicator");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var GearBtn = document.getElementById("settings-toggle");
var sidebar = document.getElementById("settings-sidebar");
var closeBtn = document.getElementById("close-settings");
var fontButtons = document.querySelectorAll(".font-option");
var resetBtn = document.getElementById("reset-settings");
var DEFAULT_FONT = "tajawal";
var currentFont = DEFAULT_FONT;
var scrollBtn = document.getElementById("scroll-to-top");


// First Task Dark Mode Task ----------------------

togglebtn.addEventListener("click", function () {
  htmlElement.classList.toggle("dark");
});

// Second Task Active Link Task ----------------------

function clearActiveLinks() {
  navLinks.forEach(function (link) {
    link.classList.remove("active-link");
  });
}

var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;

        clearActiveLinks();

        var activeLink = document.querySelector(
          '.nav-links a[href="#' + id + '"]'
        );

        if (activeLink) {
          activeLink.classList.add("active-link");
        }
      }
    });
  },
  {
    rootMargin: "-80px 0px -40% 0px",
  }
);

sections.forEach(function (section) {
  observer.observe(section);
});

// Third Task Navs and Tabs Task ----------------------

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
      filterButtons[j].setAttribute("aria-pressed", "false");
    }

    this.classList.add("active");
    this.setAttribute("aria-pressed", "true");

    var filterValue = this.dataset.filter;

    for (var k = 0; k < portfolioItems.length; k++) {
      var item = portfolioItems[k];

      if (filterValue === "all") {
        item.style.display = "block";
      } else if (item.dataset.category === filterValue) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  });
}

// Fourth Task Carasoul Task ----------------------

var startIndex = 0;
function getVisibleCount() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}
function updateCarousel() {
  var visibleCount = getVisibleCount();
  var maxIndex = cards.length - visibleCount;
  if (startIndex > maxIndex) startIndex = maxIndex;
  var movePercentage = (100 / visibleCount) * startIndex;
  carousel.style.transform = "translateX(" + movePercentage + "%)";
  indicators.forEach((dot, i) => {
    if (i === startIndex) {
      dot.classList.add("bg-black", "dark:bg-white");
      dot.classList.remove("bg-slate-400", "dark:bg-slate-600");
      dot.setAttribute("aria-selected", "true");
    } else {
      dot.classList.remove("bg-black", "dark:bg-white");
      dot.classList.add("bg-slate-400", "dark:bg-slate-600");
      dot.setAttribute("aria-selected", "false");
    }
  });
}
indicators.forEach(function (indicator, index) {
  indicator.addEventListener("click", function () {
    startIndex = index;
    updateCarousel();
  });
});
nextBtn.addEventListener("click", function () {
  var visibleCount = getVisibleCount();
  var maxIndex = cards.length - visibleCount;
  if (startIndex < maxIndex) {
    startIndex++;
  } else {
    startIndex = 0;
  }
  updateCarousel();
});
prevBtn.addEventListener("click", function () {
  var visibleCount = getVisibleCount();
  var maxIndex = cards.length - visibleCount;
  if (startIndex > 0) {
    startIndex--;
  } else {
    startIndex = maxIndex;
  }
  updateCarousel();
});
window.addEventListener("resize", updateCarousel);
updateCarousel();

// Fifth Task Gear And Side Bar and Fonts ----------------------

function openSidebar() {
  sidebar.classList.remove("translate-x-full");
  sidebar.classList.add("translate-x-0");
  sidebar.setAttribute("aria-hidden", "false");

  GearBtn.classList.add("opacity-0", "pointer-events-none");
  GearBtn.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  sidebar.classList.add("translate-x-full");
  sidebar.classList.remove("translate-x-0");
  sidebar.setAttribute("aria-hidden", "true");

  GearBtn.classList.remove("opacity-0", "pointer-events-none");
  GearBtn.setAttribute("aria-expanded", "false");
}

function toggleSidebar() {
  var isOpen = GearBtn.getAttribute("aria-expanded") === "true";
  isOpen ? closeSidebar() : openSidebar();
}

GearBtn.addEventListener("click", toggleSidebar);
closeBtn.addEventListener("click", closeSidebar);

function applyFont(fontName) {
  document.body.classList.remove(
    "font-tajawal",
    "font-cairo",
    "font-alexandria"
  );

  document.body.classList.add(`font-${fontName}`);
}

function updateFontUI(fontName) {
  fontButtons.forEach((btn) => {
    var isActive = btn.dataset.font === fontName;

    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-checked", isActive);
  });
}
function selectFont(fontName) {
  currentFont = fontName;
  applyFont(fontName);
  updateFontUI(fontName);
}

fontButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectFont(btn.dataset.font);
  });
});

resetBtn.addEventListener("click", () => {
  selectFont(DEFAULT_FONT);
});

selectFont(DEFAULT_FONT);

// sixth Task Rocket Scroll Task ----------------------

window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
    scrollBtn.classList.remove("opacity-100", "visible");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
