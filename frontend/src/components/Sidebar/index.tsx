import styles from "../../stylesheets/Sidebar.module.css";
import FollowButton from "../FollowButton";

let username = "username"

let data = [
    {
        username: "sopmod"
    },
    {
        username: "desidarukavikreta"
    },
    {
        username: "chamanchauhan"
    },
]

const Sidebar: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.suggestionContainer}>
                <h2>Who to follow</h2>
                {
                    data.map((d, index) => {
                        return (
                            <div className={styles.followContainer} key={index}>
                                <span className={styles.username}>@{d.username}</span>
                                <FollowButton />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default Sidebar;
