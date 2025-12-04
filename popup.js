// Fun taglines that rotate
const taglines = [
  "🌊 Surf the web, pure and simple!",
  "🛡️ Your privacy guardian at work!",
  "✨ Clean browsing, happy you!",
  "🚀 Faster pages, fewer distractions!",
  "🧹 Sweeping away the cookie clutter!",
  "🌈 Making the web a better place!",
  "🎯 Blocking the noise, keeping the signal!",
  "☕ Enjoy your browsing, we got this!",
  "🦸 Your friendly neighborhood ad blocker!",
  "🌿 Organic, farm-fresh web pages!",
];

// Pick a random tagline on load
document.addEventListener("DOMContentLoaded", () => {
  const taglineEl = document.getElementById("tagline");
  const randomIndex = Math.floor(Math.random() * taglines.length);
  taglineEl.textContent = taglines[randomIndex];

  // Handle email button click - copy email to clipboard
  const emailBtn = document.getElementById("emailBtn");
  const emailIcon = document.getElementById("emailIcon");
  const checkIcon = document.getElementById("checkIcon");
  const emailText = document.getElementById("emailText");
  const email = "lync201x@gmail.com";

  emailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      // Show success state
      emailIcon.style.display = "none";
      checkIcon.style.display = "block";
      emailText.textContent = "Copied!";

      // Reset after 2 seconds
      setTimeout(() => {
        emailIcon.style.display = "block";
        checkIcon.style.display = "none";
        emailText.textContent = "Email";
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  });
});
