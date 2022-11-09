import ButtonNormal from './ButtonNormal'
import Image from 'next/image'
import style from './DeployUpgradeService.module.css'

import React, { useState } from 'react'
export default function DeployUpgradeService({ onClick, disabled = false }) {
  
  return (
    <div className={`box-background ${style.box}`}>
      <div className={`${style.continer}`}>
        <div>
          <Image src="/images/icon-download.png" width={120} height={120} alt="download" />
        </div>
        <div className={`${style.text}`}>
          Deploy Upgrade Service
        </div>
        <div className={`${style.button}`}>
          <ButtonNormal disabled={disabled} onClick={onClick}>Upgrade</ButtonNormal>
        </div>
      </div>
    </div>
  )
}