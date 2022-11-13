import style from './ButtonPopup.module.css'
import React, {useState} from 'react'

const ButtonPopup = ({ disabled=false, onClick, children }) => {
  
  const buttonStyle = disabled ? style.button_disable : style.button

  return (
    <button type="button" onClick={onClick} className={`${buttonStyle}`}>
      {children}
    </button>
  )
}

export default ButtonPopup
