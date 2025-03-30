import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "@/data/mockData";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star, Heart, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function Testimonials() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
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
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
        stiffness: 200, 
        damping: 20
      }
    }
  };
  
  // Animated accents
  const icons = [
    <Star className="h-5 w-5 text-yellow-400" />,
    <Heart className="h-5 w-5 text-red-400" />,
    <ThumbsUp className="h-5 w-5 text-green-400" />
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      
      {/* Glowing orbs */}
      <motion.div 
        className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full opacity-20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-10 w-64 h-64 bg-indigo-500/20 rounded-full opacity-20 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
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
            <MessageSquareQuote className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Success Stories</span>
          </motion.div>
          
          <motion.h2 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            What our students say
          </motion.h2>
          
          <motion.div
            className="mt-3 mx-auto h-1 w-20 bg-primary/30 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <motion.div 
          className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 hover:border-primary/30 shadow-lg transition-all duration-500 overflow-hidden group relative h-full">
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated accent */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 bg-slate-700/20 rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                />
                
                <CardContent className="p-8 relative">
                  <motion.div 
                    className="absolute -top-2 left-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <svg className="h-10 w-10 text-primary opacity-30" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path>
                    </svg>
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-300 mb-8 pt-6 relative z-10 group-hover:text-white transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    "{testimonial.quote}"
                  </motion.p>
                  
                  {/* Animated floating accents */}
                  {hoveredCard === index && (
                    <motion.div 
                      className="absolute bottom-16 right-4"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <div className="flex space-x-1">
                        {icons.map((icon, i) => (
                          <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-1 bg-slate-800/70 backdrop-blur-sm rounded-full"
                          >
                            {icon}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="flex items-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-1000"
                        animate={hoveredCard === index ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                      <Avatar className="h-12 w-12 border-2 border-white/10 relative">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary text-white">{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-4">
                      <motion.h4 
                        className="text-base font-semibold text-white"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {testimonial.name}
                      </motion.h4>
                      <motion.p 
                        className="text-sm text-primary"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {testimonial.title}
                      </motion.p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
