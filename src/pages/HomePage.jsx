import { useOutletContext } from 'react-router-dom';
import '../styles/home.css';
import SeriesCard from '../components/SeriesCard';

const Home = () => {
    const { data } = useOutletContext();
    
    return(
        <div className='home'>
            <section className="hero">
                <h1 className="hero-title">BingeMate</h1>
                <p>Your personal series companion.</p>
                <p>Track what you watch.</p>
                <p>Build your own binge diary.</p>
            </section>
            <h1 className='section-title'>Top Series</h1>
            <div className='series-grid'>
                {data.map((series) => {
                    return(
                        <SeriesCard key={series.id} series={series}></SeriesCard>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;