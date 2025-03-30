import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Filter } from "lucide-react";
import Navbar from "@/components/home-page/Navbar";
import Footer from "@/components/home-page/Footer";
import { courses as allCourses } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  "All Categories",
  "Data Science",
  "Programming",
  "Business",
  "Design",
  "Marketing",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("relevance");

  // Filter courses based on search, category, and level
  const filteredCourses = allCourses
    .concat(allCourses)
    .concat(allCourses) // Just to have more courses for the demo
    .filter((course) => {
      // Filter by search term
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
      
      // Filter by level
      const matchesLevel = selectedLevel === "All Levels" || course.level.includes(selectedLevel);
      
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === "price-low-high") {
        return parseFloat(a.price.replace("₹", "").replace(",", "")) - 
               parseFloat(b.price.replace("₹", "").replace(",", ""));
      } else if (sortBy === "price-high-low") {
        return parseFloat(b.price.replace("₹", "").replace(",", "")) - 
               parseFloat(a.price.replace("₹", "").replace(",", ""));
      } else if (sortBy === "rating") {
        return parseFloat(b.rating) - parseFloat(a.rating);
      }
      // Default sort by relevance (no change)
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Find your perfect course</h1>
          <p className="mt-3 text-lg text-blue-100 max-w-2xl mx-auto">
            Browse our expert-led courses to gain practical skills for your career
          </p>
        </div>
      </div>
      
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                className="pl-10"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition">
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-primary hover:bg-blue-100">
                      {course.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">{course.price}</span>
                    <span className="text-xs text-gray-500">{course.duration} • {course.level}</span>
                  </div>
                  <Button className="mt-4 w-full">View Course</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900">No courses found</h3>
              <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-lg p-6 shadow-sm">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do SkillSpace courses work?</AccordionTrigger>
                <AccordionContent>
                  SkillSpace courses are designed with a hands-on approach. Each course includes video lectures, 
                  practical assignments, quizzes, and projects. You'll also have access to mentorship sessions 
                  and a community of fellow learners for collaboration.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do I get a certificate after completing a course?</AccordionTrigger>
                <AccordionContent>
                  Yes, upon successful completion of a course, you'll receive a digital certificate 
                  that you can share on your professional networks like LinkedIn. Some advanced 
                  courses also offer industry-recognized certifications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I access the course materials after completion?</AccordionTrigger>
                <AccordionContent>
                  Yes, you get lifetime access to all course materials after enrollment. This includes 
                  any future updates to the course content as well, ensuring you always have access 
                  to the most current information.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What if I'm not satisfied with a course?</AccordionTrigger>
                <AccordionContent>
                  We offer a 7-day money-back guarantee for all our courses. If you're not satisfied 
                  with the course content, you can request a full refund within 7 days of enrollment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}