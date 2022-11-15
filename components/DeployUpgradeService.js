import ButtonNormal from './ButtonNormal'
import Image from 'next/image'
import style from './DeployUpgradeService.module.css'
import CanvasDonutChart from './CanvasDonutChart'

import React, { useState } from 'react'
export default function DeployUpgradeService({ onClick, disabled = false, download = false, downloadValue = 0 }) {

  if (download) {
    return (
      <div className={`box-background ${style.box}`}>
        <div className={`${style.continer}`}>
          <div>
            <CanvasDonutChart width="250" height="250" value={downloadValue} />
          </div>
          <div className={`${style.downloading}`}>
            Downloading...
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`box-background ${style.box}`}>
        <div className={`${style.continer}`}>
          <div>
            <Image src="/images/icon-download.png" width={120} height={120} alt="download" />
          </div>
          <div className={`${style.text}`}>
            Deploy Aggregation Service
            <br />
            (Body + Camera)
          </div>
          <div className={`${style.button}`}>
            <ButtonNormal disabled={disabled} onClick={onClick}>Upgrade</ButtonNormal>
          </div>
        </div>
      </div>
    )
  }
}