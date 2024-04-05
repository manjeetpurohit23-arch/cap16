import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, MapPin, Calendar, DollarSign, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const { token, API_URL } = useContext(AuthContext);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await axios.get(`${API_URL}/trips`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTrips(res.data.data);
            } catch (err) {
                console.error("Failed to load trips", err);
            }
            setLoading(false);
        };
        fetchTrips();
    }, [token, API_URL]);

    const deleteTrip = async (id) => {
        try {
            await axios.delete(`${API_URL}/trips/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTrips(trips.filter(t => t._id !== id));
        } catch (err) {
            console.error("Failed to delete trip", err);
        }
    };

    if (loading) return <div className="text-center mt-20">Loading your adventures...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold">My <span className="gradient-text">Trips</span></h1>
                <Link to="/planner" className="flex items-center px-6 py-3 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-secondary transition-colors">
                    <Plus className="w-5 h-5 mr-2" />
                    New Trip
                </Link>
            </div>

            {trips.length === 0 ? (
                <div className="text-center py-20 glass-panel rounded-3xl">
                    <h2 className="text-2xl font-semibold mb-4">No trips planned yet!</h2>
                    <p className="text-gray-400 mb-6">Start exploring by generating your first AI-powered itinerary.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={trip._id} 
                            className="glass-panel overflow-hidden rounded-2xl flex flex-col"
                        >
                            <div className="h-48 w-full bg-gray-800 relative">
                                {trip.imageUrl ? (
                                    <img src={trip.imageUrl} alt={trip.destination} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-brand-dark/50"><MapPin className="text-brand-primary w-12 h-12" /></div>
                                )}
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                                    {trip.days} Days
                                </div>
                            </div>
                            
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold mb-2">{trip.destination}</h3>
                                <div className="flex items-center text-gray-400 text-sm mb-4">
                                    <DollarSign className="w-4 h-4 mr-1" />
                                    {trip.budget} Budget • Est. ${trip.estimatedCost}
                                </div>
                                <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/10">
                                    <span className="text-brand-primary text-sm font-medium hover:underline cursor-pointer">View PDF</span>
                                    <button onClick={() => deleteTrip(trip._id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
