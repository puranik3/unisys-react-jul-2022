import { createContext } from "react";

// ThemeContext.Provider -> use in the component that maintains the state value (App component here)
// ThemeContext.Consumer -> use it where you want to consume the value. In function component we use the useContext() hook which is simple to use.
const ThemeContext = createContext();

export {
    ThemeContext as default
};