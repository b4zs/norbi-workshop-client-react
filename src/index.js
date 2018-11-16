import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class ChoiceButton extends React.Component {
  render() {
    return (
        <div className="choiceButton col-md-12" style={{padding: '10px'}}>
          <button onClick={() => this.props.click()} disabled={this.props.disabled} className="btn btn-primary"
                  style={{width: '100%'}}>{this.props.title}</button>
        </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      question: null,
      choices: [],
      loading: false,
      result: null,
    };

    setTimeout(a => this.loadQuestion(), 100);
  }

  loadQuestion() {
    this.setState(a => ({...this.state, loading: true, choices: [], question: null, result: null}));
    setTimeout(() => {
      this.questionLoaded({
        id: 12,
        question: 'What color is it?',
        choices: {a: 'red', b: 'green', c: 'blue', d: 'yellow',}
      })
    }, 1000);
  }

  questionLoaded(data) {
    let stateChoices = [];
    for (let i in data.choices) {
      if (!data.choices.hasOwnProperty(i)) continue;
      stateChoices.push({key: i, value: i, title: data.choices[i], click: () => this.selectChoice(i)});
    }

    this.setState(a => ({...this.state, id: data.id, question: data.question, choices: stateChoices, loading: false}));
  }

  selectChoice(i) {
    console.log('selectChoice', i);
    this.setState(a => ({...this.state, loading: true}));
    setTimeout(a => {
      this.resultLoaded({result: i === 'b'});
    }, 1000);
  }

  resultLoaded(response) {
    this.setState(a => ({...this.state, loading: false, result: response.result ? 'jo valasz' : 'hibas valasz'}));
  }

  reset() {
    this.loadQuestion();
  }

  render() {
    var choicesDisabled = this.state.loading || null !== this.state.result;
    let buttons = this.state.choices.map(item => {
      return (<ChoiceButton key={item.value} value={item.value} title={item.title} click={item.click}
                            disabled={choicesDisabled}/>);
    });

    return (
        <div className="game">
          {this.state.loading && <p style={{float: 'right'}}>loading</p>}
          <h1 className="game-board">
            {this.state.question}
          </h1>
          <div className="row">{buttons}</div>
          {this.state.result && <h2>{this.state.result}</h2>}
          {this.state.result && <button onClick={e => this.reset()} className="btn btn-danger">RESET</button>}
        </div>
    );
  }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);