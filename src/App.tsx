import React, { useState } from 'react';
import './App.css';
import Cloud from './Cloud';
import GameOver from './GameOver';
import Menu from './Menu';
import Obstruction from './Obstruction';
import User, { UserStatus } from './User';

export type GameStatus = 'unstart' | 'start' | 'over'

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('unstart')
  const [userStatus, setUserStatus] = useState<UserStatus>('stand')
  const [total, setTotal] = useState<number>(0)
  const [speed, setSpeed] = useState<number>(2)
  const [canOperate, setCanOperate] = useState<boolean>(false)
  const [groundMoveInterval, setGroundMoveInterval] = useState<any>(null)

  const groundScroll = () => {
    let ground = document.querySelector('.ground-wrap') as HTMLElement;
    let _left = 0

    ground.style.backgroundPositionX = _left +'px';
    let cityMove = (_total: number, _speed: number) => {
      let speedResult = _speed;
      if (_left <= -600) {
        _left = 0
      }
      _left -= _speed * 3
      ground.style.backgroundPositionX = _left +'px';

      if (_total >= 100000) {
        speedResult = 6
      } else if (_total >= 8000) {
        speedResult = 5.5
      } else if (_total >= 6000) {
        speedResult = 5
      } else if (_total >= 4000) {
        speedResult = 4.5
      } else if (_total >= 2000) {
        speedResult = 4
      } else if (_total >= 1000) {
        speedResult = 3.5
      } else if (_total >= 500) {
        speedResult = 3
      } else if (_total >= 200) {
        speedResult = 2.5
      }

      const totalResult = _total + (_speed / 10)
      setGroundMoveInterval(requestAnimationFrame(() => cityMove(totalResult, speedResult)))
      setTotal(totalResult)
      setSpeed(speedResult)
    }
    cityMove(total, speed)
  }

  const keyupHandle = (e: any) => {
    if (!canOperate) {
      return
    }
    if (e.keyCode === 87 || e.keyCode === 38) {
      setUserStatus('jump')
      setTimeout(() => {
        setCanOperate(true)
        setUserStatus('run')
      }, Math.max(900 - speed * 100, 400))
    } else if (e.keyCode === 83 || e.keyCode === 40) {
      setUserStatus('slide')
      setTimeout(() => {
        setCanOperate(true)
        setUserStatus('run')
      }, Math.max(900 - speed * 100, 400))
    } else {
      setCanOperate(true)
    }
  }

  const gameStart = () => {
    setGameStatus('start')
    setUserStatus('run')
    setSpeed(2)
    setTotal(0)
    setCanOperate(true)
    groundScroll()
  }

  return (
    <div
      className="App"
      onKeyDown={(e) => {
        keyupHandle(e)
        setCanOperate(false)
      }}
      tabIndex={0}
    >
      { gameStatus === 'unstart' && <Menu gameStart={gameStart} /> }
      <div className='sky-wrap'>
        { gameStatus === 'start' && <div className="total">{Math.floor(total)}</div> }
        <Cloud />

        <Obstruction speed={speed} gameStatus={gameStatus} userStatus={userStatus} />

        <User speed={speed} status={userStatus} />
      </div>
      <div className="ground-wrap"></div>

      { gameStatus === "over" && <GameOver total={total} restart={gameStart} returnHome={() => setGameStatus('unstart')} />}
    </div>
  );
}

export default App;
