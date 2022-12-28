import { useCallback, useEffect, useMemo, useState } from 'react';
import { history, useLocation, useModel } from 'umi';
import type { IMenu } from './index';

function useControl(menuData: IMenu[]) {
  const { initialState } = useModel('@@initialState');

  // 过滤没有权限的菜单项
  const menu: IMenu[] = useMemo(() => {
    const authCode = initialState?.auth || [];
    function getAuthMenu(data: IMenu[]): IMenu[] {
      const result: IMenu[] = [];
      data.forEach((item: IMenu) => {
        const target = authCode.find((code) =>
          item.authCode.includes(code.code),
        );
        if (target) {
          result.push({
            ...item,
            children:
              item.children && item.children.length > 0
                ? getAuthMenu(item.children as IMenu[])
                : undefined,
          });
        }
      });
      return result;
    }
    return getAuthMenu(menuData || []);
  }, [menuData, initialState?.auth]);

  // 页面加载设置当前选中的菜单
  const { pathname } = useLocation();
  const [active, setActive] = useState<string>(pathname || '');
  useEffect(() => {
    setActive(pathname);
  }, [pathname, setActive]);

  const [hover, setHover] = useState(false);
  const [hoverItem, setHoverItem] = useState<string | undefined>();
  const [openPath, setOpenPath] = useState<string[]>([]);

  const onEnterMenu = useCallback(() => {
    setHover(true);
  }, [setHover]);

  const onLeaveMenu = useCallback(() => {
    setHover(false);
  }, [setHover]);

  const onClickMenu = useCallback(() => {
    if (!hover) {
      setHover(true);
    }
  }, [hover, setHover]);

  const onItemEnter = useCallback(
    (path: string) => {
      setHoverItem(path);
    },
    [setHoverItem],
  );

  const onItemLeave = useCallback(() => {
    setHoverItem(undefined);
  }, [setHoverItem]);

  const onMenuItemClick = useCallback(
    (path: string) => {
      setActive(path);
      setHover(false);
      history.push(path);
    },
    [setActive, setHover],
  );

  const onOpenChange = useCallback(
    (path: string) => {
      if (openPath.includes(path)) {
        setOpenPath((state) => state.filter((item) => item !== path));
      } else {
        setOpenPath((state) => [...state, path]);
      }
    },
    [openPath, setOpenPath],
  );

  return {
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
  };
}

export default useControl;
