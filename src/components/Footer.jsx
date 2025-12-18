import '../styles/home.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">

                <h2 className="footer-title">BingeMate</h2>

                <p className="footer-text">
                    Personal Series Tracker & Review App
                </p>

                <div className="footer-contact">
                    <p>📧 guruprasadgdr1@gmail.com</p>
                    <p>🔗 github.com/Guru1316</p>
                    <p>🔗 linkedin.com/in/guruprasad-k-713994314</p>
                </div>

                <p className="footer-copy">
                    © {new Date().getFullYear()} BingeMate • Built during MERN Internship
                </p>

            </div>
        </footer>
    );
};

export default Footer;