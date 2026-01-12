import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Share2, TrendingUp, MapPin } from 'lucide-react';
import StatsCard from './components/StatsCard';
import Charts from './components/Charts';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const stravaId = params.get("stravaId");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stravaId) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/me?stravaId=${stravaId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [stravaId]);

  // Generate mock monthly data based on total stats
  const generateMonthlyData = (totalKm) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyDistribution = [0.08, 0.07, 0.10, 0.12, 0.15, 0.18, 0.20, 0.16, 0.14, 0.12, 0.10, 0.08];
    
    return months.map((month, index) => ({
      month,
      distance: Math.round(totalKm * monthlyDistribution[index] * 10) / 10
    }));
  };

  // Generate cumulative data
  const generateCumulativeData = (monthlyData) => {
    let cumulative = 0;
    return monthlyData.map(item => {
      cumulative += item.distance;
      return {
        month: item.month,
        distance: Math.round(cumulative * 10) / 10
      };
    });
  };

  const monthlyData = stats ? generateMonthlyData(parseFloat(stats.km)) : [];
  const cumulativeData = generateCumulativeData(monthlyData);

  // Calculate fun stats
  const getFunStats = (runs, km) => {
    const marathonDistance = 42.195;
    const marathons = Math.round((km / marathonDistance) * 10) / 10;
    
    // Distance comparisons
    const earthToMoon = 384400;
    const nyToLa = 4470;
    const acrossUS = 4667;
    
    let comparison = '';
    if (km > earthToMoon) {
      comparison = `That's ${Math.round(km / earthToMoon * 10) / 10} trips to the Moon! 🌙`;
    } else if (km > acrossUS) {
      comparison = `That's ${Math.round(km / acrossUS * 10) / 10} trips across the US! 🇺🇸`;
    } else if (km > nyToLa) {
      comparison = `That's ${Math.round(km / nyToLa * 10) / 10} NYC to LA trips! 🗽`;
    } else {
      comparison = `That's like running ${Math.round(km / 10)} 10K races! 🏃‍♂️`;
    }

    return { marathons, comparison };
  };

  const handleShare = () => {
    const text = `I ran ${stats.runs} times and covered ${stats.km} km in 2026! 🏃‍♂️ #StravaYearReview`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({ title: 'My Strava Year Review', text, url });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert('Link copied to clipboard!');
    }
  };

  if (!stravaId) return (
    <div className="min-h-screen bg-strava-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">🏃 Strava Year Review</h1>
        <p className="text-gray-400 mb-8">Connect your Strava account to see your 2026 running stats!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = "/api/login"}
          className="bg-strava-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors w-full"
        >
          Connect with Strava
        </motion.button>
      </motion.div>
    </div>
  );

  if (loading) return <LoadingScreen />;
  
  if (error) return <ErrorScreen onRetry={() => window.location.reload()} />;

  const funStats = getFunStats(stats.runs, parseFloat(stats.km));

  return (
    <div className="min-h-screen bg-strava-dark">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
          Your 2026 Running Year
        </h1>
        <p className="text-gray-400 text-lg">A year of dedication, miles, and memories</p>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatsCard
            icon="🏃"
            label="Total Runs"
            value={stats.runs}
            delay={0.1}
          />
          <StatsCard
            icon="📏"
            label="Total Distance"
            value={parseFloat(stats.km)}
            suffix=" km"
            delay={0.2}
          />
        </div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-gradient rounded-2xl p-8 border border-gray-800 mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-strava-orange" />
            Fun Facts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 mb-2">Marathon Equivalent</p>
              <p className="text-3xl font-bold gradient-text">
                {funStats.marathons} marathons 🏅
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Distance Comparison</p>
              <p className="text-lg text-white">
                {funStats.comparison}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <Charts monthlyData={monthlyData} cumulativeData={cumulativeData} />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center py-8 border-t border-gray-800"
        >
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-4 h-4 mr-2 text-strava-orange" />
            <span className="text-gray-400">Built with Strava API</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="bg-strava-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Your Year Review
          </motion.button>
        </motion.footer>
      </main>
    </div>
  );
}
