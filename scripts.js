const copiedText = "Copied";
document.documentElement.classList.add("js-reveal");

const toast = document.querySelector(".copy-toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1600);
}

async function copyToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

document.querySelectorAll("[data-copy]").forEach((element) => {
  element.dataset.originalMarkup = element.innerHTML;

  element.addEventListener("click", async () => {
    try {
      await copyToClipboard(element.dataset.copy);
      element.classList.add("is-copied");
      element.textContent = copiedText;
      showToast("Email copied to clipboard");
      window.setTimeout(() => {
        element.classList.remove("is-copied");
        element.innerHTML = element.dataset.originalMarkup;
      }, 1500);
    } catch {
      showToast("Copy failed");
    }
  });
});

const revealItems = document.querySelectorAll(".reveal-on-scroll");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
