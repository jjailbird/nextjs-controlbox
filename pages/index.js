import Head from 'next/head';
import { Container, Button } from '@mui/material'
import { RestartAltIcon, ThreeSixty } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'

import ButtonReset from '../components/ButtonReset'
import DeployNewService from '../components/DeployNewService'
import DeployUpgradeService from '../components/DeployUpgradeService'
import SDN from '../components/SDN'
import CarBackground from '../components/CarBackground';

import { io } from "socket.io-client"
import { sleep } from '../utils/timers'

const socket = io(`ws://${process.env.serverHost}:${process.env.serverPort}`)

export default function Home() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [downloadValue, setDownloadValue] = useState(0);
  const [download, setDownload] = useState(false)

  function startDownload() {
    setDownload(!download)
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    });

    socket.on('disconnect', () => {
      setIsConnected(false)
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on("bacend_response", (arg) => {
      console.log('backend_resonse', arg)
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off('bacend_response');
    };
  }, []);

  async function handleClick(command) {
    if (command == 'ces_service1.sh') {
      setDownload(true)
      let count = 0
      const interval = setInterval(async () => {
        setDownloadValue(count)
        if (count < 100) {
          count++
        }
        if (count >= 100) {
          await sleep(600)
          setDownload(false)
          clearInterval(interval)
          count = 0
        }
      }, 10)
      // setProgress(0);
      // setDownloadProgressModal(true)
      // downloadWithProgressTest()
      // downloadWithProgress()
    }
    socket.emit('backend_script', command)
  }

  return (
    <div>
      <ButtonReset onClick={() => { handleClick('ces_reset.sh') }}>Reset</ButtonReset>
      <DeployNewService onClick={() => { handleClick('ces_service1.sh') }} disabled={false} download={!isConnected} downloadValue={downloadValue} />
      <DeployUpgradeService onClick={() => { handleClick('ces_service2.sh') }} disabled={!isConnected} />
      <SDN onClick={() => { handleClick('ces_enable_sdn.sh') }} disabled={!isConnected} />
      <CarBackground />
    </div>
  )
}
