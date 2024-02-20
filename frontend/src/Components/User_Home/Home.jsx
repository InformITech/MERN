import React from 'react';
import './assets/css/main.css'
import { useSelector } from 'react-redux'


const Home = () => {
    const userDetails = useSelector(state => state.reducer.userDetails);
    return (
        <body>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand d-md-none d-xs-block py-3" href="/">
                        <img src="/images/logo.jpeg" height="40" alt="Company Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link mx-2 active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" aria-current="page" href='/profile'>Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" href="/">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2 px-3 btn rounded-0 btn-danger" id="profileBtn" href='/logout'>Log out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="wrapper">
                <header id="header">
                    <span className="avatar">
                        <img src={userDetails.image ? userDetails.image : "https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png"} alt="" width="173" height="178" />
                    </span>
                    <h1>
                        <strong>Welcome {userDetails.name}</strong>
                    </h1>
                </header>
                <section id="main">
                    <section className="thumbnails">
                        <div>
                        </div>
                    </section>
                </section>
            </div>
            <script src="./assets/js/jquery.min.js"></script>
            <script src="./assets/js/jquery.poptrox.min.js"></script>
            <script src="./assets/js/skel.min.js"></script>
            <script src="./assets/js/main.js"></script>
        </body>
    );
};

export default Home;
