import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

import styles from "./Header.less";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}></div>
      <nav className={styles.nav}>
        <Nav />
      </nav>
      <div className={styles.user}>user</div>
    </div>
  );
};

export default Header;
