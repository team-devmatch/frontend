import { useEffect, useState } from "react";
import styles from "./TopButton.module.css";

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button className={styles.topButton} onClick={moveToTop}>
      TOP
    </button>
  );
};

export default TopButton;
