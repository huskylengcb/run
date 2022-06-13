import React from 'react';

import './index.css';

interface Props {
  gameStart: () => void;
}

const Menu = (props: Props) => {
  const { gameStart } = props;

  return (<div className='menu-wrap'>
    <div className="title">奔跑吧，小朋友</div>
    <div className="menu-box">
      <div className="menu-item" onClick={gameStart}>开始游戏</div>
    </div>
  </div>)
}

export default Menu;