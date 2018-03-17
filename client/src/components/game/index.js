import React, { Component } from 'react';
import GitLogo from 'src/assets/images/github-logo.png';
import 'src/components/index.scss';

export default class Game extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">CHAIN REACTION</div>
        <div className="subheader">Take over all the bot's squares to win!</div>
        <div className="content">
          <div className="spacer" />
          {this.props.children}
        </div>
        <div className="footer">
          <div className="logo">
            <a href="https://github.com/DailyGrind/Chain-Reaction">
              <img src={GitLogo} />
            </a>
          </div>
          <div className="copy">
            &copy; {new Date().getFullYear()} Daily Grind Development
          </div>
        </div>
      </div>
    );
  }
}
