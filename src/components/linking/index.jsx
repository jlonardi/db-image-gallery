import React, { Component } from 'react';
import Button from 'material-ui/Button';
import styles from './styles/index.css';

class Linking extends Component {
    redirect() {
        window.location.replace(`https://www.dropbox.com/oauth2/authorize?client_id=3srhrx0ha8c9go9&response_type=token&redirect_uri=${window.location.origin}`);
    }
    render() {
        return (
            <div>
                <h2 className={styles.title}>
                    Start with linking your Dropbox account
                </h2>
                <Button raised color='primary' onClick={this.redirect}>
                    Connect
                </Button>
            </div>
        );
    }
}

export default Linking;
