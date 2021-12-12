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