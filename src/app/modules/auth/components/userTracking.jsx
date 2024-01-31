// userTracking.js

let currentUser = null;

export const setCurrentUser = (user) => {
  currentUser = user;
};

export const trackUserLogin = () => {
  if (currentUser) {
    const userId = currentUser.id;
    const username = currentUser.user;

    // Implement your tracking logic here
    console.log(`User ID: ${userId}, Username: ${username}, has logged in.`);
  }
};
