
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Image from 'next/image'
import ButtonPopup from './ButtonPopup'
// import style from './ModalBasic.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  // height: 120,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 7,
  boxShadow: 24,
  p: 4,
};

export default function ModalReset({ open, onClose, children, onClick1, onClick2 }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
      >
        <Box sx={style}>
          <Box alignSelf={'center'}><Image src="/images/icon-info.png" width={100} height={100} /></Box>
          <Typography id="modal-modal-title" variant="h6" component="h1" align='center' 
            fontFamily={'NotoSantos'} fontWeight={'bold'} fontSize={34} paddingTop={2}
          >
            {children}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              m: '60px 20px -30px 20px',
              
            }}
          >
           <ButtonPopup onClick={onClick1}>Yes</ButtonPopup>
           <ButtonPopup onClick={onClick2}>No</ButtonPopup> 
          </Box>
        </Box>

      </Modal>
    </div>
  );
}
