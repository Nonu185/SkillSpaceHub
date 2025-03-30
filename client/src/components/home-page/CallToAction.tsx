import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Mail, Bell, Sparkles } from "lucide-react";

export default function CallToAction() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed to newsletter");
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-indigo-700 -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 10 + 4,
              height: Math.random() * 10 + 4,
              backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 100],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Glowing orbs */}
      <motion.div 
        className="absolute top-10 left-10 w-60 h-60 bg-blue-400/20 rounded-full filter blur-3xl opacity-30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/20 rounded-full filter blur-3xl opacity-30"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="lg:grid lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <motion.div 
              className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="h-4 w-4 text-blue-200 mr-2" />
              <span className="text-sm font-medium text-blue-200">Launch Your Learning Journey</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl font-extrabold text-white sm:text-5xl"
              variants={itemVariants}
            >
              Ready to boost your skills?
            </motion.h2>
            
            <motion.p 
              className="mt-4 max-w-3xl text-xl text-blue-100"
              variants={itemVariants}
            >
              Join SkillSpace today and get access to expert-led courses, personalized mentorship, study spaces, and skill exchange opportunities.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link href="/register">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    size="lg" 
                    className="px-8 py-6 bg-white text-primary hover:text-primary/90 font-bold flex items-center space-x-2 shadow-lg shadow-blue-700/20"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    <span>Get Started</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/about">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-6 text-white border-white/30 backdrop-blur-sm hover:bg-white/10 hover:text-white"
                  >
                    Learn more
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-16 lg:mt-0"
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 15, stiffness: 70, delay: 0.3 }}
              className="relative"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-indigo-500/30 rounded-2xl blur-xl opacity-50"></div>
              
              <Card className="backdrop-blur-xl bg-slate-900/40 border border-white/10 shadow-2xl rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-indigo-500/5 to-transparent"></div>
                
                <CardContent className="px-6 py-8 sm:px-10 sm:py-10 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center"
                  >
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">Newsletter</h3>
                      <p className="mt-1 text-sm text-blue-200">Get the latest updates on new courses and mentors</p>
                    </div>
                  </motion.div>
                  
                  <motion.form 
                    className="mt-8"
                    onSubmit={handleSubscribe}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                      <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-md blur-sm -z-10"></div>
                        <Input 
                          type="email" 
                          placeholder="Enter your email" 
                          className="w-full px-4 py-6 bg-white/10 backdrop-blur-md border-white/10 text-white placeholder:text-blue-200 rounded-md focus:border-white focus:ring-white" 
                          required
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full sm:w-auto px-8 py-6 bg-white text-primary hover:bg-blue-50 flex items-center space-x-2"
                        >
                          <Bell className="h-5 w-5 mr-1" />
                          Subscribe
                        </Button>
                      </motion.div>
                    </div>
                  </motion.form>
                  
                  <motion.div 
                    className="mt-6 p-3 bg-white/5 backdrop-blur-md rounded-md border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <p className="ml-3 text-xs text-blue-200">Subscribers get exclusive discounts and early access to new courses.</p>
                    </div>
                  </motion.div>
                </CardContent>
                
                <CardFooter className="px-6 py-4 bg-slate-800/50 border-t border-white/5 flex items-center justify-between">
                  <p className="text-xs text-blue-200">We respect your privacy. Unsubscribe at any time.</p>
                  <Link href="/about">
                    <motion.span 
                      className="text-xs text-primary font-medium cursor-pointer"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Privacy Policy
                    </motion.span>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
