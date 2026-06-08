const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const trailPhotoSets = {
  cbp: [
    {
      src: "assets/trails/cbp-jump.jpg",
      alt: "Rider jumping at Carpenter Bypass",
      width: 1800,
      height: 1201,
    },
    {
      src: "assets/trails/cbp-tech.jpg",
      alt: "Technical trail sign at Carpenter Bypass",
      width: 1800,
      height: 1200,
    },
  ],
  thurston: [
    {
      src: "assets/trails/thurston-sean.jpg",
      alt: "Rider on a forested Thurston Hills trail",
      width: 1800,
      height: 1200,
    },
    {
      src: "assets/trails/thurston-austin.jpg",
      alt: "Rider jumping at Thurston Hills",
      width: 1800,
      height: 1200,
    },
  ],
  ridgeline: [
    {
      src: "assets/trails/eugene-pipedream.jpg",
      alt: "Pipedream trail entrance in the Ridgeline system",
      width: 1800,
      height: 1013,
    },
    {
      src: "assets/trails/eugene-moon.jpg",
      alt: "Handlebar view on a Ridgeline trail",
      width: 1800,
      height: 1013,
    },
  ],
  oakridge: [
    {
      src: "assets/trails/oakridge-sourgrass.jpg",
      alt: "Sourgrass meadow singletrack near Oakridge",
      width: 1800,
      height: 1013,
    },
    {
      src: "assets/trails/oakridge.jpg",
      alt: "Forest bridge on an Oakridge trail",
      width: 1800,
      height: 1013,
    },
  ],
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

document.querySelectorAll("[data-trail-area]").forEach((image) => {
  const photoSet = trailPhotoSets[image.dataset.trailArea];
  if (!photoSet?.length) return;
  const photo = photoSet[Math.floor(Math.random() * photoSet.length)];
  image.src = photo.src;
  image.alt = photo.alt;
  image.width = photo.width;
  image.height = photo.height;
});

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
