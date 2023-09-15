import { useEffect, useState } from "react"
import styles from "../../stylesheets/Explore.module.css"
import { IUsersList } from "../../utils/types"
import { errorToast } from "../../utils/customToast"
import axios from "axios"
import { GET_FOLLOWING_ENDPOINT } from "../../utils/endpoints"
import UnfollowButton from "../Buttons/UnfollowButton"

const Following = () => {
    const [userList, setUserList] = useState<IUsersList[]>([])

    const getUserList = async () => {
        try {
            const response = await axios.get(GET_FOLLOWING_ENDPOINT, { withCredentials: true })
            setUserList(response.data)
        } catch (err) {
            console.log(err)
            errorToast("Error loading users")
        }
    }
    useEffect(() => {
        getUserList()
    }, [])

    return (
        <div className={styles.container}>
            <h2>People you follow</h2>

            <div className={styles.peopleWrapper}>
                {
                    userList?.map((user) => {
                        return (
                            <div className={styles.followContainer} key={user._id}>
                                <span className={styles.username}>@{user.username}</span>
                                <UnfollowButton followedId={user._id}/>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Following