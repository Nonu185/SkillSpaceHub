import { useState, useEffect } from "react";
import { Link } from "wouter";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Search, User, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  {
    label: "Courses",
    dropdown: [
      { label: "Data Science", href: "/courses?category=Data%20Science" },
      { label: "Programming", href: "/courses?category=Programming" },
      { label: "Business", href: "/courses?category=Business" },
      { label: "Design", href: "/courses?category=Design" },
    ],
  },
  { label: "Find Mentors", href: "/mentors" },
  { label: "Study Spaces", href: "/study-spaces" },
  { label: "Skill Exchange", href: "/skill-exchange" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const renderDropdownIndicator = (isHovered: boolean) => (
    <motion.div
      animate={{ rotate: isHovered ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <ChevronDown className="ml-1 h-4 w-4" />
    </motion.div>
  );

  return (
    <motion.nav 
      className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
        scrolled 
          ? "bg-slate-900/90 shadow-lg shadow-primary/5" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div onClick={() => window.location.href = '/'} className="cursor-pointer">
              <Logo />
            </div>
          </motion.div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
            {navItems.map((item, index) => (
              item.dropdown ? (
                <DropdownMenu key={index} onOpenChange={(open) => {
                  if (open) setHoveredItem(index);
                  else if (hoveredItem === index) setHoveredItem(null);
                }}>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      onHoverStart={() => setHoveredItem(index)}
                      onHoverEnd={() => setHoveredItem(null)}
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <Button 
                        variant="ghost" 
                        className={`px-3 py-2 text-sm font-medium flex items-center ${
                          scrolled ? "text-white hover:text-primary/90" : "text-gray-700 hover:text-primary"
                        }`}
                      >
                        {item.label}
                        {renderDropdownIndicator(hoveredItem === index)}
                      </Button>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredItem === index ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </DropdownMenuTrigger>
                  <AnimatePresence>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-48 bg-slate-900/95 backdrop-blur-xl border border-gray-800 shadow-lg shadow-primary/10 p-1 rounded-lg text-white"
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link key={dropdownIndex} href={dropdownItem.href}>
                          <motion.div
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                            className="px-2 py-2 rounded-md"
                          >
                            <DropdownMenuItem className="w-full cursor-pointer focus:bg-primary/20 text-gray-200 hover:text-white">
                              {dropdownItem.label}
                            </DropdownMenuItem>
                          </motion.div>
                        </Link>
                      ))}
                    </DropdownMenuContent>
                  </AnimatePresence>
                </DropdownMenu>
              ) : (
                <motion.div
                  key={index}
                  className="relative"
                  onHoverStart={() => setHoveredItem(index)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button 
                    variant="ghost" 
                    className={`px-3 py-2 text-sm font-medium ${
                      scrolled ? "text-white hover:text-primary/90" : "text-gray-700 hover:text-primary"
                    }`}
                    onClick={() => window.location.href = item.href || "#"}
                  >
                    {item.label}
                  </Button>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredItem === index ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              )
            ))}
          </div>

          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="icon"
                className={`rounded-full mr-2 ${scrolled ? "text-white hover:bg-slate-800" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                className={`${scrolled ? "text-white hover:bg-slate-800" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => window.location.href = '/login'}
              >
                <User className="h-4 w-4 mr-2" />
                Log in
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="default" 
                className="ml-3 bg-gradient-to-r from-primary to-indigo-600 hover:shadow-lg hover:shadow-primary/20 transition-all"
                onClick={() => window.location.href = '/register'}
              >
                <Zap className="h-4 w-4 mr-2" />
                Register
              </Button>
            </motion.div>

            <div className="ml-4 md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      aria-label="Menu"
                      className={scrolled ? "text-white hover:bg-slate-800" : ""}
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-[300px] sm:w-[400px] bg-slate-900 text-white border-gray-800"
                >
                  <div className="py-4">
                    <div className="space-y-6">
                      {navItems.map((item, i) => (
                        <div key={i} className="px-4">
                          {item.dropdown ? (
                            <div className="space-y-3">
                              <motion.div 
                                className="font-medium text-lg text-white"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                {item.label}
                              </motion.div>
                              <div className="pl-4 space-y-3">
                                {item.dropdown.map((subItem, subI) => (
                                  <motion.div 
                                    key={subI} 
                                    className="block text-sm text-gray-300 hover:text-primary cursor-pointer"
                                    onClick={() => window.location.href = subItem.href}
                                    whileHover={{ x: 5, color: "#3b82f6" }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                  >
                                    {subItem.label}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <motion.div 
                              className="block font-medium text-lg text-white hover:text-primary cursor-pointer"
                              onClick={() => window.location.href = item.href || "#"}
                              whileHover={{ x: 5, color: "#3b82f6" }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {item.label}
                            </motion.div>
                          )}
                        </div>
                      ))}
                      <div className="px-4 pt-6 flex flex-col space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full border-gray-700 hover:bg-gray-800"
                          onClick={() => window.location.href = '/login'}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Log in
                        </Button>
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-indigo-600"
                          onClick={() => window.location.href = '/register'}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
