import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css'; // eslint-disable-line

const App = ({ children }) => (
  <div>
    <h1>Unofficial GitHub Browser v0.1</h1>
    {children}
  </div>
);

App.defaultProps = {
  children: [],
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};


export default App;
