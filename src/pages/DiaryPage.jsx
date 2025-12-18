import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/home.css';
import '../styles/series.css';
import { useState } from 'react';

const Diary = () => {

    const navigate = useNavigate()

    const activeUser = localStorage.getItem("activeUser");

    const [diary, setDiary] = useState(() => {
        return JSON.parse(localStorage.getItem("myDiary")) || [];
    });

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        if(activeUser){
            const storedDiary = JSON.parse(localStorage.getItem(`myDiary_${activeUser}`)) || [];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDiary(storedDiary);
        }
    }, [activeUser]);

    const clearDiary = () => {
        if(window.confirm("Are you sure you want to clear your diary?")) {
            localStorage.removeItem(`myDiary_${activeUser}`);
            setDiary([]);
        }
    }

    return (
        <div className="home">
            <button onClick={() => navigate(-1)} className="back-btn">{"<"}---- Back</button>
            <div className="title-flex">
                <h1 className="section-title">My Diary</h1>
                {diary.length > 0 && (<button onClick={clearDiary} className='clear-btn'>Clear All</button>)}
            </div>
            {diary.length > 0 ? (
            <div className="series1">
                {diary.map((entry) => (
                    <div className='ds' key={entry.id}>
                        <div className='di'>
                            <img onClick={() => {navigate(`/series/${entry.seriesId}`)}} src={`${imageBaseUrl}${entry.poster_path}`} alt={entry.name} className='dim'/>
                        </div>
                        <div className='dc'>
                            <h2 className='dhh'>{entry.name}</h2>

                            <p className='dpw'>
                                Watched on: <strong>{entry.watchedOn}</strong>
                            </p>

                            <p className='dpr' >
                                Rating: <strong>{entry.rating} ⭐</strong>
                            </p>

                            <p className='dpre'>
                                <strong>Review:</strong><br />
                                {entry.review}
                            </p>
                        </div>
                    </div>
                ))}
            </div>): (
                <div className="home empty">
                <h1>Your Diary is Empty</h1>
                <p>No entries yet. Start logging what you watch</p>
            </div>
            )}
        </div>
    );
};

export default Diary;
