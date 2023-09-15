import { errorToast, successToast } from "../../../utils/customToast"
import styles from "../../../stylesheets/Button.module.css"
import axios from "axios"
import { UNFOLLOW_ENDPOINT } from "../../../utils/endpoints"

interface PropsType {
    followedId: string
}

const UnfollowButton: React.FC<PropsType> = ({ followedId }) => {

    const handleFollowClick = async () => {
        try {
            const data = { followedId: followedId }
            await axios.post(UNFOLLOW_ENDPOINT, data, { withCredentials: true })
            successToast("Unfollowed user sucessfully", 1000)
        } catch (err) {
            console.log(err)
            errorToast("Error in following user")
        }
    }

    return (
        <button className={styles.followButton} style={{width:"100px"}} onClick={() => { handleFollowClick() }}>
            Unfollow
        </button>
    )
}

export default UnfollowButton