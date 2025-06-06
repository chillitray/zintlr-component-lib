import { createContext, useContext } from 'react';

/**
 * This code defines a context and a custom hook for the all pages.
 * provides a default value containing different user properties which can be used all over the website
 * Also contains the banner data to show
 */
export const UserContext = createContext({
  details: undefined, //user details page
  isLoggedIn: undefined, //to check if user is logged in or not
  bannerData: undefined, //to store the banner data
});

// Creating a custom hook called useUser,
// which will allow components to access the UserContext.
export const useUser = () => useContext(UserContext);
