import React from 'react';
import styles from './styles.css'; // eslint-disable-line

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Unofficial GitHub Browser v0.1</h1>
        {this.props.children}
      </div>
    );
  }
}


export default App;