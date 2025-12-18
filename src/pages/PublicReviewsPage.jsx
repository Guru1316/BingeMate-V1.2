import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/home.css";
import "../styles/series.css";

const PublicReviews = () => {

    const navigate = useNavigate();
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        let allReviews = [];

        users.forEach(user => {
            const diaryKey = `myDiary_${user.email}`;
            const userDiary = JSON.parse(localStorage.getItem(diaryKey)) || [];

            const userName = user.email.split("@")[0];

            const enrichedReviews = userDiary.map(entry => ({
                ...entry,
                user_name: userName
            }));

            allReviews = [...allReviews, ...enrichedReviews];
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReviews(allReviews);
    }, []);

    return (
        <div className="home">
            <button onClick={() => navigate(-1)} className="back-btn">
                {"<"}---- Back
            </button>

            <h1 className="section-title">Public Reviews</h1>

            {reviews.length > 0 ? (
                <div className="series1">
                    {reviews.map((entry, index) => (
                        <div className="ds" key={index}>
                            <div className="di">
                                <img
                                    onClick={() => navigate(`/series/${entry.seriesId}`)}
                                    src={`${imageBaseUrl}${entry.poster_path}`}
                                    alt={entry.name}
                                    className="dim"
                                />
                            </div>

                            <div className="dc">
                                <h2 className="dhh">{entry.name}</h2>

                                <p className="dpw">
                                    Reviewed by: <strong>{entry.user_name}</strong>
                                </p>

                                <p className="dpw">
                                    Watched on: <strong>{entry.watchedOn}</strong>
                                </p>

                                <p className="dpr">
                                    Rating: <strong>{entry.rating} ⭐</strong>
                                </p>

                                <p className="dpre">
                                    <strong>Review:</strong><br />
                                    {entry.review}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="home empty">
                    <h1>No Public Reviews Yet</h1>
                    <p>Be the first one to log a series 🎬</p>
                </div>
            )}
        </div>
    );
};

export default PublicReviews;
