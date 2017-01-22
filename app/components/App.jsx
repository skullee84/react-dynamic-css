import React from 'react';
import ReactDOM from 'react-dom';
import { Link, hashHistory } from 'react-router';

import classnames from 'classnames';
import styles from 'css/animate.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dominicClass = classnames(styles.animated, styles.infinite, styles.fadeIn);

    return (
      <div>
        <div>
          <Link to="/a">Component A</Link>
          <Link to="/b">Component B</Link>
        </div>

        <div className={dominicClass}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
