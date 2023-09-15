import { useState } from "react";
import styles from "../../stylesheets/Signup.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_ENDPOINT } from "../../utils/endpoints";
import { errorToast, successToast } from "../../utils/customToast";

export interface ICreateUser {
    username: string,
    password: string
}

const Signup = () => {
    const [username, setusername] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()


    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!username || !password) throw new Error("Please fill the form correctly")
            if (password.length < 8) throw new Error("Password should be atleast 8 characters long")

            const userData: ICreateUser = { username: username, password: password }

            const res = await axios.post(SIGNUP_ENDPOINT, userData)

            if (res.status === 200) successToast("Sign up successful!", 5000)
            navigate("/login")

        } catch (error: any) {
            console.log(error.response)
            errorToast(error.response.data)
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_box}>
                <div className={styles.signup_text}>
                    Sign Up
                </div>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input type="username" placeholder="Username" name="username" value={username ? username : ""} className={styles.input_field} onChange={(e) => setusername(e.target.value)} required />
                    <input type="password" placeholder="Password" name="password" value={password ? password : ""} className={styles.input_field} onChange={(e) => setPassword(e.target.value)} required />
                    <div className={styles.btn_container}>
                        <button type="submit" className={styles.signup_button}>Sign Up</button>
                    </div>
                </form>
                <div className={styles.signin_redirect_wrapper}>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
};

export default Signup;