import thumbs from './thumbs.png';
import thumbDown from './thumbDown.png';
import React, {Component} from "react";
import {googleTranslate} from "./utils/googleTranslate";
import './myStyles.css';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={isToggleOn: true, redirect: false};
    this.handleClick = this.handleClick.bind(this);
  

  this.state = {
    languageCodes: [],
    language: "en",
      userIn: '',
      transText: '',
      temp: ''
  };
  }
  componentDidMount() {
    // load all of the language options from Google Translate to your app state

    googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
      getLanguageCodes(languageCodes); // use a callback function to setState
    });

    const getLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };
  }

  handleEClick(){
    window.location.assign('http://www.google.com');
  }


  render() {
    const { languageCodes, language, userIn, transText} = this.state;

    return (

        <div>
            <div className="gatorTitle"> GatorComm App</div>
            <div className="inputTitle">Translation Input</div>
            <div className="outputTitle">Translation Output</div>
        <div className="boxFormat">
          <input
            className="inBox"
            type="text"
            placeholder="Input text to translate here..."
            value={this.state.value}
            onChange={(e) => this.handleChange(e,'userIn')}>
          </input>
          </div>
          
        <div className="selFormat">
        {/* iterate through language options to create a select box */}
        <select
          className="select-language"
          value={language}
          onChange={e => this.changeHandler(e.target.value)}
        >
          {languageCodes.map(lang => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
        </div>

        <div className="transBFormat">
        <button
          className="tButSize"
          onClick={() => this.handleClick()}>
            Translate!
        </button>
        </div>
        <p className="transFormat">
        {transText}
        </p>
        <div className="thumbUpButton">
        <button>
            <img src={thumbs} alt="thumbs"/>
        </button>
        </div>

        <div className="thumbDownButton">
        <button>
            <img src={thumbDown} alt="thumbDown"/>
        </button>
        </div>
        <div className="redirButton">
        <button onClick={this.handleEClick.bind(this)}>Stop Translating and Evaluate Page</button>
        </div>
      </div>

    );
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    })
  }


  handleClick() {
    if(this.state.transText != this.state.userIn){
      this.setState(state => ({
        isToggleOn: !state.isToggleOn,
        transText: this.state.userIn
      }));
    }

    
  }

  changeHandler = language => {
    let { userIn } = this.state;
    let transQuestion = "";

      const translating = transQuestion => {
          this.setState({ userIn: transQuestion});
      
    };


      googleTranslate.translate(userIn, language, function(err, translation) {
        transQuestion = translation.translatedText;
        translating(transQuestion);
      });
    

    this.setState(state => ({ language,
      transText: transQuestion}));
  };
}




export default App;
