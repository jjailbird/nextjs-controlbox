import Image from 'next/image'
import style from './ButtonReset.module.css'

const ButtonReset = ({ disabled=false, onClick, children }) => {
  const buttonStyle = disabled ? style.button_disable : style.button

  return (
    <button type="button" onClick={onClick} className={`${buttonStyle}`}>
      <Image src="/images/icon-refresh.png" width={60} height={60} alt="reset" />{children}
    </button>
  )
}

export default ButtonReset
