import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experts } from "@/data/mockData";
import { Link } from "wouter";
import { Linkedin, User2, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Define mentor specializations based on their roles with type safety
type MentorName = "Sudhiksha Krishnan" | "Aditya V" | "Swasthik R" | 
                 "Rida Fathima" | "Gowtham B S" | "Hemanth Gowda";

const mentorSpecializations: Record<MentorName, string[]> = {
  "Sudhiksha Krishnan": ["Machine Learning", "AI Research", "Data Science"],
  "Aditya V": ["Full-Stack Development", "JavaScript", "Cloud Services"],
  "Swasthik R": ["Software Architecture", "Backend Development", "System Design"],
  "Rida Fathima": ["UI/UX Design", "Product Design", "User Research"],
  "Gowtham B S": ["Product Management", "Business Strategy", "Market Analysis"],
  "Hemanth Gowda": ["Data Analytics", "Business Intelligence", "Statistical Analysis"]
};

export default function ExpertMentors() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "tween",
        duration: 0.5
      }
    }
  };
  
  return (
    <section id="mentors" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute -top-24 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <User2 className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Expert Mentorship</span>
          </motion.div>
          
          <motion.h2 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Meet our experts
          </motion.h2>
          
          <motion.p 
            className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get personalized guidance from industry professionals who are passionate about teaching.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {experts.map((expert, index) => {
            // Get specializations for this mentor
            const specializations = Object.keys(mentorSpecializations).includes(expert.name) 
              ? mentorSpecializations[expert.name as MentorName] 
              : [];
              
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Link to="/mentors" className="block h-full">
                  <Card className="overflow-hidden h-full cursor-pointer bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-primary/30 transition-all duration-300 group">
                    <div className="relative">
                      <motion.div 
                        className="w-full h-64 overflow-hidden"
                        variants={imageVariants}
                      >
                        <img 
                          src={expert.image} 
                          alt={`${expert.name} - ${expert.title}`} 
                          className="w-full h-full object-cover object-center"
                          style={{ objectPosition: expert.name === "Gowtham B S" || expert.name === "Rida Fathima" ? "center top" : "center" }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                      </motion.div>
                      
                      {/* Floating rating badge */}
                      <motion.div 
                        className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-2 py-1 rounded-full text-white text-xs flex items-center space-x-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span>4.9</span>
                      </motion.div>
                      
                      <motion.div 
                        className="absolute -bottom-14 left-1/2 transform -translate-x-1/2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      >
                        <div className="rounded-full h-28 w-28 overflow-hidden border-4 border-slate-800 shadow-lg shadow-black/30 bg-slate-800">
                          <img 
                            src={expert.image} 
                            alt={expert.name}
                            loading="lazy"
                            width="112"
                            height="112" 
                            className="h-full w-full object-cover object-center"
                            style={{ objectPosition: expert.name === "Gowtham B S" || expert.name === "Rida Fathima" ? "center top" : "center" }}
                          />
                        </div>
                      </motion.div>
                    </div>
                    
                    <CardContent className="p-5 pt-16 text-center bg-gradient-to-b from-slate-800/50 to-slate-900/50">
                      <motion.h3 
                        className="text-lg font-semibold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {expert.name}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-sm text-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {expert.title}
                      </motion.p>
                      
                      <motion.div 
                        className="mt-3 flex flex-wrap justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        {specializations.slice(0, 2).map((specialization, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="bg-primary/10 text-primary border-primary/30 text-xs backdrop-blur-sm"
                          >
                            {specialization}
                          </Badge>
                        ))}
                      </motion.div>
                      
                      <motion.p 
                        className="mt-3 text-sm text-gray-300 line-clamp-3 group-hover:text-white transition-colors duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {expert.bio}
                      </motion.p>
                      
                      <motion.div 
                        className="mt-4 flex gap-2 justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {expert.linkedIn && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-2 bg-primary/10 border-primary/30 text-white hover:bg-primary/20 transition-all"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(expert.linkedIn, '_blank');
                            }}
                          >
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          className="bg-primary/80 hover:bg-primary transition-all"
                        >
                          View Profile
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/mentors">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="inline-flex items-center px-6 py-6 bg-gradient-to-r from-primary to-indigo-600 hover:shadow-lg hover:shadow-primary/20 transition-all">
                <Sparkles className="mr-2 h-5 w-5" />
                View All Mentors
                <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
