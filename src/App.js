import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import {words, memes} from './Lists.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '#pin',
      copied: false,
      word: 'pin',
      open: false,
      masha: false,
      mtoast: false
    };
  }

  shuffle(){
    let wordList = words;
    if(this.state.masha){
      wordList = memes;
    }
    let wordIndex = Math.floor(Math.random() * wordList.length);
    this.setState({
      word: wordList[wordIndex],
      value: '#' + wordList[wordIndex],
      copied: false,
    });
  }

  componentWillMount() {
    console.log(words);

    document.addEventListener('keydown', (evt) => {
      const keyCode = evt.keyCode;
      if (keyCode === 32) {
        this.shuffle();
      }else if(keyCode === 77){
        this.setState({masha: !this.state.masha, mashatoast: true});
        this.shuffle();
      }
    });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({copied: false});
  };

  handleCloseM = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({mashatoast: false});
  };

  render() {
    document.title = '#' + this.state.word + ' | Piazza Pin';
    return (
        <div className="App" style={{backgroundColor: '#625fff'}}>
          <Paper style={{
            position: 'fixed',
            width: '50%', minHeight: '50vh',
            backgroundColor: '#23272f',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }} className={'container'}>
            <CopyToClipboard text={this.state.value}
                             onCopy={() => this.setState({copied: true})}>
              <Typography style={{
                borderBottom: '3px dashed',
                cursor: 'pointer',
                color: '#ffffff',
              }} variant={this.state.word.length > 20 ? "body1" :"display3"} component="h3">
                {!this.state.masha ? "#" : null}{this.state.word}
              </Typography>
            </CopyToClipboard>
            <Typography style={{
              position: 'absolute',
              bottom: 10,
              color: '#c4c4c4',
            }} variant="caption">
              Click the word to copy it to your clipboard <br/> -or- <br/> Press
              SPACE to generate again
            </Typography>

            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.copied}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Copied to clipboard</span>}
            />

            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.mashatoast}
                autoHideDuration={4000}
                onClose={this.handleCloseM}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Toggled Masha mode
                  {this.state.masha ? " on" : " off"}</span>}
            />
          </Paper>
          <Typography style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            color: '#ffffff',
          }}>
            Made With &lt;3 by&nbsp;
            <a style={{color: '#fff'}}
               href={'https://github.com/AaronCGoidel/hashtagpin'}
               target="_blank">
              Aaron Goidel
            </a>
          </Typography>
        </div>
    );
  }
}

export default App;
