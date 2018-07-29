import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import './App.css';

class App extends Component {
				constructor(props){
								super(props);
								this.state = {
												value: '#pin',
												copied: false,
												word: "pin",
												open: false
								}
				}

				componentWillMount(){
								let wordList = [
												"pin", "ping", "pink", "pint",
												"pine", "pinot", "pinch", "pingo", "pinkie",
												"pinion", "pinata", "pinyin", "pincer",
												"pinball", "pinhead", "pinpoint", "pinnacle",
												"pinewood", "pine tree", "pinwheel", "pinecone",
												"pineapple", "pinstripe", "pinocytosis", "pincushion",
												"pinto bean", "pinky finger", "pinocchio", "pinot noir",
												"ping pong", "pinterest", "pink floyd", "pina colada",
												"pink panther", "pint-sized", "pinch me", "pins and needles",
												"pinhead larry", "pinch hitter", "pinch penny", "pineapple upside down cake"
								];

								document.addEventListener('keydown', (evt)=>{
												const keyCode = evt.keyCode;
												console.log(wordList.length);
												if(keyCode === 32){
																let wordIndex = Math.floor(Math.random() * wordList.length);
																this.setState({
																				word: wordList[wordIndex],
																				value: "#" + wordList[wordIndex],
																				copied: false
																});
												}
								})
				}

				handleClose = (event, reason) => {
								if (reason === 'clickaway') {
												return;
								}

								this.setState({copied: false});
				};

				render(){
								document.title = "#" + this.state.word + " | Piazza Pin";
								return (
												<div className="App" style={{backgroundColor: "#625fff"}}>
																<Paper style={{
																				position: "fixed",
																				width: "50%", minHeight: "50vh",
																				backgroundColor: "#23272f",
																				display: "flex",
																				flexDirection: "column",
																				alignItems: "center",
																				justifyContent: "center"
																}} className={"container"}>
																				<CopyToClipboard text={this.state.value}
																																					onCopy={() => this.setState({copied: true})}>
																				<Typography style={{
																								borderBottom: "3px dashed",
																								cursor: "pointer",
																								color: "#ffffff"
																				}} variant="display3" component="h3">
																								#{this.state.word}
																				</Typography>
																				</CopyToClipboard>
																				<Typography style={{
																								position: "absolute",
																								bottom: 10,
																								color: "#c4c4c4"}} variant="caption">
																								Click the word to copy it to your clipboard <br/> -or- <br/> Press SPACE to generate again
																				</Typography>

																				<Snackbar
																								anchorOrigin={{vertical:'bottom', horizontal:'left'}}
																								open={this.state.copied}
																								autoHideDuration={6000}
																								onClose={this.handleClose}
																								ContentProps={{
																												'aria-describedby': 'message-id',
																								}}
																								message={<span id="message-id">Copied to clipboard</span>}
																				/>
																</Paper>
																<Typography style={{
																				position: "absolute",
																				bottom: 10,
																				right: 10,
																				color: "#ffffff"
																}}>
																				Made With &lt;3 by&nbsp;
																				<a style={{color: "#fff"}} href={"https://github.com/AaronCGoidel/hashtagpin"} target="_blank">
																								Aaron Goidel
																</a>
																</Typography>
												</div>
								);
				}
}

export default App;
