import React, {useState, useRef} from 'react';
import {Container, Card, CardContent,  Grid, TextField, Button} from '@mui/material';
//import {makeStyles,} from '@mui/material/';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
//import QRScan from 'qrscan';
//import ReactiveQR from "reactive-qr";
//import QrCodeScanner from '@sensorfactdev/qr-code-scanner';
//import BarcodeScannerComponent from "react-qr-barcode-scanner";
import PrintQRCodePage from './PrintQRCodePage'
import ReactToPrint,{ PrintContextConsumer }  from 'react-to-print';
import {ComponentToPrint} from './PrintComponent'

import QRCodes   from 'qrcode.react'
import moment from 'moment'



function App() { 
  const now = moment().format('HH:mm:ss');
  const bf = moment()
  bf.add('m',8)
  //console.log(moment(now,'HHmmss'),bf,now)

  var dateString = '07-15-2016';
  var momentObj = moment(dateString, 'MM-DD-YYYY');
  var momentString = momentObj.format('YYYY-MM-DD');

  //console.log(momentObj,momentString) 
  const n = moment(now,'HHmmss')
  console.log(  (bf - n )/60000 ,bf,n.format('LTS'))
  const ppp = "data:imagepng;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAACm0lEQVR4nO2YQY7jMBAD/f9P756jAeIhSFltThWQk2I2W+VDkOsfVHGdLgBZEFoGQstAaBkILQOhZSC0DISWgdAyEFoGQstAaBkILQOhZSC0DFvodV2PftQ+7ven7Xe7jx0wbGGEugHDFkaoGzBsYYS6AeFC6Xz3Qqfv9yNvWqF0PkIPF0rnI/RwoXQ+QsOFdl+omufmP72fCkIRqhVCKEKj+en+T++nUifU7TttPxWEDt9PBaHD91NB6PD9VP680PR8hCIUocq52mfafioIRejeQmr+6XMXhA47d0HosHMXhA47dxkvdPfnbv7u86f3k33YAQhFKEIRitDf+rATDuO+AOkLPc3rN0DoJ6/fAKGfvH4DhH4y7s9598Jdwaf7uyB0WH8XhA7r74LQYf1dxv0K2H3B6rx0P3f+bT87IQxCPRCK0L0g1ONxobuFuRfoCnb7uSBUPE/3TYNQ8TzdNw1CxfN03zTHfxSlhbjfd/ueFozQcF+EIhShCP3SL73g3bn7/d0X6L4w6XwVhIr7pPdLg1Bxn/R+aRAq7pPeL83xH0UuaQHuC+HOs+/DTjgMQpd5dsJhELrMsxMOg9Blnh0QvqD0wnfPq+e7+7ggFKFLAEKjfVwQitAlYHfB8IU//QK6L5R8X3YAQhGazEfokmcHIPRvCd298O7z0/NUEIrQJQChW+epIBShS8AwoWlB6vNuHxeEInQJQChCEbqPOqHpvipPC/wx3w5AaPR5F4SaeennXRBq5qWfd3n9n/On+93Ne3y+HYDQr/MQGs5HqBqA0K/zXi909+duvtrXzVPZnm8HIFQCoQjV8u0AhEqMFwqzQGgZCC0DoWUgtAyEloHQMhBaBkLLQGgZCC0DoWUgtAyEloHQMhBaxn+82YKbqzSRJwAAAABJRU5ErkJggg=="
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState(ppp);
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  //const classes = useStyles();
  const qrRef = useRef(null);

  //const [data, setData] = React.useState("Not Found");
  let componentRef = useRef();
 /*  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  }); */

 /*  const handleScanResult = result => {
    console.log(result);
  } */

  const getQR = ()=>{
      const qr = document.querySelector('#qrcode')
      const qrVal = document.querySelector('#qrVal')
      let input = qr;

      let reader = new FileReader();
      reader.onload = function(){
      let dataURL = reader.result;
      qrVal.textContent = dataURL
      //let output = document.getElementById('output');
      //output.src = dataURL;
      //base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      };
      reader.readAsDataURL(input.files[0]);
      console.log(qr,qr.files[0])
  }

  const opts = {
    errorCorrectionLevel: 'Q',
    type: 'image/png',
    width : 350,
    margin: 1,
    
  }
  const generateQrCode = async () => {
    try {
          //setText(moment())
          const now = moment().format('HH:mm:ss');
          //const news = JSON.stringify({'h':600,'m':800,s:'67'})
          const response = await QRCode.toDataURL(now,opts);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
      else{
        console.log(result)
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        const af = moment()
        const bf = moment(result,'HHmmss')
        const res = result + " - " + ( (af-bf) / 60000)
        setScanResultWebCam(res);
    }
   }

   return (
    <Container >
      <PrintQRCodePage  imageUrl={ppp} />


      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <ComponentToPrint imageUrl={imageUrl} ref={(el) => (componentRef = el)} />
      </div>
          <Card>
          <ReactToPrint content={() => componentRef}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button onClick={handlePrint}>Print this out!</button>
            )}
          </PrintContextConsumer>

          
          <button onClick={getQR}> get QR </button>
          <button onClick={() => window.print()}>PRINT</button>
        </ReactToPrint>

              <QRCodes  value={text} size={420} width={100} level="Q" onClick={e=>console.log(e)} />


              <h2 id="qrVal" >Generate Download & Scan QR Code with React js</h2>
              <input type="file" name="image" accept="image/*" capture="environment" />

              <input id="qrcode" type="file" name="image" accept="image/*" capture="user" />

              <button onclick="window.print()">Print this page</button>

              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                          <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                          <Button  variant="contained" 
                            color="primary" onClick={() => generateQrCode()}>Generate</Button>
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img  src={imageUrl} alt="img"/>
                              </a>) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button  variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3>Scanned Code: {scanResultFile}</h3>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                         <h3>Qr Code Scan by Web Cam</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>
    </Container>
  );
}

/* const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));



 <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>

  <ReactiveQR onCode={code => console.log(code)} />  

*/
export default App;