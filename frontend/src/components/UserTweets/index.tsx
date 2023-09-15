import React, { useEffect, useState } from 'react';

import Tweet from '../Tweet';

import styles from "../../stylesheets/Feed.module.css";

const UserTweets: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tab}>Your Tweets</div>
      <div className={styles.tweets}>
        <Tweet type='user' />
      </div>
    </div>
  );
};

export default UserTweets;