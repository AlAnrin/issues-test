import React, { Component } from 'react';

const mapStateToProps = store => {
  return {
    issues: []
  };
};

const mapDispatchToProps = dispatch => {
  return {
      setIssuesAction: weather => dispatch(setWeather(weather))
  }
};
class App extends Component {
  constructor(props) {
      super(props);

      this.getIssues();
  }

  getIssues = async () => {
    const api_call = await fetch(`${this.props.baseUrl}?id=${this.props.idCity}&units=metric&appid=${this.props.token}`);

    const response = await api_call.json();

    this.props.setIssuesAction(response);
};

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
