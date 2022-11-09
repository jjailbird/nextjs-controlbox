import Image from 'next/image'
import style from './ButtonNormal.module.css'
import React, {useState} from 'react'

const ButtonNormal = ({ disabled=false, onClick, children }) => {
  
  const buttonStyle = disabled ? style.button_disable : style.button

  return (
    <button type="button" onClick={onClick} className={`${buttonStyle}`}>
      {children}
    </button>
  )
}

export default ButtonNormal
