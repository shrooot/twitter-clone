import {
    Home,
    Search,
    Twitter,
} from '../../utils/icons';
import styles from "../../stylesheets/Menubar.module.css"
import { useNavigate } from "react-router-dom"
import PostButton from '../PostButton';

const MenuBar: React.FC = () => {
    const navigate = useNavigate()

    const handleTweetClick = () => {
        navigate("/user-tweets")
    }

    const handleExploreClick = () => {
        navigate("/explore")
    }

    const handleHomeClick = () => {
        navigate("/")
    }

    const handlePostClick = () => {
        navigate("/create-tweet")
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Twitter />
            </div>
            <div className={styles.optionsContainer}>
                <div className={styles.option} onClick={() => { handleHomeClick() }}>
                    <div className={styles.icon}>
                        <Home />
                    </div>
                    <span className={styles.optionName}>Home</span>
                </div>
                <div className={styles.option} onClick={() => { handleExploreClick() }}>
                    <div className={styles.icon}>
                        <Search />
                    </div>
                    <span className={styles.optionName}>Explore</span>
                </div>
                <div className={styles.option} onClick={() => { handleTweetClick() }}>
                    <div className={styles.icon}>
                        <Twitter />
                    </div>
                    <span className={styles.optionName}>Your Tweets</span>
                </div>
            </div>
            <div onClick={() => handlePostClick()}>
                <PostButton />
            </div>
        </div>
    );
};

export default MenuBar;
