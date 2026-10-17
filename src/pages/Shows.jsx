import { useState, useEffect } from "react";
import ShowCard from "../Components/ShowCard";
function Shows() {
    const [shows, setShows] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.tvmaze.com/search/shows?q=all')
            .then((res) => {
                if (!res.ok) throw new Error('api not fetched ')
                return res.json();

            })
            .then((data) => {
                const showsData = data.slice(0, 40).map(item => item.show);
                setShows(showsData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
                setLoading(false);
            });


    }, []);
    const filtered = shows.filter((show) =>
        show.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (loading) return <div className="loader">Loading</div>;

    if (error) return <div className="error">{error}</div>;
    return (
        <div>
            <input type="text" placeholder="Search Shows" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div>
                {filtered.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>
        </div>
    )

}
export default Shows;