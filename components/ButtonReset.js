import Image from 'next/image'
import style from './ButtonReset.module.css'

const ButtonReset = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className={`${style.button}`}>
      <Image src="/images/icon-refresh.png" width={60} height={60} alt="reset" />{children}
    </button>
  )
}

export default ButtonReset
