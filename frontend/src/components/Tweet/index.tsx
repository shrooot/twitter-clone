import React, { useEffect, useState } from 'react';
import styles from "../../stylesheets/Tweet.module.css"
import { TweetData } from '../../utils/types';
import { errorToast, successToast } from '../../utils/customToast';
import axios from 'axios';
import { DELETE_TWEET_ENDPOINT, FEED_ENDPOINT, GET_USER_TWEET_ENDPOINT } from '../../utils/endpoints';

interface PropsType {
  type: "user" | "feed"
}

const Tweet: React.FC<PropsType> = ({ type }) => {
  const [data, setData] = useState<TweetData[]>([])

  const getFeedData = async (type: string) => {
    try {
      if (type === 'user') {
        const response = await axios.get(GET_USER_TWEET_ENDPOINT, { withCredentials: true })
        setData(response.data)
      }
      else {
        const response = await axios.get(FEED_ENDPOINT, { withCredentials: true })
        setData(response.data)
      }
    } catch (err) {
      console.log(err)
      errorToast("Error fetching data")
    }
  }

  const handleOnDelete = async (id: string) => {
    try {
      await axios.delete(DELETE_TWEET_ENDPOINT + `/${id}`, { withCredentials: true })
      successToast("Tweet deleted succesfully", 2000)
      const updatedData = data?.filter((tweet) => tweet._id !== id)
      setData(updatedData)
    } catch (error: any) {
      errorToast(error.message)
    }
  }

  useEffect(() => {
    getFeedData(type)
  }, [])

  return (
    <>
      {data?.map((tweet, index) => {
        const date = new Date(tweet.createdAt)
        return (
          <div className={styles.container} key={index}>
            <div className={styles.body}>
              <div className={styles.content}>
                <div className={styles.header}>
                  <strong>@{tweet.user.username}</strong>
                  <span>{tweet.user.username}</span>
                  <div className={styles.dot} />
                  <time>{date.toDateString()}</time>
                </div>

                <p className={styles.description}>{tweet.text}</p>

                <div className={styles.imageContent}>
                  {tweet.imgUrl ? (
                    <img src={tweet.imgUrl} alt="Post" />
                  ) : (
                    ''
                  )}
                </div>
                {type === 'user' ? (
                  <div className={styles.modifyOptionContainer}>
                    <span className={styles.editOption}>Edit</span>
                    <span className={styles.deleteOption} onClick={() => { handleOnDelete(tweet._id) }}>Delete</span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
};

export default Tweet;
