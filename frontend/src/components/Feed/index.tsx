import React, { useEffect, useState } from 'react';
import Tweet from '../Tweet';
import styles from "../../stylesheets/Feed.module.css";


const Feed: React.FC = () => {

  return (
    <div className={styles.container}>
      <div className={styles.tab}>Tweets</div>

      <div className={styles.tweets}>
        <Tweet type='feed' />
      </div>
    </div>
  );
};

export default Feed;