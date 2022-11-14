
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
// import style from './ModalBasic.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,

  // height: 120,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 7,
  boxShadow: 24,
  p: 4,
};

export default function ModalBasic({ open, onClose, children }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
      >
        {/* <div className={style.modal_basic}>
          <div>{children}</div>
        </div> */}
        <Box sx={style} marginTop={-25}>
          <Typography id="modal-modal-title" variant="h6" component="h1" align='center' fontFamily={'NotoSantos'} fontWeight={'bold'} fontSize={34}>
            {children}
          </Typography>
        </Box>

      </Modal>
    </div>
  );
}
