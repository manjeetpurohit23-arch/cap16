import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your AI Travel Assistant. How can I help you pack or plan today?", isBot: true }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        
        // Add user msg
        setMessages(prev => [...prev, { text: input, isBot: false }]);
        const currentInput = input;
        setInput("");
        
        // Mock Bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                text: `I'm an AI assistant in training! Unfortunately I cannot fully answer "${currentInput}" right now, but feel free to generate a trip itinerary in the planner!`, 
                isBot: true 
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 h-96 glass-panel bg-brand-dark/95 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-brand-primary/30"
                    >
                        <div className="bg-brand-primary/20 p-4 border-b border-white/10 flex justify-between items-center">
                            <span className="font-bold flex items-center"><MessageCircle className="w-4 h-4 mr-2"/> Support</span>
                            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-gray-400 hover:text-white"/></button>
                        </div>
                        
                        <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.isBot ? 'bg-white/10 self-start text-gray-200' : 'bg-brand-primary text-white self-end'}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div className="p-3 border-t border-white/10 flex">
                            <input 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                type="text" placeholder="Type a message..." 
                                className="flex-grow bg-white/5 border border-white/10 rounded-l-lg px-3 py-2 text-sm focus:outline-none"
                            />
                            <button onClick={handleSend} className="bg-brand-primary px-3 rounded-r-lg hover:bg-brand-secondary transition-colors">
                                <Send className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shadow-xl shadow-brand-primary/40 hover:scale-110 transition-transform cursor-pointer ml-auto"
            >
                {isOpen ? <X className="text-white" /> : <MessageCircle className="text-white" />}
            </button>
        </div>
    );
}

export default AIChatWidget;
