import * as styles from "./Layout.css"
import Header from './Header'
import Footer from './Footer'
import { Outlet } from "react-router-dom";
import { lightTheme, darkTheme } from "../../styles/themes.css";
import { ToastContainer, Slide } from 'react-toastify';
import { useEffect, useState } from "react";

const Layout = () => {
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";

  // Theme Toggle Function
  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? "light" : "dark";
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  }

  // Check Dark Mode Theme User Preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme && ["dark", "light"].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  return (
    <div className={`${styles.app} ${isDarkTheme ? darkTheme : lightTheme}`}>
      <ToastContainer 
        style={{ textAlign: "center" }} 
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        transition={Slide}
        theme="colored"
      />
      <Header handleToggleTheme={toggleTheme} />
      <div className={styles.appContent}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout