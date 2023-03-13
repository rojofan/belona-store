import React from 'react';
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";

const Layout = ({children}: { children: React.ReactNode }) => {

    return (
        <div className="layout">
            <Head>
                <title>JS Mastery Store</title>
            </Head>
            <header>
                <Navbar/>
            </header>
            <main className="main-container">{children}</main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default Layout