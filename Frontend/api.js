// Common
// -------------------------------------------------------

function checkForError(response) {
  if (!response.ok) {
    console.log("error", response.status);
    return true;
  }
  return false;
}

// Profile
// --------------------------------------------------------

export const API = {
  async getProfiles(filters) {

    const response = await fetch("http://127.0.0.1:8000/api/profiles", {
      method: "GET",
      query: {
        min_age: filters["min_age"],
        max_age: filters["max_age"],
        page: 1,
        limit: 10,
        gender: filters["gender"],
      },
    });
    if (checkForError(response)) return false;

    const profiles = await response.json();

    return profiles;
  },

  async getProfileById(profileId) {
    const response = await fetch(`http://127.0.0.1:8000/api/profiles/${profileId}`);
    if (checkForError(response)) return false;

    const profileData = await response.json();

    return profileData;
  },

  async registerProfile(formData) {
    // validation если успеем

    const response = await fetch("http://127.0.0.1:8000/api/profiles", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (checkForError(response)) return -1;

    const data = await response.json();

    return data.id;
  },

  // Comments
  // -----------------------------------------------------------------------

  async getComments(profileId) {
    const response = await fetch(`http://127.0.0.1:8000/api/profiles/${profileId}/comments`);
    if (checkForError(response)) return false;

    const data = await response.json();
    return data;
  },

  async sendComment(profile_id, formData) {
    const response = await fetch(`http://127.0.0.1:8000/api/profiles/${profile_id}/comments`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (checkForError(response)) return false;

    return true;
  },
};
