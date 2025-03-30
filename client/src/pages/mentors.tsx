import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Linkedin } from "lucide-react";
import Navbar from "@/components/home-page/Navbar";
import Footer from "@/components/home-page/Footer";
import { experts as allMentors } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// Define the mentor type
interface Mentor {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedIn?: string;
  specializations: string[];
  availability: string;
  rating: string;
  reviews: number;
  hourlyRate: string;
}

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

// Default specializations for any mentor not in our predefined list
const defaultSpecializations = ["Machine Learning", "Python", "Data Visualization"];

// Extend the mock data with more mentors and add more fields
const extendedMentors: Mentor[] = allMentors.map((mentor, index) => ({
  ...mentor,
  id: index + 1,
  specializations: Object.keys(mentorSpecializations).includes(mentor.name) 
    ? mentorSpecializations[mentor.name as MentorName] 
    : defaultSpecializations.slice(0, (index % 3) + 1),
  availability: index % 2 === 0 ? "Available" : "Fully Booked",
  rating: (4 + (index % 10) / 10).toFixed(1),
  reviews: 10 + (index * 5),
  hourlyRate: "₹" + (1500 + (index * 200)),
}));

// Create a complete list of all specializations for filtering
const specializations = [
  "All Specializations",
  "Machine Learning",
  "AI Research",
  "Data Science",
  "Full-Stack Development",
  "JavaScript",
  "Cloud Services",
  "Software Architecture",
  "Backend Development", 
  "System Design",
  "UI/UX Design",
  "Product Design",
  "User Research",
  "Product Management",
  "Business Strategy",
  "Market Analysis",
  "Data Analytics",
  "Business Intelligence",
  "Statistical Analysis"
];

export default function Mentors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  // Filter mentors based on search, specialization, and availability
  const filteredMentors = extendedMentors.filter((mentor) => {
    // Filter by search term
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        mentor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by specialization
    const matchesSpecialization = selectedSpecialization === "All Specializations" || 
                                mentor.specializations.includes(selectedSpecialization);
    
    // Filter by availability
    const matchesAvailability = availabilityFilter === "all" || 
                              (availabilityFilter === "available" && mentor.availability === "Available");
    
    return matchesSearch && matchesSpecialization && matchesAvailability;
  }).sort((a, b) => {
    if (sortBy === "rating") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    } else if (sortBy === "price-low-high") {
      return parseFloat(a.hourlyRate.replace("₹", "").replace(",", "")) - 
              parseFloat(b.hourlyRate.replace("₹", "").replace(",", ""));
    } else if (sortBy === "price-high-low") {
      return parseFloat(b.hourlyRate.replace("₹", "").replace(",", "")) - 
              parseFloat(a.hourlyRate.replace("₹", "").replace(",", ""));
    }
    // Default sort by relevance
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Connect with Expert Mentors</h1>
          <p className="mt-3 text-lg text-blue-100 max-w-2xl mx-auto">
            Get personalized guidance from industry professionals to accelerate your career growth
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
                placeholder="Search for mentors by name, expertise, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((specialization) => (
                    <SelectItem key={specialization} value={specialization}>
                      {specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Tabs defaultValue="all" value={availabilityFilter} onValueChange={setAvailabilityFilter} className="w-[220px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="available">Available</TabsTrigger>
                </TabsList>
              </Tabs>
              
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden hover:shadow-md transition">
                <div className="flex justify-between items-center px-5 pt-5">
                  <Badge 
                    variant={mentor.availability === "Available" ? "outline" : "secondary"}
                    className={mentor.availability === "Available" 
                      ? "border-green-500 text-green-600" 
                      : "bg-gray-200 text-gray-600"}
                  >
                    {mentor.availability}
                  </Badge>
                  <div className="flex items-center">
                    <span className="font-semibold text-amber-500">{mentor.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({mentor.reviews})</span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start">
                    <div className="w-1/3">
                      <div className="rounded-full overflow-hidden h-24 w-24 mb-2 border-2 border-primary/20 shadow-md">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-2/3">
                      <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-primary">{mentor.title}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-2">{mentor.hourlyRate}/hour</p>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-600">{mentor.bio}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mentor.specializations.map((specialization, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-primary border-blue-200">
                        {specialization}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    {mentor.linkedIn && (
                      <Button 
                        className="flex-1 flex items-center justify-center gap-2" 
                        onClick={() => window.open(mentor.linkedIn, '_blank')}
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                    )}
                    {!mentor.linkedIn && (
                      <Button className="flex-1">View Profile</Button>
                    )}
                    <Button variant="outline" className="flex-1" disabled={mentor.availability !== "Available"}>
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900">No mentors found</h3>
              <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to become a mentor?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Share your expertise, help others grow, and earn additional income. 
            Join our community of expert mentors.
          </p>
          <Button size="lg">Apply to be a Mentor</Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}