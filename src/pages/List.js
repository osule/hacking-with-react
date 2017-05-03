import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const List = () => (
  <div>
    <p>You are here: <NavLink to="/" activeClassName="active">Home</NavLink></p>
    <p>This is the list page.</p>
    <ul>
      <li><Link to="/detail/react">React</Link></li>
      <li><Link to="/detail/react-native">React Native</Link></li>
      <li><Link to="/detail/jest">Jest</Link></li>
    </ul>
  </div>
);


export default List;
