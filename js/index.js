const myNav = document.querySelector("nav");
const hamburgerMenuToggle = document.getElementById("hamburgerMenu");
const hamburgerMenuImg = document.getElementById("img");

hamburgerMenuToggle.addEventListener("click", function () {
  if (!myNav.classList.contains("nav-show")) {
    myNav.classList.add("nav-show");
  } else {
    setTimeout(() => {
      myNav.classList.remove("nav-show");
    }, 1300);
  }
  setTimeout(() => {
    document
      .querySelectorAll("nav > ul > li > button")
      .forEach((menuLi, index) => {
        menuLi.style.transitionDelay = `${index * 0.095}s`;
        menuLi.classList.toggle("showMenuLi");
      });
  }, 1000);



  if (hamburgerMenuImg.getAttribute("src") === "assets/images/team/image.png") {
    setTimeout(() => {
      hamburgerMenuImg.setAttribute("src", "assets/images/image.png");
    }, 500);
  } else {
    setTimeout(() => {
      hamburgerMenuImg.setAttribute("src", "assets/images/team/image.png");
    }, 1000);
  }
});

// submenu click event ----------------------------------------------

// Select all buttons in the navigation
document.querySelectorAll("nav > ul > li > button").forEach((button) => {
  button.addEventListener("click", function () {
    // Hide all submenus except the one related to the clicked button
    document.querySelectorAll("nav > ul > li > ul").forEach((submenu) => {
      if (submenu !== button.nextElementSibling) {
        submenu.classList.remove("show");
        submenu.querySelectorAll("li").forEach((submenuChild) => {
          submenuChild.classList.remove("show"); // Ensure all children are hidden
        });

        // Reset the icon of the button associated with the closed submenu
        // بازگشت آیکون دکمه مربوط به زیرمنوی بسته شده به حالت اولیه
        const associatedButton = submenu.previousElementSibling; // دکمه مربوط به زیرمنو را پیدا می‌کنیم
        const icon = associatedButton.querySelector("svg"); // آیکون دکمه را پیدا می‌کنیم
        if (icon) {
          icon.style.transform = "rotate(0deg)"; // آیکون را به حالت اولیه برمی‌گردانیم
          associatedButton.setAttribute("aria-expanded", "false"); // وضعیت aria-expanded را به false تغییر می‌دهیم
        }
      }
    });

    // Toggle the clicked button's submenu
    const submenu = button.nextElementSibling;
    submenu.classList.toggle("show");

    // Apply transition delay to submenu children if showing
    if (submenu.classList.contains("show")) {
      submenu.querySelectorAll("li").forEach((submenuChild, index) => {
        submenuChild.style.transitionDelay = `${index * 0.05}s`;
        submenuChild.classList.add("show");
      });
      button.setAttribute("aria-expanded", "true");
    } else {
      // If hiding the submenu, remove the show class to reset
      submenu.querySelectorAll("li").forEach((submenuChild) => {
        submenuChild.classList.remove("show");
      });
      button.setAttribute("aria-expanded", "false");
    }

    // Update the icon based on the submenu state
    const icon = button.querySelector("svg");
    if (icon) {
      icon.style.transform = submenu.classList.contains("show") ? "rotate(180deg)" : "rotate(0deg)";
    }
  });
});

document.getElementById("goToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// لیستی از کلمات که قرار است نمایش داده شوند
const words = ["workflow", "organization", "collaboration", "communication", "productivity"];
let wordIndex = 0;
let charIndex = 0;
const span = document.getElementById("span")

// تابعی برای نمایش تدریجی حروف یک کلمه
const typeEffect = () => {
  if (charIndex < words[wordIndex].length) {
    span.innerHTML += words[wordIndex][charIndex];
    charIndex++;
    setTimeout(typeEffect, 200)
  } else {
    setTimeout(deleteEffect, 1000)
  }
}
const deleteEffect = () => {
  if (span.innerHTML.length > 0) {
    span.innerHTML = span.innerHTML.slice(0, -1);
    setTimeout(deleteEffect, 1); // کاهش زمان تاخیر برای افزایش سرعت حذف
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    charIndex = 0;
    setTimeout(typeEffect, 200);
  }
};

typeEffect();


// ایجاد یک مشاهده‌گر (Observer) برای بررسی وضعیت عناصر در صفحه
const observer = new IntersectionObserver((entries) => {
  // بررسی تمام عناصر مشاهده شده
  entries.forEach((entry) => {
    // اگر عنصر در محدوده دید قرار گیرد (یعنی به صفحه وارد شود)
    if (entry.isIntersecting) {
      entry.target.classList.add("activeElement"); // کلاس "active" را اضافه کن تا ترنزیشن اجرا شود
    } else {
      entry.target.classList.remove("activeElement"); // کلاس را حذف کن تا در خروج از صفحه، حالت اولیه بازگردد

    }
  });
}, { threshold: 0.5 }); // مقدار ۰.۵ یعنی عنصر حداقل ۵۰٪ در صفحه دیده شود تا تغییرات رخ دهد

// یافتن همه عناصر دارای کلاس "animate" و اعمال مشاهده‌گر بر روی آن‌ها
document.querySelectorAll(".animateFromTop").forEach((el) => observer.observe(el));
document.querySelectorAll(".animateFromBottom").forEach((el) => observer.observe(el));
document.querySelectorAll(".animateFromLeft").forEach((el) => observer.observe(el));
document.querySelectorAll(".animateFromRight").forEach((el) => observer.observe(el));
document.querySelectorAll(".menuShow").forEach((el) => observer.observe(el));
document.querySelectorAll(".opacityShow").forEach((el) => observer.observe(el));








