import React, { useEffect, useState } from 'react';

const PictureOfNasa = () => {
    const [picturesData, setPicturesData] = useState([]);
    const [query, setQuery] = useState('terre');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://images-api.nasa.gov/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.collection && data.collection.items.length > 0) {
                    setPicturesData(data.collection.items.slice(0, 10));
                } else {
                    setPicturesData([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [query]);

    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.elements.search.value;
        setQuery(searchQuery);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" name="search" placeholder="Search..." />
                <button type="submit">Search</button>
            </form>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {picturesData.length > 0 ? (
                        picturesData.map((picture, index) => {
                            const { data, links } = picture;
                            const { title, description, photographer, location, date_created } = data[0] || {};
                            const imageUrl = links && links[0] ? links[0].href : '';
                            return (
                                <div key={index}>
                                    <h1>{title}</h1>
                                    <img src={imageUrl} alt={title} />
                                    <p>{description}</p>
                                    <p><strong>Photographer:</strong> {photographer}</p>
                                    <p><strong>Location:</strong> {location}</p>
                                    <p><strong>Date Created:</strong> {new Date(date_created).toLocaleDateString()}</p>
                                </div>
                            );
                        })
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PictureOfNasa;