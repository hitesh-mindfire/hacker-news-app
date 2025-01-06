/**
 * API endpoints for the app.
 */
export const endPoints = {
  news: {
    newNews: "newstories.json",
    pastNews: "beststories.json", // considered beststories as past
    newNewsDetails: "item",
  },
  auth: {
    userDetails: "user",
    fetchUserDetails: "https://www.googleapis.com/userinfo/v2/me",
  },
};
