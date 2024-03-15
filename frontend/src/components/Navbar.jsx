import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Plane, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 glass-panel border-b-0 border-white/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <Plane className="w-8 h-8 text-brand-primary" />
                    <span className="text-xl font-bold font-sans tracking-tight">GenAI<span className="gradient-text">Travel</span></span>
                </Link>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-sm font-medium hover:text-brand-primary transition-colors">
                                Dashboard
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-sm font-medium text-brand-secondary hover:text-white transition-colors">
                                    Admin Panel
                                </Link>
                            )}
                            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/20">
                                <span className="flex items-center text-sm font-medium">
                                    <User className="w-4 h-4 mr-2" />
                                    {user.name}
                                </span>
                                <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium hover:text-brand-primary transition-colors">
                                Sign In
                            </Link>
                            <Link to="/signup" className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-sm font-bold shadow-lg hover:shadow-brand-primary/25 transition-all transform hover:scale-105">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
