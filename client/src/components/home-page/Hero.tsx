import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Flash } from "@/assets/icons";
import homepageImage from "@assets/homepage.webp";
import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

export default function Hero() {
  const controls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");
    
    // Create a floating animation effect
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [controls]);
  
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  const floatingVariants = {
    up: { y: -10, transition: { duration: 2, ease: "easeInOut" } },
    down: { y: 10, transition: { duration: 2, ease: "easeInOut" } }
  };
  
  const glowVariants = {
    pulse: {
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.05, 1],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.5,
        type: "spring",
        damping: 15
      }
    }
  };
  
  const statsCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        delay: 1.2,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };
  
  const textGradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 15, repeat: Infinity, ease: "linear" }
    }
  };
  
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };
  
  // Animation for floating particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10
  }));
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 text-white min-h-[85vh] flex items-center">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Animated glow effect */}
      <motion.div 
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        variants={glowVariants}
        animate="pulse"
      >
        <div className="h-[300px] w-[800px] rounded-full bg-gradient-to-r from-violet-600 via-primary to-indigo-600 opacity-20"></div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 lg:w-full">
          <div className="pt-16 sm:pt-20 lg:pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="lg:grid lg:grid-cols-12 lg:gap-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
                  variants={containerVariants}
                >
                  <motion.div 
                    className="inline-block rounded-full bg-gradient-to-r from-primary-400 to-indigo-600 px-3 py-1 text-xs font-semibold text-white mb-6 shadow-lg shadow-primary/20"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    The Future of Learning
                  </motion.div>
                  
                  <motion.h1 
                    className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                    variants={itemVariants}
                  >
                    <motion.span className="block" variants={itemVariants}>Discover your path</motion.span>
                    <motion.span 
                      className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-primary to-violet-400 bg-size-200"
                      style={{ backgroundSize: "200% auto" }}
                      variants={textGradientVariants}
                      animate="animate"
                    >
                      to skills mastery
                    </motion.span>
                  </motion.h1>
                  
                  <motion.p 
                    className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl"
                    variants={itemVariants}
                  >
                    SkillSpace helps you gain practical skills through expert-led courses, real-world projects, and personalized mentorship.
                  </motion.p>
                  
                  <motion.div 
                    className="mt-10 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
                    variants={itemVariants}
                  >
                    <div className="sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md">
                        <Link href="/courses">
                          <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Button size="lg" className="w-full md:text-lg md:px-10 bg-gradient-to-r from-primary to-indigo-600 transition-all duration-300">
                              Explore Courses
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link href="/mentors">
                          <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Button variant="outline" size="lg" className="w-full md:text-lg md:px-10 border-gray-500 text-white hover:bg-gray-800 hover:border-white transition-all">
                              Find a Mentor
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                  variants={containerVariants}
                >
                  <motion.div 
                    className="relative mx-auto w-full lg:max-w-md"
                    variants={floatingVariants}
                    animate={count % 2 === 0 ? "up" : "down"}
                  >
                    <motion.div 
                      className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-indigo-600 opacity-20 blur-lg"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <motion.div 
                      className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800"
                      variants={imageVariants}
                      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    >
                      <img 
                        className="w-full"
                        src={homepageImage}
                        loading="eager"
                        width="768"
                        height="512"
                        alt="SkillSpace learning platform interface"
                      />
                      
                      {/* Floating card stats */}
                      <motion.div 
                        className="absolute right-4 bottom-4 backdrop-blur-xl bg-black/30 p-4 rounded-xl shadow-lg border border-white/10"
                        variants={statsCardVariants}
                        whileHover="hover"
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="flex items-center">
                          <motion.span 
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg"
                            animate={{ 
                              rotate: [0, 5, 0, -5, 0], 
                              transition: { duration: 5, repeat: Infinity }
                            }}
                          >
                            <Flash className="h-6 w-6 text-white" />
                          </motion.span>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-200">Success Rate</p>
                            <motion.p 
                              className="text-2xl font-bold text-white"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0, transition: { delay: 1.5 } }}
                            >
                              <AnimatePresence>
                                <motion.span
                                  key="number"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  93<span className="text-primary">%</span>
                                </motion.span>
                              </AnimatePresence>
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Tech dots decoration */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <motion.div 
                          className="h-3 w-3 rounded-full bg-red-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.6, type: "spring" }}
                        />
                        <motion.div 
                          className="h-3 w-3 rounded-full bg-yellow-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.7, type: "spring" }}
                        />
                        <motion.div 
                          className="h-3 w-3 rounded-full bg-green-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.8, type: "spring" }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
