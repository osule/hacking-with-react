import React from  'react';
import ajax from 'superagent';

const baseURL = "https://api.github.com/users/";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

    componentWillMount() {
      this.fetchEvent();
    }

    fetchEvent(user) {
       ajax.get(`${baseURL}${this.props.match.params.user}/events`)
      .end((error, response) => {
        if (!error && response) {
          this.setState({ events: response.body });
        } else {
          console.log(`Error fetching events`, error);
        }
      });
    }
    
    renderEvents() {
      return this.state.events.map((event, key)=> {
        return (<p key={key}>{event.created_at} / {event.type} / <strong>{event.repo.name}</strong></p>)
      })
    }

    render() {
      let events = this.renderEvents();
      return (
        <div>
          {events}
        </div>
      );
    }
}

export default User;