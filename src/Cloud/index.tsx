import React, { useEffect, useRef, useState } from 'react';

import './index.css';

const Cloud = () => {
  const screenWidth = document.documentElement.clientWidth;
  const cloudSpeed = 1
  const cloudWrap = useRef<HTMLDivElement>(null) as any

  const createCloud = (lastCreateTime: number) => {
    let now = new Date().getTime();
    if (now - lastCreateTime > 3000) {
      // 创建云朵
      let cloudItem = document.createElement('div')
      cloudItem.className = 'cloud-item'
      // 设置云朵变化系数
      const cloudScale = Math.random()
      // 设置云朵大小
      cloudItem.style.transform = `scale(${cloudScale})`
      // 设置云朵透明度
      cloudItem.style.opacity = `${cloudScale}`
      // 设置云朵位置
      let _left = screenWidth
      cloudItem.style.left = `${_left}px`
      let _top = Math.random() * 400
      cloudItem.style.top = `${_top}px`

      cloudWrap.current.appendChild(cloudItem)

      // 云朵移动
      let cloudMove = () => {
        // 云朵越大，移动速度越快
        let moveX = cloudSpeed * cloudScale
        let _left = +cloudItem.style.left.slice(0, -2)
        cloudItem.style.left = _left - moveX + 'px'

        // 如果云朵距离屏幕顶部距离大于等于屏幕高度，则移除此云朵
        if (cloudItem.offsetLeft < (-cloudItem.offsetWidth)) {
          cloudWrap.current.removeChild(cloudItem)
        } else {
          requestAnimationFrame(cloudMove)
        }
      }
      cloudMove()
      cloudMove()
      requestAnimationFrame(() => createCloud(now))
    } else {
      requestAnimationFrame(() => createCloud(lastCreateTime))
    }
  }

  useEffect(() => {
    createCloud(0)
  }, [])
  return <div className='cloud-wrap' ref={cloudWrap}></div>
}

export default Cloud;
