import { BookOpen, Users, Briefcase, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const features = [
  {
    icon: <BookOpen className="h-6 w-6 text-white" />,
    bgGradient: "from-blue-500 to-indigo-600",
    title: "Expert-led Courses",
    description: "Access quality courses curated by industry professionals to gain practical skills that matter.",
    href: "/courses"
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    bgGradient: "from-violet-500 to-purple-600",
    title: "Personalized Mentorship",
    description: "Connect with industry mentors who provide guidance and feedback on your learning journey.",
    href: "/mentors"
  },
  {
    icon: <Briefcase className="h-6 w-6 text-white" />,
    bgGradient: "from-cyan-500 to-blue-600",
    title: "Study Space Booking",
    description: "Reserve quiet study venues for individual or group learning sessions to maximize productivity.",
    href: "/study-spaces"
  }
];

export default function Features() {
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
    hidden: { y: 20, opacity: 0 },
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
  
  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="lg:text-center"
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
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Next-Gen Learning</span>
          </motion.div>
          
          <motion.h2 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Everything you need to succeed
          </motion.h2>
          
          <motion.p 
            className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            SkillSpace provides a comprehensive learning ecosystem for your professional growth.
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { 
                    type: "spring", 
                    stiffness: 300
                  }
                }}
              >
                <Link href={feature.href} className="block h-full">
                  <div className="relative h-full group">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md bg-gradient-to-r from-primary/30 to-indigo-500/30"></div>
                    
                    <div className="relative h-full rounded-2xl p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-primary/40 transition-all duration-300 overflow-hidden group-hover:shadow-lg group-hover:shadow-primary/10">
                      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                      
                      <motion.div 
                        className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        variants={iconVariants}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="mt-4 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                      
                      <motion.div 
                        className="mt-6 text-primary font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        <span>Learn more</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
