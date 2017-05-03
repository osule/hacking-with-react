import React from 'react';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Link, NavLink } from 'react-router-dom';

const baseURL = 'https://api.github.com/repos/facebook';
class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = { commits: [], pulls: [], forks: [], mode: 'commits' };
  }

  componentWillMount() {
    this.selectMode.bind(this);
    this.fetchFeed('commits');
    this.fetchFeed('forks');
    this.fetchFeed('pulls');
  }

  fetchFeed(type) {
    if (this.props.match.params.repo === '') return; // empty repo name, bail out!

    ajax.get(`${baseURL}/${this.props.match.params.repo}/${type}`)
      .end((error, response) => {
        if (!error && response) {
          this.saveFeed(type, response.body);
        } else {
          console.log(`Error fetching ${type}`, error); // eslint-disable-line no-console
        }
      });
  }

  saveFeed(type, contents) {
    this.setState({ [type]: contents });
  }

  selectMode(mode) {
    return (mode) => {
      this.setState({ mode });
    };
  }

  renderCommits() {
    return this.state.commits.map((commit) => {
      const author = commit.author ? commit.author.login : 'Anonymous';
      return (<p key={author.id} className="github">
        <Link to={`/user/${author}`}><strong>{author}</strong></Link>:
          <a href={commit.html_url}>{commit.commit.message}</a>.
      </p>);
    });
  }

  renderForks() {
    return this.state.forks.map((fork) => {
      const owner = fork.owner ? fork.owner.login : 'Anonymous';
      return (<p key={owner.id} className="github">
        <Link to={`/user/${owner}`}><strong>{owner}</strong></Link>: forked to
          <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
      </p>);
    });
  }

  renderPulls() {
    return this.state.pulls.map((pull) => {
      const user = pull.user ? pull.user.login : 'Anonymous';
      return (<p key={user.id} className="github">
        <Link to={`/user/${user}`}><strong>{user}</strong></Link>:
          <a href={pull.html_url}>{pull.body}</a>.
        </p>);
    });
  }


  render() {
    let content;
    if (this.state.mode === 'commits') {
      content = this.renderCommits();
    } else if (this.state.mode === 'forks') {
      content = this.renderForks();
    } else {
      content = this.renderPulls();
    }
    return (<div>
      <p>You are here: <NavLink to="/" activeClassName="active">Home</NavLink> {'>'} {this.props.match.params.repo}</p>
      <button onClick={this.selectMode('commits')} ref={() => 'commits'}> Show Commits</button>

      <button onClick={this.selectMode('forks')} ref={() => 'forks'}>Show Forks</button>

      <button onClick={this.selectMode('pulls')} ref={() => 'pulls'}>Show Pulls</button>
      {content}
    </div>);
  }
}

Detail.defaultProps = {
  match: {
    params: {
      repo: '',
    },
  },
};

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.string,
    }),
  }),
};

export default Detail;
