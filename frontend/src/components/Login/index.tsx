import { useState } from "react";
import styles from "../../stylesheets/Login.module.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { LOGIN_ENDPOINT } from "../../utils/endpoints";
import { errorToast, successToast } from "../../utils/customToast";

export interface LoginSubmit {
    username: string,
    password: string
}

const Login = () => {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === undefined || password === undefined) throw new Error("Invalid Username or Password")
        const data: LoginSubmit = { username, password }
        try {
            const res = await axios.post(LOGIN_ENDPOINT, data,
                {
                    withCredentials: true
                })
            if (res.status === 200) {
                successToast("Signing You In", 1000)
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }
        } catch (error: any) {
            if (error.response) {
                let res = error.response
                if (res.status === 400 && res.data.Error === "Incorrect password") {
                    errorToast("Incorrect Password")
                }
                else if (res.status === 400 && res.data.Error === "User not found") {
                    errorToast("User with given username does not exist")
                }
                else {
                    errorToast("Internal Server Error. Please wait while we work on fixing this issue")
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.login_box}>
                <div className={styles.login_text}>
                    Login
                </div>
                <form onSubmit={async (e) => handleSubmit(e)} className={styles.form_container}>
                    <input type="text" placeholder="username" name="username" value={username ? username : ""} className={styles.input_field} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" name="password" value={password ? password : ""} className={styles.input_field} onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.btn_container}>
                        <button type="submit" className={styles.signin_button} >Login</button>
                    </div>
                </form>
                <div className={styles.signup_redirect_wrapper}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;