import React from 'react';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { NavLink } from 'react-router-dom';

const baseURL = 'https://api.github.com/users/';
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentWillMount() {
    this.fetchEvent(this.props.match.params.user);
  }

  fetchEvent(user) {
    ajax.get(`${baseURL}${user}/events`)
    .end((error, response) => {
      if (!error && response) {
        this.setState({ events: response.body });
      } else {
        console.log('Error fetching events', error); // eslint-disable-line no-console
      }
    });
  }

  renderEvents() {
    return this.state.events.map(event => (
      <p key={event.id}>{event.created_at} / {event.type} / <strong>{event.repo.name}</strong></p>
    ));
  }

  render() {
    const events = this.renderEvents();
    return (
      <div>
        <p>You are here: <NavLink to="/" activeClassName="active">Home</NavLink> {'>'} {this.props.match.params.user}</p>
        {events}
      </div>
    );
  }
}

User.defaultProps = {
  match: {
    params: {
      repo: '',
      user: '',
    },
  },
};

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.string,
      user: PropTypes.string,
    }),
  }),
};

export default User;
