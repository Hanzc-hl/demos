import React, { PropsWithChildren } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import styles from "./BasicLayout.less";

interface BasicLayoutProps {}

const BasicLayout: React.FC<PropsWithChildren<BasicLayoutProps>> = ({
  children,
}) => {
  return (
    <div className={styles.basicLayout}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default BasicLayout;
