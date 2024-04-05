import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Users, Globe, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
    const { token, API_URL } = useContext(AuthContext);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get(`${API_URL}/admin/analytics`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAnalytics(res.data.data);
            } catch (err) {
                console.error("Admin fetch failed", err);
            }
            setLoading(false);
        };
        fetchAnalytics();
    }, [token, API_URL]);

    if (loading) return <div className="text-center mt-20">Loading Admin Portal...</div>;
    if (!analytics) return <div className="text-center mt-20 text-red-500">Access Denied</div>;

    const chartData = analytics.popularDestinations.map(d => ({
        name: d._id,
        count: d.count
    }));

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8 flex items-center">
                <ShieldCheck className="w-8 h-8 mr-3 text-brand-secondary" /> 
                System Analytics
            </h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="glass-panel p-6 rounded-3xl flex items-center">
                    <div className="p-4 bg-brand-primary/20 rounded-2xl mr-4"><Users className="w-8 h-8 text-brand-primary" /></div>
                    <div>
                        <p className="text-sm text-gray-400">Total Registered Users</p>
                        <h2 className="text-3xl font-bold">{analytics.totalUsers}</h2>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-3xl flex items-center">
                    <div className="p-4 bg-brand-secondary/20 rounded-2xl mr-4"><Globe className="w-8 h-8 text-brand-secondary" /></div>
                    <div>
                        <p className="text-sm text-gray-400">Total Trips Generated</p>
                        <h2 className="text-3xl font-bold">{analytics.totalTrips}</h2>
                    </div>
                </div>
            </div>

            {/* Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-3xl">
                    <h3 className="text-xl font-bold mb-6">Popular Destinations</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', border: 'none' }}/>
                                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl overflow-hidden">
                    <h3 className="text-xl font-bold mb-6">Recent Platform Usage</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#1e293b] text-xs uppercase text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">User</th>
                                    <th className="px-4 py-3">Destination</th>
                                    <th className="px-4 py-3 text-right rounded-tr-lg">Cost Est.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.recentTrips.map(trip => (
                                    <tr key={trip._id} className="border-b border-gray-800 last:border-0">
                                        <td className="px-4 py-4">{trip.user.name}</td>
                                        <td className="px-4 py-4 font-bold text-white">{trip.destination}</td>
                                        <td className="px-4 py-4 text-right text-brand-accent">${trip.estimatedCost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
