import { errorToast, successToast } from "../../../utils/customToast"
import styles from "../../../stylesheets/Button.module.css"
import axios from "axios"
import { FOLLOW_ENDPOINT } from "../../../utils/endpoints"

interface PropsType {
    followedId: string
}

const FollowButton: React.FC<PropsType> = ({ followedId }) => {

    const handleFollowClick = async () => {
        try {
            const data = { followedId: followedId }
            await axios.post(FOLLOW_ENDPOINT, data, { withCredentials: true })
            successToast("Followed user sucessfully", 1000)
        } catch (err) {
            console.log(err)
            errorToast("Error in following user")
        }
    }

    return (
        <button className={styles.followButton} onClick={() => { handleFollowClick() }}>
            Follow
        </button>
    )
}

export default FollowButton