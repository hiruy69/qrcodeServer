import React from 'react';
import {Container, Card, CardContent, Grid} from '@mui/material';

export class ComponentToPrint extends React.Component {
    render() {
      return (
        <Container >
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid justify="center" item xl={12} lg={12} md={6} sm={12} xs={12}>
                        <h5>New QR Code</h5>
                        <img  src={this.props.imageUrl} alt="img"/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
  </Container>
      );
    }
  }





  
    