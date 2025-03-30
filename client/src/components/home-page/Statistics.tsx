import { useState, useEffect } from "react";
import useCountUp from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import { TrendingUp, Users, Award } from "lucide-react";

const statistics = [
  {
    value: "1.5M+",
    label: "Learners in the platform and growing every day",
    countTo: 1.5,
    suffix: "M+",
    icon: <Users className="h-8 w-8" />
  },
  {
    value: "87%",
    label: "Of students report higher career satisfaction after our courses",
    countTo: 87,
    suffix: "%",
    icon: <TrendingUp className="h-8 w-8" />
  },
  {
    value: "364+",
    label: "Expert mentors providing guidance across industries",
    countTo: 364,
    suffix: "+",
    icon: <Award className="h-8 w-8" />
  }
];

export default function Statistics() {
  const [isInView, setIsInView] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient and mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-indigo-700 -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)] -z-10"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 100],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => setIsInView(true)}
        >
          <motion.h2 
            className="text-3xl font-bold text-white md:text-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Building a lifelong learning community
          </motion.h2>
          <motion.div
            className="mt-3 mx-auto h-1 w-20 bg-white/30 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {statistics.map((stat, index) => (
            <StatItem 
              key={index} 
              {...stat} 
              variants={itemVariants} 
              isInView={isInView}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-primary/10 to-indigo-700/10 backdrop-blur-sm"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
    </section>
  );
}

interface StatItemProps {
  value: string;
  label: string;
  countTo: number;
  suffix: string;
  icon: React.ReactNode;
  variants: any;
  isInView: boolean;
  delay: number;
}

function StatItem({ value, label, countTo, suffix, icon, variants, isInView, delay }: StatItemProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);
  
  const count = useCountUp(hasAnimated ? countTo : 0);
  
  return (
    <motion.div 
      className="relative"
      variants={variants}
    >
      <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center overflow-hidden hover:bg-white/20 transition-all duration-300 transform-gpu hover:scale-105 hover:shadow-lg hover:shadow-white/10 group">
        {/* Decorative gradient circles */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <motion.div 
          className="mb-4 mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white/10 text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, 0] }}
          transition={{ 
            scale: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 + delay },
            rotate: { duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 1 + delay }
          }}
        >
          {icon}
        </motion.div>
        
        <motion.p 
          className="text-5xl font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + delay }}
        >
          <span className="inline-block">{count}</span>
          <motion.span 
            className="inline-block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + delay }}
          >
            {suffix}
          </motion.span>
        </motion.p>
        
        <motion.div 
          className="mt-3 mx-auto h-0.5 w-12 bg-white/30 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.6, delay: 0.8 + delay }}
        />
        
        <motion.p 
          className="mt-4 text-lg font-medium text-blue-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 + delay }}
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
}
