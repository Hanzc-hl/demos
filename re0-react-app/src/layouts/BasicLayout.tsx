import React, { PropsWithChildren } from "react";
import Header from "../components/common/Header";
import styles from './BasicLayout.less';

interface BasicLayoutProps {}

const BasicLayout: React.FC<PropsWithChildren<BasicLayoutProps>> = ({
  children,
}) => {
  return (
    <div className={styles.basicLayout}>
      <Header />
      {children}
    </div>
  );
};

export default BasicLayout;
