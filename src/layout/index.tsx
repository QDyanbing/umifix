import React from "react";
import { Outlet } from "umi";
import Menu from "./Menu";
import { menuData } from "./menuData";
import Styles from "./index.less";
import useControl from "./useControl";
import productLogo from "@/assets/img/productLogo.png";

export default () => {
  const { showMenu } = useControl();

  return (
    <div className={Styles.layout}>
      {showMenu ? (
        <React.Fragment>
          <Menu
            menuData={menuData}
            productName="数据合规评估"
            productLogo={productLogo}
          />
          <div className={Styles.main}>
            <Outlet />
          </div>
        </React.Fragment>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
