import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    Promise.all([


      fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json()),
      fetch(`https://api.tvmaze.com/shows/${id}/cast`).then(res => res.json())
    ])

      .then(([showData, castData]) => {
        setShow(showData);
        setCast(castData);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loader">Loading details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!show) return <div className="error">Show not found</div>;

  const imageUrl = show.image?.original;
  return (
    <div >
      <button onClick={() => navigate(-1)} > Go Back</button>

      <div >
        <img src={imageUrl} alt={show.name} />
        <div >
          <h1>{show.name}</h1>
          <p>{show.rating?.average}</p>
          <p>{show.genres?.join(', ')}</p>
          <p> {show.language}</p>
          <p> {show.premiered}</p>

        </div>
      </div>

      <div >
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.length > 0 ? (
            cast.map((item, index) => {
              const actorImage = item.person.image?.medium;
              return (
                <div key={index} >
                  <img src={actorImage} />
                  <p><strong>{item.person.name}</strong></p>
                  <p>as {item.character.name}</p>
                </div>
              );
            })
          ) : (
            <p>No cast information available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowDetail;
