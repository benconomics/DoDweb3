const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

window.addEventListener("load", () => {
  if (!window.location.hash) return;
  const targetId = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(targetId);
  target?.scrollIntoView({ behavior: "auto" });
});

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-accordion] details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll("[data-accordion] details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const contactTopic = document.querySelector("[data-contact-topic]");

if (contactTopic) {
  const topicParam = new URLSearchParams(window.location.search).get("topic");
  const topicMap = {
    event: "Event submission",
    supporter: "Supporter / sponsorship",
    volunteer: "Trail work / volunteer",
    membership: "Membership",
    website: "Website feedback",
  };
  const topicValue = topicMap[topicParam || ""];
  if (topicValue) contactTopic.value = topicValue;
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const topic = data.get("topic") || "General question";
  const name = data.get("name") || "";
  const email = data.get("email") || "";
  const message = data.get("message") || "";
  const body = [
    `Topic: ${topic}`,
    name ? `Name: ${name}` : "",
    email ? `Reply email: ${email}` : "",
    "",
    message,
  ].filter(Boolean).join("\n");

  window.location.href = `mailto:communication@disciplesofdirt.org?subject=${encodeURIComponent(`DoD website: ${topic}`)}&body=${encodeURIComponent(body)}`;
});
