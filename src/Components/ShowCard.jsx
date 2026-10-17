import {Link} from 'react-router-dom';
function ShowCard({show}) {
    const Image = show.image?.medium;
    return (
        <div>
            <img src={Image} alt={show.name}/>
            <p>{show.name}</p>  
            <p>{show.rating?.average}</p>
            <p>{show.genres}</p>
            <Link to={`/shows/${show.id}`} className="btn">View Details</Link>  
        </div>

    );
}
export default ShowCard;
