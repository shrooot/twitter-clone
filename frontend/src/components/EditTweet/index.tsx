import { useEffect, useState } from "react"
import styles from "../../stylesheets/CreateTweet.module.css"
import { errorToast, successToast } from "../../utils/customToast"
import axios from "axios"
import { TWEETBYID_ENDPOINT, UPDATE_TWEET_ENDPOINT, USERINFO_ENDPOINT } from "../../utils/endpoints"
import { IUpdateTweet } from "../../utils/types"
import { useNavigate, useParams } from "react-router-dom"

const EditTweet = () => {
    const { tweetId } = useParams()
    const navigate = useNavigate()

    const [text, setText] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [username, setUsername] = useState("")

    const getUserInfo = async () => {
        try {
            const response = await axios.get(USERINFO_ENDPOINT, { withCredentials: true })
            setUsername(response.data.username)
        } catch (error) {
            errorToast("Error loading user info")
        }
    }

    const getTweetInfo = async () => {
        try {
            const response = await axios.get(TWEETBYID_ENDPOINT + `/${tweetId}`, { withCredentials: true })
            setText(response.data.text)
            setImgUrl(response.data.imgUrl)
        } catch (error) {
            errorToast("Error loading tweet")
        }
    }

    useEffect(() => {
        getUserInfo()
        getTweetInfo()
    }, )

    const handleTweetClick = async () => {
        try {
            if (text === "")
                throw new Error("Please add text to your tweet")
            else {
                if (!tweetId) {
                    throw new Error("Tweet Id Not Found")
                }
                const data: IUpdateTweet = { text, imgUrl, tweetId }
                await axios.put(UPDATE_TWEET_ENDPOINT, data, { withCredentials: true })
                successToast("Tweet edited succesfully", 5000)
                setText("")
                setImgUrl("")
                navigate("/user-tweets")
            }
        } catch (error: any) {
            errorToast(error.message)
        }
    }

    return (
        <div className={styles.container}>
            <h2>Post Tweet</h2>
            <div className={styles.createTweetWrapper}>
                <span className={styles.username}>@{username}</span>
                <textarea name="tweet" id="tweet" cols={30} rows={10} value={text ? text : ""} onChange={(e) => { setText(e.target.value) }} className={styles.tweetArea} />
                <label htmlFor="url" style={{ marginBottom: "10px" }}>Image</label>
                <textarea name="url" id="url" cols={30} rows={5} value={imgUrl ? imgUrl : ""} onChange={(e) => { setImgUrl(e.target.value) }} className={styles.tweetArea} />

                <button className={styles.tweetButton} onClick={() => { handleTweetClick() }}>
                    Edit Tweet
                </button>

            </div>
        </div>
    )
}

export default EditTweet