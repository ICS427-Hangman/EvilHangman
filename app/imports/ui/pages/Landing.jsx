import React from 'react';
import { Grid, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const linkStyle = { color: 'black', textDecoration: 'none' };
    return (
      <Grid>
        <Grid style={{ marginTop: '30px', marginBottom: '30px' }} id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Row style={{ marginTop: '30px' }}>
            <Grid.Column width={4}>
              <Image src="/images/hangman.png"/>
            </Grid.Column>

            <Grid.Column width={8}>
              <h1>Welcome to Hangman</h1>
              <p>Now let enjoy this game!</p>
              <button className="massive ui inverted red button">
                <i className="heart icon"/>
                <Link style={linkStyle} to="/hangman">Start</Link>
              </button>
            </Grid.Column>
          </Grid.Row>

        </Grid>
        <Grid style={{ marginTop: '40px' }} id='landing-page' verticalAlign='middle' container>
          <Grid.Column>
            <h1>Instruction: </h1>
            <p style={ { fontSize: '30px' } } >
              1. Enter the number of characters in word<br/>
              2. Enter the number of guesses allowed<br/>
              3. Press <Label>Start Game</Label> to play <br/>
            </p>
          </Grid.Column>

        </Grid>
      </Grid>
    );
  }
}

export default Landing;
