import { useOutletContext } from 'react-router-dom';
import '../styles/home.css';
import SeriesCard from '../components/SeriesCard';

const Home = () => {
    const { data } = useOutletContext();
    
    return(
        <div className='home'>
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