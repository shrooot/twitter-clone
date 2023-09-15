import React from 'react';

import Tweet from '../Tweet';

import styles from "../../stylesheets/Feed.module.css";

const Feed: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tab}>Tweets</div>

      <div className={styles.tweets}>
        <Tweet />
      </div>
    </div>
  );
};

export default Feed;