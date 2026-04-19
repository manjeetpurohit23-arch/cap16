import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Calendar, DollarSign, Loader2, Download } from 'lucide-react';
import axios from 'axios';

const TripPlanner = () => {
    const { token, API_URL } = useContext(AuthContext);
    
    const [formData, setFormData] = useState({ destination: '', days: 3, budget: 'Medium' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const res = await axios.post(`${API_URL}/trips/generate`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResult(res.data.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to generate itinerary. Try again.');
        }
        setLoading(false);
    };

    if (result) {
        return <TripResult trip={result} onReset={() => setResult(null)} />;
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 md:p-12 rounded-3xl"
            >
                <h1 className="text-4xl font-bold mb-4 text-center">Plan Your <span className="gradient-text">Next Adventure</span></h1>
                <p className="text-gray-400 text-center mb-10">Tell our AI where you want to go, and it handles the rest.</p>

                {error && <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mb-6 text-center">{error}</div>}

                <form onSubmit={handleGenerate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Destination</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                            <input 
                                type="text" required placeholder="e.g. Kyoto, Japan or Paris, France"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-brand-primary"
                                value={formData.destination}
                                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Duration (Days)</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                <input 
                                    type="number" required min="1" max="30"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-brand-primary"
                                    value={formData.days}
                                    onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Budget Tier</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                <select 
                                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-brand-primary appearance-none"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                >
                                    <option value="Low">Economy / Backpacker</option>
                                    <option value="Medium">Standard / Moderate</option>
                                    <option value="High">Premium / Comfort</option>
                                    <option value="Luxury">Luxury / 5-Star</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" disabled={loading}
                        className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-lg shadow-lg hover:shadow-brand-primary/50 transition-all flex items-center justify-center"
                    >
                        {loading ? (
                            <><Loader2 className="w-6 h-6 mr-3 animate-spin"/> Generating Itinerary...</>
                        ) : "Generate Smart Itinerary"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

// Component to Display the generated result
const TripResult = ({ trip, onReset }) => {
    const [activeLocation, setActiveLocation] = useState(trip.destination);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-8">
            <button onClick={onReset} className="text-gray-400 hover:text-white mb-6 flex items-center">
                 &larr; Back to Planner
            </button>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left side: Overview & Map Mock */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="glass-panel p-6 rounded-3xl overflow-hidden relative">
                        {trip.imageUrl && <img src={trip.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="bg"/>}
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2">{trip.destination}</h2>
                            <p className="text-green-400 font-bold text-xl mb-4 text-brand-accent">Estimated Total: ${trip.estimatedCost}</p>
                            
                            <div className="space-y-3 mb-6 bg-black/40 p-4 rounded-xl">
                                <div className="flex justify-between"><span>Duration:</span> <span className="font-bold">{trip.days} Days</span></div>
                                <div className="flex justify-between"><span>Pacing:</span> <span className="font-bold">{trip.budget}</span></div>
                            </div>
                            
                            <button className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold transition-colors">
                                <Download className="w-5 h-5 mr-2" /> Download PDF
                            </button>
                        </div>
                    </div>

                    {/* Interactive Google Map using iframe */}
                    <div className="glass-panel p-2 rounded-3xl overflow-hidden h-64 bg-gray-800 shadow-lg">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            style={{ border: 0, borderRadius: '1.2rem', transition: 'all 0.3s ease' }}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(activeLocation)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            allowFullScreen
                            title="Interactive Map"
                        ></iframe>
                    </div>

                    {/* Where to Stay (Hotels) */}
                    {trip.hotels && trip.hotels.length > 0 && (
                        <div className="glass-panel p-6 rounded-3xl mt-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center"><MapPin className="mr-2 text-brand-secondary" /> Where to Stay</h3>
                            <div className="space-y-4">
                                {trip.hotels.map((hotel, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg leading-tight">{hotel.name}</h4>
                                            <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded-full font-bold ml-2 shrink-0">⭐ {hotel.rating}</span>
                                        </div>
                                        <p className="text-brand-accent font-bold text-md mb-2">{hotel.pricePerNight} <span className="text-gray-400 text-sm font-normal">/ night</span></p>
                                        <div className="flex flex-wrap gap-2">
                                            {hotel.amenities.map((amenity, i) => (
                                                <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{amenity}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right side: Day by day breakdown */}
                <div className="w-full md:w-2/3 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center"><Calendar className="mr-3 text-brand-primary"/> Full Itinerary</h3>
                    {trip.itineraryData && trip.itineraryData.map((dayPlan, idx) => (
                        <div key={idx} className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-primary">
                            <h4 className="text-xl font-bold mb-1">Day {dayPlan.day}</h4>
                            <p className="text-gray-400 text-sm mb-4">{dayPlan.theme}</p>
                            <div className="space-y-4">
                                {dayPlan.schedule.map((item, idxx) => (
                                    <div 
                                        key={idxx} 
                                        onClick={() => {
                                            if (item.placeName) {
                                                setActiveLocation(`${item.placeName}, ${trip.destination}`);
                                            }
                                        }}
                                        className={`flex border-t border-white/5 pt-4 transition-all duration-300 ${item.placeName ? 'cursor-pointer hover:bg-white/5 hover:pl-2 rounded-r-lg' : ''}`}
                                    >
                                        <div className="w-24 text-sm text-brand-secondary font-bold flex-shrink-0">{item.time}</div>
                                        <div>
                                            <p className="font-medium text-lg text-white">
                                                {item.placeName && <span className="font-bold text-brand-primary">{item.placeName}: </span>}
                                                {item.activity}
                                            </p>
                                            <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300 mt-2 inline-block">{item.type}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default TripPlanner;
