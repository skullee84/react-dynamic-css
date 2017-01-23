import React from 'react';
import styles from 'css/my.css';

export default class A extends React.Component {
  constructor(props) {
    super(props);
  }

  bindCss = (name) => {
    return styles[name];
  }

  render() {
    console.log(styles);
    return (
      <div>
        <div className={styles.root}>
          A
        </div>

        <div className={this.bindCss('root2')}>
          B
        </div>
      </div>
    );
  }
}
