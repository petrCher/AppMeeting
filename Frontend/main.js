import { API } from "./api.js";

const DOM = {
  profilesContainer: document.querySelector(".profiles"),
  profileDialog: document.querySelector("#profile-dialog"),
  commentForm: document.querySelector("#comment-form"),
  filtersForm: document.querySelector(".filters"),
  registrationDialog: document.querySelector("#account-dialog"),
};

const State = {
  filters: {
    min_age: 18,
    max_age: 24,
    gender: "мужской",
  },
  currentProfileId: null,
};

// function showError(message) {
//   alert(message);
// }

async function renderProfiles() {
  DOM.profilesContainer.innerHTML = "";

  try {
    const profiles = await API.getProfiles(State.filters);
    profiles.forEach(renderProfileCard);
  } catch (error) {
    showError("Failed to load profiles");
  }
}

function renderProfileCard(profile) {
  const card = document.createElement("div");
  card.className = "profile";
  card.dataset.id = profile.id;
  card.innerHTML = `
    <h3>${profile.name}</h3>
    <h4>${profile.gender} ${profile.age}</h4>
    <p>${profile.interests}</p>
  `;
  card.addEventListener("click", () => openProfile(profile.id));
  DOM.profilesContainer.appendChild(card);
}

async function openProfile(id) {
  try {
    State.currentProfileId = id;

    const profile = await API.getProfileById(id);
    renderProfileDetails(profile);
    await renderComments();
    DOM.profileDialog.showModal();
  } catch {
    showError("There is no such profile");
  }
}

function renderProfileDetails(profile) {
  DOM.profileDialog.innerHTML = `
  <div class="dialog-content">
    <button id="profile-close">×</button>
    <h3>${profile.name}</h3>
    <h4>${profile.gender}, ${profile.age} лет</h4>
    <p>Интересы: ${profile.interests}</p>
    <p>${profile.description}</p>
    <p>Связаться со мной: ${profile.contact}</p>
    <div id="comments"></div>
    ${DOM.commentForm.outerHTML}
  </div>
`;

  DOM.profileDialog
    .querySelector("#profile-close")
    .addEventListener("click", () => DOM.profileDialog.close());
}

async function renderComments() {
  try {
    // const comments = await API.getComments(State.currentProfileId);
    const comments = [
      {
        id: 1,
        profile_id: 1,
        author_name: "Алексей",
        content: "Привет! Тоже увлекаюсь алгоритмами!",
        created_at: "2024-01-01T11:00:00Z",
      },
      {
        id: 2,
        profile_id: 1,
        author_name: "Антон",
        content: "Привет! Тоже увлекаюсь мл!",
        created_at: "2024-01-24T11:00:00Z",
      },
    ];
    DOM.profileDialog.querySelector("#comments").innerHTML = comments
      .map(createCommentElement)
      .join("");
  } catch {
    showError("Could not show comments");
  }
}

function createCommentElement(comment) {
  return `
    <div class="comment">
      <h5>${comment.author_name} в ${new Date(
    comment.created_at
  ).toLocaleDateString()}</h5>
      <p>${comment.content}</p>
    </div>
  `;
}

function updateFilters({ min_age, max_age, gender }) {
  filters.min_age = parseInt(min_age) || 18;
  filters.max_age = parseInt(max_age) || 24;
  filters.gender = gender?.toLowerCase() || "default";

  renderProfiles();
}

function initEventListeners() {
  DOM.filtersForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    updateFilters(Object.fromEntries(new FormData(e.target)));
  });

  DOM.commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await handleCommentSubmit(new FormData(e.target));
  });

  document.querySelector(".create-account").addEventListener("click", () => {
    DOM.registrationDialog.showModal();
  });

  DOM.registrationDialog
    .querySelector("form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      await handleRegistration(new FormData(e.target));
    });

  DOM.registrationDialog
    .querySelector("#reg-cancel")
    .addEventListener("click", () => {
      DOM.registrationDialog.close();
    });
}

async function handleCommentSubmit(formData) {
  try {
    await API.sendComment(State.currentProfileId, formData);
    await renderComments();
  } catch (error) {
    showError("Failed to post comment");
  }
}

async function handleRegistration(formData) {
  try {
    const result = await API.registerProfile(formData);
    DOM.registrationDialog.close();
    console.log("Profile created successfully:", result.id);
    renderProfiles();
  } catch (error) {
    showError("Registration failed");
  }
}

function init() {
  initEventListeners();
  // renderProfiles();
}

window.onload = () => init();
