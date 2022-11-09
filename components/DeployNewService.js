import ButtonNormal from './ButtonNormal'
import Image from 'next/image'
import style from './DeployNewService.module.css'
import CircularProgress, { CircularProgressProps} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CanvasDonutChart from './CanvasDonutChart'

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={250} thickness={0.5} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={style.downloading_text}>{`${Math.round(props.value)}`}</div>
        <div>%</div>
      </Box>
    </Box>
  );
}

export default function DeployNewService({ onClick, download = false, disabled = false, downloadValue = 0 }) {
  if (download) {
    return (
      <div className={`box-background ${style.box}`}>
        <div className={`${style.continer}`}>
          <div>
            {/* <CircularProgressWithLabel  value={50} /> */}
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
            <Image src="/images/icon-setting.png" alt="setting" width={120} height={120} />
          </div>
          <div className={`${style.text}`}>
            Deploy New Service
          </div>
          <div className={`${style.button}`}>
            <ButtonNormal onClick={onClick} disabled={disabled}>Start</ButtonNormal>
          </div>
        </div>
      </div>
    )
  }
}