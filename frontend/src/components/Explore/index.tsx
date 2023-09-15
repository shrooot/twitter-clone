import styles from "../../stylesheets/Explore.module.css"
import FollowButton from "../FollowButton"

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


const Explore = () => {
    return (
        <div className={styles.container}>
            <h2>People you may find interesting</h2>

            <div className={styles.peopleWrapper}>
            {
                    data.map((d) => {
                        return (
                            <div className={styles.followContainer}>
                                <span className={styles.username}>@{d.username}</span>
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