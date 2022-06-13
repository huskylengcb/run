import React from 'react';

import './index.css';

interface Props {
  total: number;
  restart: () => void;
  returnHome: () => void;
}

const GameOver = (props: Props) => {
  const { total, restart, returnHome } = props;

  return (<div className='gameover-wrap'>
  <div className="title">游戏结束!</div> 
  <div className="menu-total">
    <div className="total-desc">您的成绩为</div>
    <div className="total-menu">{total}m</div>
  </div>
  <div className="menu-box">
    <div className="menu-item" onClick={restart}>再来一次</div>
    <div className="menu-item" onClick={returnHome}>返回首页</div>
  </div>
</div>)
}

export default GameOver;