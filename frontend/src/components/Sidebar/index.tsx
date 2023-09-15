import { useEffect, useState } from "react";
import styles from "../../stylesheets/Sidebar.module.css";
import FollowButton from "../Buttons/FollowButton";
import { IUsersList } from "../../utils/types";
import { GET_ALL_USERS_ENDPOINT } from "../../utils/endpoints";
import axios from "axios";
import { errorToast } from "../../utils/customToast";

const Sidebar: React.FC = () => {
    const [userList, setUserList] = useState<IUsersList[]>([])

    const getUserList = async () => {
        try {
            const response = await axios.get(GET_ALL_USERS_ENDPOINT, { withCredentials: true })
            setUserList(response.data.slice(0, 3))
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
            <div className={styles.suggestionContainer}>
                <h2>Who to follow</h2>
                {
                    userList.map((d, index) => {
                        return (
                            <div className={styles.followContainer} key={index}>
                                <span className={styles.username}>@{d.username}</span>
                                <FollowButton followedId={d._id} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default Sidebar;
