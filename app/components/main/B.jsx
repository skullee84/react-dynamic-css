import React from 'react';
import styles from 'css/my.css';

export default class B extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.root2}>
        B
      </div>
    );
  }
}
