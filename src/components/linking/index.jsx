import React, { Component } from 'react';
import Button from 'material-ui/Button';
import styles from './styles/index.css';

class Linking extends Component {
    redirect() {
        // when Ddopbox redirects the user back to this app the next flag will
        // work as a hint that a JWT-token should be read from the url
        localStorage.setItem('application_linking', true);

        window.location.replace(`https://www.dropbox.com/oauth2/authorize?client_id=3srhrx0ha8c9go9&response_type=token&redirect_uri=${window.location.origin}`);
    }
    render() {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Start with linking your Dropbox account
                </h2>
                <Button raised onClick={this.redirect}>
                    Connect
                </Button>
            </div>
        );
    }
}

export default Linking;
