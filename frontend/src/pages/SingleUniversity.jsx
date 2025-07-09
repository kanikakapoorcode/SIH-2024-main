import React, { useEffect, useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';

const SingleUniversity = () => {
    // Get ID from URL params
    const params = useParams();
    // Try to use loader data if available
    const loaderData = useLoaderData();
    
    const [university, setUniversity] = useState(loaderData || null);
    const [loading, setLoading] = useState(!loaderData);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Skip fetching if we already have data from the loader
        if (loaderData) return;
        
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
    }, [params.id, loaderData]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
    
    if (error) return (
        <div className="p-8 text-center">
            <div className="text-red-500 text-xl mb-4">Error loading university data</div>
            <p className="text-gray-700">{error}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6">
                    <h1 className="text-3xl font-bold text-white">{university.name}</h1>
                </div>
                <div className="p-6">
                    <p className="text-gray-700">{university.description}</p>
                    {/* Add more university details as needed */}
                </div>
            </div>
        </div>
    );
};

export default SingleUniversity;
