import '../styles/series.css';
import '../styles/seriesForm.css';
import { useState, } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const Reviews = () => {
    const { data } = useOutletContext();
    const { seriesId } = useParams();
    const navigate = useNavigate();

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    let seriesData = data.find((ele) => {
        return (ele.id === Number(seriesId));
    })

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);
    const [watchDate, setWatchDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    if (!seriesData) {
        return <h1>Loading...</h1>;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const activeUser = localStorage.getItem("activeUser");
        const diaryEntry = {
            id: Date.now(),
            seriesId: seriesData.id,
            name: seriesData.name,
            poster_path: seriesData.poster_path,
            first_air_date: seriesData.first_air_date,
            rating,
            review,
            watchedOn: watchDate
        };

        const existingDiary = JSON.parse(localStorage.getItem(`myDiary_${activeUser}`)) || [];
        localStorage.setItem(`myDiary_${activeUser}`,JSON.stringify([diaryEntry, ...existingDiary]));
        alert("Logged to Diary successfully!");
        navigate("/diary");
    };

    return (
        <div className="series">
            <button onClick={() => navigate(-1)} className="back-btn">{"<"}---- Back</button>
            <div className="content-container">
                <div className="series-card1">
                    <div>
                        <img src={`${imageBaseUrl}${seriesData.poster_path}`} alt={seriesData.name}/>
                        </div>
                        <h3 style={{textAlign:"center"}}>{seriesData.name}</h3>
                    </div>
                <div className="series-details">
                    <div className="forms">
                        <h1 className="title">I Watched…</h1>
                        <form onSubmit={handleSubmit}>
                            <label>Date Watched</label>
                            <input type="date" value={watchDate} onChange={(e) => setWatchDate(e.target.value)} required/>
                            <label>Rating (1–5)</label>
                            <input type="number" min="1" max="5" step="0.5" value={rating} onChange={(e) => setRating(e.target.value)} required/>
                            <label>Review</label>
                            <textarea rows={4} placeholder="Write your review..." value={review} onChange={(e) => setReview(e.target.value)} required></textarea>
                            <button className="submitButton" type="submit">Save to Diary</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Reviews;