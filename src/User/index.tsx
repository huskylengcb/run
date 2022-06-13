import React, { useEffect, useRef, useState } from 'react';

import './index.css';

const userRunList = [...new Array(10)].map((_, index: number) => require('../assets/images/user/run/Run_00'+index+'.png'))

export type UserStatus = 'stand' | 'run' | 'slide' | 'jump';

interface Props {
  speed: number;
  status: UserStatus;
}

const User = (props: Props) => {
  const { speed = 1, status } = props;
  const [runInterval, setRunInterval] = useState<any>(null)

  const userImg = useRef<HTMLDivElement>(null) as any

  const run = () => {
    let _index = 0
    let lastRunTime = 0

    let _run = () => {
      let now = new Date().getTime()
      if (now - lastRunTime > 120 - (speed * 20)) {
        if (_index > (userRunList.length - 1) ) {
          _index = 0
        }
        _index++
        userImg.current.classList.remove('slide', 'jump')
        userImg.current.src = userRunList[_index-1]
        lastRunTime = now
      }
      setRunInterval(requestAnimationFrame(_run))
    }
    _run()
  }

  const slide = () => {
    userImg.current.src = require('../assets/images/user/slide/Sliding_000.png')
  }

  const jump = () => {
    userImg.current.src = require('../assets/images/user/run/Run_000.png')
  }

  useEffect(() => {
    cancelAnimationFrame(runInterval)
    userImg.current && userImg.current.classList.remove('slide', 'jump')
    switch (status) {
      case 'run':
        run()
        return;
      case 'slide':
        userImg.current.classList.add('slide')
        slide()
        return;
      case 'jump':
        userImg.current.classList.add('jump')
        jump()
        return;
      default:
        userImg.current.src = require('../assets/images/user/stand.png')
        return;
    }
  }, [status, speed])

  return <div className='wrap user-model'>
    <img className='user-img' ref={userImg} />
  </div>
}

export default User;