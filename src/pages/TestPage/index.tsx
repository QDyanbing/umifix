import React from 'react';
import Styles from './index.less';
import useControl from './useControl';

const Page: React.FC = () => {
  const { text } = useControl();

  return <div className={Styles.page}>{text}</div>;
};

export default Page;
