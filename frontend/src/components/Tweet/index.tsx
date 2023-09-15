import React from 'react';

import data from '../../data.json';

import styles from "../../stylesheets/Tweet.module.css"

interface UserType {
  avatar: string;
  author: string;
  twitteruser: string;
  posttime: string;
  posttext: string;
}

interface PropsType {
  data?: Array<UserType>;
}

const Tweet: React.FC<PropsType> = () => {
  return (
    <>
      {data.map((user, index) => (
        <div className={styles.container} key={index}>
          <div className={styles.body}>
            <div className={styles.content}>
              <div className={styles.header}>
                <strong>{user.author}</strong>
                <span>{user.twitteruser}</span>
                <div className={styles.dot} />
                <time>{user.posttime}</time>
              </div>

              <p className={styles.description}>{user.posttext}</p>

              <div className={styles.imageContent}>
                {user.postimage ? (
                  <img src={user.postimage} alt="Post" />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Tweet;
