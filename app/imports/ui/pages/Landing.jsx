import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingStyle = {
      backgroundImage: 'url(images/background.png)',
      backgroundSize: '100% auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    };
    const linkStyle = { color: 'black', textDecoration: 'none' };
    return (
      <Grid style={landingStyle} verticalAlign='middle' textAlign='center' container>
        <button className="massive ui inverted red button">
          <i className="heart icon"/>
          <Link style={linkStyle} to="/hangman">Start</Link>
        </button>
      </Grid>
    );
  }
}

export default Landing;
