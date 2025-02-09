import React, { useEffect, useState } from 'react';

const SingleUniversity = ({ params }) => {
    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                const response = await fetch(`http://localhost:5000/university/${params.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUniversity(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversity();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{university.name}</h1>
            <p>{university.description}</p>
            {/* Add more university details as needed */}
        </div>
    );
};

export default SingleUniversity;
