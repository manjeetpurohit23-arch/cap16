import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Lock, Mail } from 'lucide-react';

const SignupPage = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Email might exist.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-panel p-8 rounded-3xl"
            >
                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
                {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-4 text-sm text-center">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input 
                                type="text" required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-brand-primary"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input 
                                type="email" required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-brand-primary"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input 
                                type="password" required minLength="6"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-brand-primary"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold shadow-lg hover:shadow-brand-primary/50 transition-all">
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    Already have an account? <Link to="/login" className="text-white hover:text-brand-primary font-medium">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignupPage;
