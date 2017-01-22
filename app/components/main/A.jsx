import React from 'react';
import styles from 'css/my.css';

export default class A extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.root}>
        A
      </div>
    );
  }
}
