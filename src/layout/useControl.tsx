import { useMemo } from 'react';
import { useLocation } from 'umi';

const HidePath: string[] = [];

function useControl() {
  const { pathname } = useLocation();
  const showMenu = useMemo(
    () => HidePath.every((item) => !pathname.includes(item)),
    [pathname],
  );

  return {
    showMenu,
  };
}

export default useControl;
