import { useEffect, useState } from "react"
import styles from "../../stylesheets/Explore.module.css"
import FollowButton from "../FollowButton"
import { IUsersList } from "../../utils/types"
import { errorToast } from "../../utils/customToast"
import axios from "axios"
import { GET_ALL_USERS_ENDPOINT } from "../../utils/endpoints"

const Explore = () => {
    const [userList, setUserList] = useState<IUsersList[]>([])

    const getUserList = async () => {
        try {
            const response = await axios.get(GET_ALL_USERS_ENDPOINT, { withCredentials: true })
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
            <h2>People you may find interesting</h2>

            <div className={styles.peopleWrapper}>
                {
                    userList?.map((user) => {
                        return (
                            <div className={styles.followContainer}>
                                <span className={styles.username}>@{user.username}</span>
                                <FollowButton />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Explore