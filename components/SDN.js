import style from './SDN.module.css'
import Image from 'next/image'
import ButtonNormal from './ButtonNormal'

export default function SDN({ onClick, disabled }) {
  return (
    <div className={`box-background ${style.box}`}>
      <div className={`${style.continer}`}>
        <div className={style.SDN_icon}>
          <Image src="/images/icon-tehtering.png" width={120} height={120} alt="Network" />
        </div>
        <div className={`${style.text}`}>
          Software-Defined <br />
          Network
        </div>
      </div>
      <div className={`${style.divider}`}>
      </div>
      <div className={`${style.continer}`}>
        <div className={`${style.button}`}>
          <ButtonNormal onClick={onClick} disabled={disabled}>Enable SDN</ButtonNormal>
        </div>
        {/* <div className={`${style.button}`}>
          <ButtonNormal>Disable SDN</ButtonNormal>
        </div> */}
      </div>
    </div>
  )
}