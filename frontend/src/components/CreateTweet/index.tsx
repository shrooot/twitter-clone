import styles from "../../stylesheets/CreateTweet.module.css"

const username = "sopmod"

const CreateTweet = () => {
    return (
        <div className={styles.container}>
            <h2>Post Tweet</h2>

            <div className={styles.createTweetWrapper}>
            <span className={styles.username}>@{username}</span>
            <textarea name="tweet" id="tweet" placeholder="What is happening!?" cols={30} rows={10} className={styles.tweetArea}></textarea>
            </div>
        </div>
    )
}

export default CreateTweet