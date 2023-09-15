import React, { ReactNode, useEffect } from 'react';
import styles from "../../stylesheets/Layout.module.css"; // Import the CSS file
import Feed from '../Feed';
import Menubar from '../Menubar'
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CHECK_ENDPOINT } from '../../utils/endpoints';

interface GlobalLayoutProps {
    children: ReactNode
}

const Layout = ({ children }: GlobalLayoutProps) => {

    const navigate = useNavigate()

    const checkAuth = async () => {
        try {
            await axios.get(CHECK_ENDPOINT, { withCredentials: true })
        } catch (err: any) {
            navigate("/login")
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Menubar />
                {children}
                <Sidebar />
            </div>
        </div>
    );
};

export default Layout;
