import React from 'react';
import {Container, Card, CardContent, Grid} from '@mui/material';
//, {useState, useRef}



function PrintQRCodePage({imageUrl}) { 




  return (
    <Container >
          <Card>
              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={12} lg={12} md={6} sm={12} xs={12}>
                          <h5>New QR Code</h5>
                          <img src={imageUrl} alt="img"/>
                          <button onClick={() => window.print()}>Print Code</button>
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>
    </Container>
  );
}


export default PrintQRCodePage;
/* 
// Component
import ReactDOM from 'react-dom'
import { QRCode } from 'react-qrcode'

ReactDOM.render(<QRCode value="https://www.1stg.me" />)

// hooks
import { useQRCode } from 'react-qrcode'

export const App = () => {
  const [value, setValue] = useState('https://www.1stg.me')
  const dataUrl = useQRCode(value)
  return (
    <>
      <div>dataUrl: {dataUrl}</div>
      <img src={dataUrl} />
      <input onChange={e => setValue(e.currentTarget.value)} />
    </>
  )
} */ 