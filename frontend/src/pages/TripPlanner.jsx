import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Calendar, DollarSign, Loader2, Download, CloudSun, Navigation, Hotel, Utensils, Landmark } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';

const TripPlanner = () => {
    const { token, API_URL } = useContext(AuthContext);
    
    const [formData, setFormData] = useState({ destination: '', days: 3, budget: 'Medium', travelers: 1 });
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
            localStorage.setItem('lastTripDestination', formData.destination);
            setResult(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate itinerary. Try again.');
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
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Travelers</label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-lg focus:outline-none focus:border-brand-primary"
                                value={formData.travelers}
                                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value, 10) || 1 })}
                            />
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
    const openDirections = (name) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${name}, ${trip.destination}`)}`, '_blank');
    };

    const downloadPdf = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.text(`GEN AI Powered Travel Guide - ${trip.destination}`, 14, 16);
        pdf.setFontSize(11);
        pdf.text(`Duration: ${trip.duration} days`, 14, 25);
        pdf.text(`Budget Tier: ${trip.budgetTier}`, 14, 31);
        pdf.text(`Estimated Total: ${trip?.budget?.total ?? 0}`, 14, 37);
        let y = 46;
        trip.itinerary.forEach((day) => {
            pdf.setFontSize(12);
            pdf.text(`Day ${day.day}: ${day.theme || ''}`, 14, y);
            y += 6;
            (day.schedule || []).forEach((item) => {
                pdf.setFontSize(10);
                pdf.text(`${item.time} - ${item.activity}`, 18, y);
                y += 5;
            });
            y += 4;
            if (y > 270) {
                pdf.addPage();
                y = 20;
            }
        });
        pdf.save(`${trip.destination.replace(/\s+/g, '-')}-trip-plan.pdf`);
    };

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
                            <p className="text-green-400 font-bold text-xl mb-4 text-brand-accent">
                                Estimated Total: ${trip?.budget?.total ?? 0}
                            </p>
                            
                            <div className="space-y-3 mb-6 bg-black/40 p-4 rounded-xl">
                                <div className="flex justify-between"><span>Duration:</span> <span className="font-bold">{trip.duration} Days</span></div>
                                <div className="flex justify-between"><span>Pacing:</span> <span className="font-bold">{trip.budgetTier}</span></div>
                            </div>

                            {trip.weather && (
                                <div className="mb-4 rounded-xl bg-slate-900/60 p-3 text-sm border border-white/10">
                                    <p className="flex items-center gap-2 font-semibold"><CloudSun className="w-4 h-4" /> Live Weather</p>
                                    <p>{trip.weather.city} - {trip.weather.description}, {trip.weather.tempC}°C</p>
                                </div>
                            )}

                            <button onClick={downloadPdf} className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold transition-colors">
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
                            <h3 className="text-xl font-bold mb-4 flex items-center"><Hotel className="mr-2 text-brand-secondary" /> Best Places to Stay</h3>
                            <div className="space-y-4">
                                {trip.hotels.map((hotel, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg leading-tight">{hotel.name}</h4>
                                            <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded-full font-bold ml-2 shrink-0">⭐ {hotel.rating}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-2">{hotel.address}</p>
                                        <p className="text-xs text-gray-300">Area: {hotel.areaName || 'N/A'}</p>
                                        <p className="text-xs text-gray-300">Price Range: {hotel.priceRange || 'N/A'}</p>
                                        <p className="text-xs text-gray-300 mb-2">Distance from top attraction: {hotel.distanceFromTopAttractionsKm ?? 'N/A'} km</p>
                                        <button onClick={() => openDirections(hotel.name)} className="text-xs px-3 py-1 rounded bg-brand-primary/20 hover:bg-brand-primary/40">
                                            <Navigation className="inline w-3 h-3 mr-1" /> Route
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {trip.restaurants?.length > 0 && (
                        <div className="glass-panel p-6 rounded-3xl mt-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center"><Utensils className="mr-2 text-brand-secondary" /> Real Restaurants</h3>
                            <div className="space-y-3">
                                {trip.restaurants.map((r, idx) => (
                                    <button key={idx} onClick={() => openDirections(r.name)} className="w-full text-left bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10">
                                        <p className="font-semibold">{r.name}</p>
                                        <p className="text-xs text-gray-400">Rating: {r.rating || 'N/A'} • {r.address}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {trip.attractions?.length > 0 && (
                        <div className="glass-panel p-6 rounded-3xl mt-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center"><Landmark className="mr-2 text-brand-secondary" /> Nearby Famous Attractions</h3>
                            <div className="space-y-3">
                                {trip.attractions.map((a, idx) => (
                                    <button key={idx} onClick={() => openDirections(a.name)} className="w-full text-left bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10">
                                        <p className="font-semibold">{a.name}</p>
                                        <p className="text-xs text-gray-400">Rating: {a.rating || 'N/A'} • {a.address}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right side: Day by day breakdown */}
                <div className="w-full md:w-2/3 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center"><Calendar className="mr-3 text-brand-primary"/> Full Itinerary</h3>
                    {trip.itinerary && trip.itinerary.map((dayPlan, idx) => (
                        <div key={idx} className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-primary">
                            <h4 className="text-xl font-bold mb-1">Day {dayPlan.day}</h4>
                            <p className="text-gray-400 text-sm mb-4">{dayPlan.theme || dayPlan.title || 'Planned activities'}</p>
                            <div className="space-y-4">
                                {(dayPlan.schedule || dayPlan.activities?.map((activity) => ({ activity, time: 'Anytime', type: 'General' })) || []).map((item, idxx) => (
                                    <div 
                                        key={idxx} 
                                        onClick={() => {
                                            if (item.placeName) {
                                                setActiveLocation(`${item.placeName}, ${trip.destination}`);
                                                openDirections(item.placeName);
                                            }
                                        }}
                                        className={`flex border-t border-white/5 pt-4 transition-all duration-300 ${item.placeName ? 'cursor-pointer hover:bg-white/5 hover:pl-2 rounded-r-lg' : ''}`}
                                    >
                                        <div className="w-24 text-sm text-brand-secondary font-bold flex-shrink-0">{item.time || 'Anytime'}</div>
                                        <div>
                                            <p className="font-medium text-lg text-white">
                                                {item.placeName && <span className="font-bold text-brand-primary">{item.placeName}: </span>}
                                                {item.activity}
                                            </p>
                                            <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300 mt-2 inline-block">{item.type || 'Activity'}</span>
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
