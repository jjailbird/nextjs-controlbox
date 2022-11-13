import Head from 'next/head';
import { Container, Button } from '@mui/material'
import { RestartAltIcon, ThreeSixty } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'

import ButtonReset from '../components/ButtonReset'
import DeployNewService from '../components/DeployNewService'
import DeployUpgradeService from '../components/DeployUpgradeService'
import SDN from '../components/SDN'
import CarBackground from '../components/CarBackground';
import ModalBasic from '../components/ModalBasic';

import { io } from "socket.io-client"
import { sleep } from '../utils/timers'

const socket = io(`ws://${process.env.serverHost}:${process.env.serverPort}`)

export default function Home() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [downloadValue, setDownloadValue] = useState(0);
  const [download, setDownload] = useState(false)

  const [downloadValue2, setDownloadValue2] = useState(0);
  const [download2, setDownload2] = useState(false)

  const [modalDeployed, setModalDeployed ] = useState(false)
  const [modalUpgraded, setModalUpgraded ] = useState(false)

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
 
    socket.on("bacend_response", (arg) => {
      console.log('backend_resonse', arg)
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('bacend_response');
    };
  }, []);

  async function openModalDeployed() {
    setModalDeployed(true)
    // await sleep(500)
    // setModalDeployed(false)
  }

  function closeModalDeployed() {
    setModalDeployed(false)
    setDownload(false)
  }

  async function openModalUpgraded() {
    setModalUpgraded(true)
    // await sleep(500)
    // setModalDeployed(false)
  }

  function closeModalUpgraded() {
    setModalUpgraded(false)
    setDownload2(false)
  }


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
          await sleep(100)
          openModalDeployed()
          // setDownload(false)
          clearInterval(interval)
          count = 0
        }
      }, 10)
    } else if (command == 'ces_service2.sh') {
      setDownload2(true)
      let count = 0
      const interval = setInterval(async () => {
        setDownloadValue2(count)
        if (count < 100) {
          count++
        }
        if (count >= 100) {
          await sleep(100)
          openModalUpgraded()
          // setDownload2(false)
          clearInterval(interval)
          count = 0
        }
      }, 10)
    }

    socket.emit('backend_script', command)
  }

  function hidden_close() {
    if(window.confirm('Do you really wat to close?')) {
      window.close()
    }
  }

  return (
    <div>
      <ButtonReset onClick={() => { handleClick('ces_reset.sh') }}>Reset</ButtonReset>
      <DeployNewService onClick={() => { handleClick('ces_service1.sh') }} disabled={false} download={download} downloadValue={downloadValue} />
      <DeployUpgradeService onClick={() => { handleClick('ces_service2.sh') }} disabled={false} download={download2} downloadValue={downloadValue2} />
      <SDN onClick={() => { handleClick('ces_enable_sdn.sh') }} disabled={!isConnected} />
      <CarBackground />
      <ModalBasic open={modalDeployed} onClose={closeModalDeployed}>
        New Service was deployed.
      </ModalBasic>
      <ModalBasic open={modalUpgraded} onClose={closeModalUpgraded}>
        Service has been upgraded.
      </ModalBasic>
      <div id="hidden_close" onClick={hidden_close}></div>
    </div>
  )
}
