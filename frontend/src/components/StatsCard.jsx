import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

export default function StatsCard({ icon, label, value, suffix = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: '0 10px 30px rgba(251, 146, 60, 0.2)' 
      }}
      className="card-gradient rounded-2xl p-8 border border-gray-700 hover:border-orange-500 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{icon}</div>
        <div className="text-gray-400 text-sm uppercase tracking-wide">{label}</div>
      </div>
      <div className="text-4xl md:text-5xl font-bold gradient-text">
        <AnimatedNumber value={value} suffix={suffix} />
      </div>
    </motion.div>
  );
}
