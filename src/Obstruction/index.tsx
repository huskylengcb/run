import React, { useEffect, useRef, useState } from 'react';
import { GameStatus } from '../App';
import { UserStatus } from '../User';

import './index.css';

interface Props {
  speed: number;
  gameStatus: GameStatus;
  userStatus: UserStatus;
  // gameStart: () => void;
}

const Obstruction = (props: Props) => {
  const { speed, gameStatus, userStatus } = props;
  const screenWidth = document.documentElement.clientWidth
  const obstructionWrap = useRef<any>(null)
  const obsInterval = [400, 600]
  const [obsMoveInterval, setObsMoveInterval] = useState<any>(null)

  const createObstruction = () => {
    let obsList: any = document.createElement('div')
    // 让障碍物随机在上方或者下方
    let state = Math.random() > 0.5 ? 'top' : 'bottom'
    obsList.className = 'obs-list-' + state
    obsList.state = state
    let random = Math.ceil(Math.random() * (speed - 2))
    random = Math.max(random, 1)
    for (let index = 0; index < random; index++) {
      let obsItem = document.createElement('div')
      obsItem.className = 'obs-item'
      obsList.appendChild(obsItem)
    }
    obsList.style.left = screenWidth + 'px'
    obsList.nextSpace = Math.random() * (obsInterval[1] - obsInterval[0]) + obsInterval[0] // 下一个障碍物间隔
    obstructionWrap.current.appendChild(obsList)
  }

  const obsMove = () => {
    console.log(speed, 'speed')
    // 获取所有障碍物
    let obsDoms = obstructionWrap.current.children
    let obsList = Array.from(obsDoms)

    let nextItem = null

    // 给每个障碍物添加移动
    for (let index = 0; index < obsList.length; index++) {
      let item: any = obsList[index]
      if (item.offsetLeft < -item.offsetWidth) {
        obstructionWrap.current.removeChild(item)
      } else {
        item.style.left = item.offsetLeft - speed * 3 + 'px'
      }

      // 由于只需要找到第一个符合条件的障碍物即可，所以这里需要进行判断
      if (!nextItem) {
        // 找到人物右侧最近的障碍物，进行碰撞检测
        // 需要进行检测的障碍物需满足条件：距离屏幕左侧距离>人物距离左侧距离+自身宽度
        // 人物宽度为120，人物距离左侧距离为屏幕的一半减去自身的一半
        if (item.offsetLeft > (screenWidth / 2 - 60 - item.offsetWidth)) {
          nextItem = item
        }
      }
    }

    // 碰撞检测
    // 当距离最近的障碍物处于检测区时，进行碰撞检测
    // if (nextItem.offsetLeft < (screenWidth / 2 + 60)) {
    //   if (nextItem.state === 'top') {
    //     if (userStatus !== 'slide') {
    //       // this.$emit('gameOver')
    //       // 游戏结束
    //       // alert('游戏结束')
    //       // this.gameOver()
    //       return
    //     }
    //   } else {
    //     if (userStatus !== 'jump') {
    //       // 游戏结束
    //       // this.$emit('gameOver')
    //       //  alert('游戏结束')
    //       //  this.gameOver()
    //       return
    //     }
    //   }
    // }

    // 找到最后一个障碍物，创建下一个障碍物
    let lastChild:  any = obsList[obsList.length - 1]
    // console.log(lastChild.nextSpace);
    if (lastChild.offsetLeft < (screenWidth - lastChild.offsetWidth - lastChild.nextSpace)) {
      createObstruction()
    }
    setObsMoveInterval(requestAnimationFrame(obsMove))
  }

  const init = () => {
    obstructionWrap.current.innerHTML = ''
    createObstruction()
    obsMove()
  }

  const gameOver = () => {
    cancelAnimationFrame(obsMoveInterval)
    setObsMoveInterval(null)
  }

  useEffect(() => {
    if (gameStatus === "start") {
      init()
    } else {
      gameOver()
    }
  }, [gameStatus])

  useEffect(() => {
    if (gameStatus === "start") {
      cancelAnimationFrame(obsMoveInterval)
      createObstruction()
      obsMove()
    }
  }, [speed])

  return (<div className="obstruction-wrap" ref={obstructionWrap} />)
}

export default Obstruction;