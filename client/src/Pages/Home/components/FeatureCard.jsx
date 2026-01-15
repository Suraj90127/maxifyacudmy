import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-3 items-center"   // <-- FIXED
    >
      {/* Circle Icon Bubble */}
      <div className=" p-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
        <img 
          src={icon} 
          className="w-20" 
          alt={title} 
        />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <p className="text-[#c8d7e1] mt-2 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
