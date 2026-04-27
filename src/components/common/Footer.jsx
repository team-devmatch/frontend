import styles from "./Footer.module.css";
import logo from "../../assets/images/logo.svg";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoBox}>
          <img src={logo} alt="FestiGo" className={styles.logo} />
        </div>

        <p className={styles.copy}>© 2026 FestiGo. All rights reserved.</p>

        <div className={styles.snsBox}>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="#" aria-label="X">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
