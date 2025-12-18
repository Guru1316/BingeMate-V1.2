import { useNavigate, useOutletContext } from 'react-router-dom';
import '../styles/seriesForm.css';
import { useForm } from 'react-hook-form';

const SeriesForm = () => {
    const { data, setData } = useOutletContext();
    const navigate = useNavigate();
    const activeUser = localStorage.getItem("activeUser");
    const { register, handleSubmit } = useForm({
        defaultValues : {
            "name": "Stranger Things",
            "poster_path": "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
            "backdrop_path": "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
            "vote_average": 8.6,
            "vote_count": 16161,
            "popularity": 185.5,
            "first_air_date": "2016-07-15",
            "original_language": "en",
            "original_name": "Stranger Things",
            "origin_country": "US, GB",
            "genres": "Sci-Fi & Fantasy, Mystery, Drama",
            "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl."
        },}
    );
    const onSubmitHandler = (fdata) => {
        // eslint-disable-next-line react-hooks/purity
        fdata.id = Date.now();
        fdata.origin_country = fdata.origin_country.split(",").map((e) => e.trim());
        fdata.genres = fdata.genres.split(",").map((e) => e.trim());
        const updatedList = [...data, fdata];
        setData(updatedList);
        localStorage.setItem(`mySeriesData_${activeUser}`, JSON.stringify(updatedList));
        console.log(fdata);
        alert("Series Added Successfully");
        navigate("/home");
    }

    return (
        <div className="forms">
            <button onClick={() => navigate(-1)} className="back-btn">{"<"}---- Back</button>
            <h1 className='title'>Add Series</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <label>Name</label>
                <input {...register("name")} type="text" placeholder="Enter Series Name" required></input>
                <label>Poster-Path</label>
                <input {...register("poster_path")} type="text" placeholder="Enter Poster Image URL" required></input>
                <label>Backdrop-Path</label>
                <input {...register("backdrop_path")} type="text" placeholder="Enter BackDrop Image URL" required></input>
                <label>Ratings</label>
                <input {...register("vote_average")} type="number" placeholder="Enter Ratings" step="0.01" required></input>
                <label>No Of People Rated</label>
                <input {...register("vote_count")} type="number" placeholder="Enter No Of Rated People" required></input>
                <label>Popularity</label>
                <input {...register("popularity")} type="number" placeholder="Enter Popularity" step="0.01" required></input>
                <label>First-Air-Date</label>
                <input {...register("first_air_date")} type="date" placeholder="Enter Release Date (YYYY-MM-DD)" required></input>
                <label>Original Language</label>
                <input {...register("original_language")} type="text" placeholder="Enter Original Language" required></input>
                <label>Original Name</label>
                <input {...register("original_name")} type="text" placeholder="Enter Original Name" required></input>
                <label>Origin Country</label>
                <input {...register("origin_country")} type="text" placeholder="US, GB" required></input>
                <label>Genres</label>
                <input {...register("genres")} type="text" placeholder="Sci-Fi & Fantasy, Mystery, Drama" required></input>
                <label>Overview</label>
                <textarea {...register("overview")} placeholder="Enter Overview" rows={4} required></textarea>
                <button className="submitButton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SeriesForm;