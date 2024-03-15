import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Map, Sparkles, Watch } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative isolate overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                    Discover the world with <br />
                    <span className="gradient-text">Generative AI</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                    Say goodbye to hours of research. Enter your destination, budget, and travel days, and let our AI instantly generate a highly personalized, day-by-day travel itinerary just for you.
                </p>
                <div className="flex items-center justify-center space-x-4">
                    <Link to="/signup" className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-lg shadow-lg hover:shadow-brand-secondary/50 transition-all hover:scale-105">
                        Start Planning Free
                    </Link>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <FeatureCard 
                    icon={<Sparkles className="w-8 h-8 text-brand-primary"/>}
                    title="Smart Itineraries"
                    desc="Gemini-powered personalized day-wise schedules integrating hotels, dining, and attractions."
                />
                <FeatureCard 
                    icon={<Map className="w-8 h-8 text-brand-secondary"/>}
                    title="Budget Optimized"
                    desc="Our ML algorithms distribute your specific budget beautifully across activities and essentials."
                />
                <FeatureCard 
                    icon={<Watch className="w-8 h-8 text-brand-accent"/>}
                    title="Save 10x Time"
                    desc="Stop browsing 20 different tabs. Get a production-ready trip plan in under 10 seconds."
                />
            </motion.div>
        </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-colors duration-300">
        <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
