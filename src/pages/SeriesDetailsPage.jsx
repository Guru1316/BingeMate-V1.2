import '../styles/series.css'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const Series = () => {
    const { data } = useOutletContext();
    const { seriesId } = useParams();
    const imageBaseUrl = "https://image.tmdb.org/t/p/original";
    const imageBaseUrl1 = "https://image.tmdb.org/t/p/w500";
    const navigate = useNavigate()

    let seriesData = data.find((ele) => {
        return (ele.id === Number(seriesId));
    })

    if(!seriesData)
    {
        return(
            <>
            <h1>Series Not Found</h1>
            </>
        )   
    }

    const checkLogin = (activeUser) => {
        if (!activeUser) {
            alert("Please login first!");
            return false;
        }
        return true;
    };

    const handleLog = () => {
        const activeUser = localStorage.getItem("activeUser");
        if (!checkLogin(activeUser)) return;
        navigate(`/reviews/${seriesData.id}`);
    };

    const addToWatchlist = () => 
    {
        const activeUser = localStorage.getItem("activeUser");
        if (!checkLogin(activeUser)) return;
        const key = `myWatchlist_${activeUser}`;
        const existingWatchlist = JSON.parse(localStorage.getItem(key)) || [];
        const isPresent = existingWatchlist.find(item => item.id === seriesData.id);
        if (isPresent) 
        {
            alert("Already in your Watchlist!");
        } 
        else 
        {
            const newWatchlist = [...existingWatchlist, seriesData];
            localStorage.setItem(key, JSON.stringify(newWatchlist));
            alert("Added to Watchlist!");
        }
    };

    return (
        <div className="series">
            <div className='gridContainer'>
                <div>
                    <button onClick={() => navigate(-1)} className='back-btn'>{"<"}---- Back</button>
                    <img src={`${imageBaseUrl}${seriesData.backdrop_path}`} alt={`${seriesData.name}`} />
                </div>
            </div>

            <div className="content-container">
                <div className="series-card1">
                    <div>
                        <img src={`${imageBaseUrl1}${seriesData.poster_path}`} alt={seriesData.name} />
                    </div>
                </div>

                <div className='series-details'>
                    <h1>{seriesData.name}</h1>
                    <div className="meta-data">
                        <span>Rating: {seriesData.vote_average} ⭐</span>
                        <span> | </span>
                        <span>{seriesData.first_air_date}</span>
                        <span> | </span>
                        <span>{seriesData.original_language.toUpperCase()}</span>
                    </div>

                    <div className="genres-list">
                        {seriesData.genres.map((genre, index) => (
                            <span key={index} className="genre-badge">{genre}</span>
                        ))}
                    </div>

                    <h2>Overview</h2>
                    <p>{seriesData.overview}</p>
                </div>
                <div className="action-buttons">
                    <button onClick={addToWatchlist} className="btn watchlist-btn">+ Watchlist</button>
                    <button className="btn log-btn" onClick={handleLog}>+ Log</button>
                </div>
            </div>
        </div>
    )
}

export default Series;