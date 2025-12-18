import { useState, useEffect } from 'react';
import SeriesCard from '../components/SeriesCard';
import '../styles/home.css'; 
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {

    const navigate = useNavigate();

    const activeUser = localStorage.getItem("activeUser");

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if(activeUser) {
            const storedList = JSON.parse(localStorage.getItem(`myWatchlist_${activeUser}`)) || [];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setWatchlist(storedList);
        }
    }, [activeUser]);

    const clearWatchlist = () => {
        if(window.confirm("Are you sure you want to clear your watchlist?")) {
            localStorage.removeItem(`myWatchlist_${activeUser}`);
            setWatchlist([]);
        }
    }

    return (
        <div className='home'>
            <button onClick={() => navigate(-1)} className="back-btn">{"<"}---- Back</button>
            <div className='title-flex'>
                <h1 className='section-title'>My Watchlist</h1>
                {watchlist.length > 0 && (<button onClick={clearWatchlist} className='clear-btn'>Clear All</button>)}
            </div>
            {watchlist.length > 0 ? (
                <div className='series-grid'>
                    {watchlist.map((series) => (
                        <SeriesCard key={series.id} series={series} />
                    ))}
                </div>
            ) : 
            (
                <div className='empty'>
                    <h2>Your Watchlist is Empty</h2>
                    <p>Go to a series page and click "+ Watchlist" to add items here.</p>
                </div>
            )}
        </div>
    )
}

export default Watchlist;