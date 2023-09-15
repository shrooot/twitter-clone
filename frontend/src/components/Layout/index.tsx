import React, { ReactNode } from 'react';
import styles from "../../stylesheets/Layout.module.css"; // Import the CSS file
import Feed from '../Feed';
import Menubar from '../Menubar'
import Sidebar from '../Sidebar';

interface GlobalLayoutProps {
    children: ReactNode
}

const Layout = ({ children }: GlobalLayoutProps) => {
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
