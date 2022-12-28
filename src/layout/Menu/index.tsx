import React from 'react';
import classNames from 'classnames';
import Styles from './index.less';
import useControl from './useControl';

export interface IMenuChild {
  name: string;
  path: string;
  authCode: string[];
}

export interface IMenu {
  name: string;
  path: string;
  icon: string;
  activeIcon: string;
  authCode: string[];
  children?: IMenuChild[];
}

interface IMenuProps {
  productName: string;
  productLogo: string;
  menuData: IMenu[];
}

const Menu: React.FC<IMenuProps> = ({ productName, productLogo, menuData }) => {
  const {
    menu,
    hover,
    hoverItem,
    active,
    openPath,
    onEnterMenu,
    onLeaveMenu,
    onItemEnter,
    onItemLeave,
    onOpenChange,
    onMenuItemClick,
    onClickMenu,
  } = useControl(menuData);

  return (
    <div
      className={classNames(Styles.menu, {
        [Styles.menuHover]: hover,
      })}
      onMouseEnter={onEnterMenu}
      onMouseLeave={onLeaveMenu}
      onClick={onClickMenu}
    >
      <div className={Styles.product}>
        <img className={Styles.productImg} src={productLogo} />
        {hover && (
          <React.Fragment>
            <div className={Styles.productName}>{productName}</div>
            <div className={Styles.line} />
          </React.Fragment>
        )}
      </div>
      {menu.map((item) => {
        const isActive =
          active.includes(item.path) || hoverItem?.includes(item.path);
        if (item.children) {
          return (
            <React.Fragment key={item.path}>
              <div
                className={classNames(Styles.menuItem, {
                  [Styles.activeLast]: active.includes(item.path) && !hover,
                })}
                onMouseEnter={() => onItemEnter(item.path)}
                onMouseLeave={onItemLeave}
                onClick={() => onOpenChange(item.path)}
              >
                <img
                  className={Styles.icon}
                  src={isActive ? item.activeIcon : item.icon}
                />
                {hover && (
                  <React.Fragment>
                    <div className={Styles.name}>{item.name}</div>
                    <span
                      className={classNames(Styles.arrow, {
                        [Styles.openArrow]: openPath.includes(item.path),
                      })}
                    />
                  </React.Fragment>
                )}
              </div>
              {hover &&
                openPath.includes(item.path) &&
                item.children.map((child, index) => (
                  <div
                    key={child.name}
                    style={{
                      marginTop: index === 0 ? -10 : 2,
                      marginBottom:
                        (item.children || [])?.length - 1 === index ? 20 : 2,
                    }}
                    className={classNames(Styles.subMenuItem, {
                      [Styles.activeSubMenuItem]: active.includes(child.path),
                    })}
                    onMouseEnter={() => onItemEnter(child.path)}
                    onMouseLeave={onItemLeave}
                    onClick={() => onMenuItemClick(child.path)}
                  >
                    {child.name}
                  </div>
                ))}
            </React.Fragment>
          );
        } else {
          return (
            <div
              key={item.path}
              className={classNames(Styles.last, {
                [Styles.activeLast]: active.includes(item.path),
              })}
              onMouseEnter={() => onItemEnter(item.path)}
              onMouseLeave={onItemLeave}
              onClick={(e) => {
                e.stopPropagation();
                onMenuItemClick(item.path);
              }}
            >
              <img
                className={Styles.icon}
                src={isActive ? item.activeIcon : item.icon}
              />
              {hover && item.name}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Menu;
