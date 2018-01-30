import React from 'react';

import replace from './main';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 'uuidv1',
      pattern: 'uuid',
      patternError: '',
      replacementError: '',
    };
  }

  handleOptionChange = event => {
    this.setState({option: event.target.value});
  };

  handlePatternChange = event => {
    this.setState({pattern: event.target.value});
  };

  handleReplace = () => {
    this.setState({patternError: '', replacementError: ''}, () => {
      if (this.state.pattern === 'custom' && !this.customPattern.value) {
        this.setState({patternError: 'Pattern is mandatory'});
        return;
      }
      if (this.state.option === 'custom' && !this.customReplacement.value) {
        this.setState({replacementError: 'Replacement text is mandatory'});
        return;
      }
      this.outputText.value = '';
      this.outputText.value = replace(
        this.sourceText.value,
        this.state.pattern === 'custom'
          ? this.customPattern.value
          : this.state.pattern,
        this.state.option === 'custom'
          ? this.customReplacement.value
          : this.state.option,
      );
    });
  };

  render() {
    return (
      <div className="row component-app h-100 pt-2 pb-2">
        <div className="col-sm">
          <div className="border border-primary rounded bg-white h-100">
            <form className="h-100">
              <div className="form-group h-100">
                <textarea
                  className="code form-control h-100"
                  ref={text => (this.sourceText = text)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="border border-primary rounded h-100">
            <div className="align-middle">
              <form>
                <div className="form-group">
                  <label
                    htmlFor="replaceOption"
                    className="text-white text-uppercase font-weight-bold">
                    Pattern
                  </label>
                  <select
                    value={this.state.pattern}
                    className="form-control"
                    id="pattern"
                    onChange={this.handlePatternChange}>
                    <option value={'uuid'}>UUID</option>
                    <option value={'custom'}>Custom</option>
                  </select>
                </div>
                {this.state.pattern === 'custom' && (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Custom pattern"
                      id="customPattern"
                      ref={input => (this.customPattern = input)}
                    />
                    {this.state.patternError.length > 0 && (
                      <div className="alert alert-danger p-1 mt-1" role="alert">
                        {this.state.patternError}
                      </div>
                    )}
                  </div>
                )}
                <div className="form-group">
                  <label
                    htmlFor="replaceOption"
                    className="text-white text-uppercase font-weight-bold">
                    Replace with
                  </label>
                  <select
                    value={this.state.value}
                    className="form-control"
                    id="replaceOption"
                    onChange={this.handleOptionChange}>
                    <option value={'uuidv1'}>UUID (V1)</option>
                    <option value={'uuidv4'}>UUID (V4)</option>
                    <option value={'custom'}>Custom text</option>
                  </select>
                </div>
                {this.state.option === 'custom' && (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Replacement text"
                      id="customReplacement"
                      ref={input => (this.customReplacement = input)}
                    />
                    {this.state.replacementError.length > 0 && (
                      <div className="alert alert-danger p-1 mt-1" role="alert">
                        {this.state.replacementError}
                      </div>
                    )}
                  </div>
                )}
              </form>
              <button
                onClick={this.handleReplace}
                type="button"
                id="replaceButton"
                className="btn btn-outline-light btn-lg btn-block">
                Replace
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="border border-primary rounded bg-white h-100">
            <form className="h-100">
              <div className="form-group h-100">
                <textarea
                  className="code form-control h-100"
                  id="outputText"
                  ref={text => (this.outputText = text)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
