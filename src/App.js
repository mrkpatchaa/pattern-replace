import React from 'react';

import replace from './main';

import './App.scss';

const defaultPattern =
  '[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 'uuidv1',
      patternError: '',
      replacementError: '',
    };
  }

  handleOptionChange = event => {
    this.setState({option: event.target.value});
  };

  handleReplace = () => {
    this.setState({patternError: '', replacementError: ''}, () => {
      if (!this.pattern.value) {
        this.setState({patternError: 'Pattern is mandatory'});
        return;
      }
      if (this.state.option === 'text' && !this.replacementText.value) {
        this.setState({replacementError: 'Replacement text is mandatory'});
        return;
      }
      this.outputText.value = '';
      this.outputText.value = replace(
        this.sourceText.value,
        this.pattern.value,
        this.state.option.startsWith('uuid')
          ? this.state.option
          : this.replacementText.value,
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
                    htmlFor="pattern"
                    className="text-white text-uppercase font-weight-bold">
                    Pattern
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="[a-z0-9]{9}"
                    id="pattern"
                    defaultValue={defaultPattern}
                    ref={input => (this.pattern = input)}
                  />
                  {this.state.patternError.length > 0 && (
                    <div className="alert alert-danger p-1 mt-1" role="alert">
                      {this.state.patternError}
                    </div>
                  )}
                </div>
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
                    <option value={'text'}>Custom text</option>
                  </select>
                </div>
                {this.state.option === 'text' && (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Replacement text"
                      ref={input => (this.replacementText = input)}
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
