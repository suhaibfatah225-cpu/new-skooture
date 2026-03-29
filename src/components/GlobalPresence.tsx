import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useTheme } from '../context/ThemeContext';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const markers = [
  { markerOffset: -30, name: "London", coordinates: [-0.1276, 51.5074] as [number, number] },
  { markerOffset: 15, name: "Egypt", coordinates: [30.8025, 26.8206] as [number, number] },
  { markerOffset: 15, name: "UAE", coordinates: [54.2098, 23.4241] as [number, number] }
];

export default function GlobalPresence() {
  const { content, t } = useContent();
  const { theme } = useTheme();

  return (
    <section id="global" className="py-32 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10 transition-colors duration-300" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors duration-300"
          >
            {t(content.global.title)}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] bg-white/80 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-xl overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
              center: [20, 30]
            }}
            className="w-full h-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={theme === 'dark' ? '#374151' : '#cbd5e1'}
                    stroke={theme === 'dark' ? '#4b5563' : '#94a3b8'}
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none', transition: 'all 250ms' },
                      hover: { outline: 'none', fill: theme === 'dark' ? '#4b5563' : '#94a3b8', transition: 'all 250ms' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>
            
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <g className="group cursor-pointer">
                  <circle r={4} fill="#3b82f6" className="animate-pulse" />
                  <circle r={12} fill="#3b82f6" opacity={0.3} className="animate-ping" />
                  <text
                    textAnchor="middle"
                    y={markerOffset}
                    style={{ fontFamily: "system-ui", fill: theme === 'dark' ? '#f4f4f5' : '#1f2937', fontSize: '14px', fontWeight: 'bold' }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
                  >
                    {name}
                  </text>
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    </section>
  );
}
