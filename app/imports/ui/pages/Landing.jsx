import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid>
        <Grid style={{ marginTop: '30px', marginBottom: '30px' }} id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Row style={{ marginTop: '30px' }}>
            <Grid.Column width={4}>
              <Image src="/images/hangman.png"/>
            </Grid.Column>

            <Grid.Column width={8}>
              <h1>Welcome to Hangman</h1>
              <p>Now get to work and modify this app!</p>
            </Grid.Column>
          </Grid.Row>

        </Grid>
        <Grid style={{ marginTop: '40px' }} id='landing-page' verticalAlign='middle' container>
          <Grid.Column>
            <h1>Welcome to Hangman</h1>
            <p style={{fontSize: '30px'}} >
              1. <br/>
              2. <br/>
            </p>
          </Grid.Column>

        </Grid>
      </Grid>
    );
  }
}

export default Landing;
