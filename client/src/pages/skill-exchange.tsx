import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, Plus, Repeat, MessageSquare } from "lucide-react";
import Navbar from "@/components/home-page/Navbar";
import Footer from "@/components/home-page/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Mock skill exchange listings
const skillExchangeListings = [
  {
    id: 1,
    user: {
      name: "Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      rating: 4.8,
      reviews: 12
    },
    offering: ["Python Programming", "Data Analysis"],
    seeking: ["UI/UX Design", "Graphic Design"],
    description: "I'm a data scientist with 3 years of experience in Python and data analysis. Looking to exchange my skills for design expertise to improve my portfolio projects.",
    timeCommitment: "2-3 hours/week",
    experienceLevel: "Intermediate",
    createdAt: "2 days ago"
  },
  {
    id: 2,
    user: {
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      rating: 4.9,
      reviews: 21
    },
    offering: ["Digital Marketing", "Content Writing"],
    seeking: ["Web Development", "SEO Optimization"],
    description: "Marketing professional offering content creation and digital marketing strategy in exchange for help building my personal website and improving its SEO.",
    timeCommitment: "4-5 hours/week",
    experienceLevel: "Advanced",
    createdAt: "5 days ago"
  },
  {
    id: 3,
    user: {
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      rating: 4.7,
      reviews: 9
    },
    offering: ["Mobile App Development", "React Native"],
    seeking: ["UI/UX Design", "Product Management"],
    description: "I can develop mobile apps using React Native. Looking for someone who can help with UI design and product roadmap planning for my upcoming project.",
    timeCommitment: "5-6 hours/week",
    experienceLevel: "Advanced",
    createdAt: "1 week ago"
  },
  {
    id: 4,
    user: {
      name: "Neha Gupta",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      rating: 4.6,
      reviews: 7
    },
    offering: ["Graphic Design", "Brand Identity"],
    seeking: ["Social Media Marketing", "Content Strategy"],
    description: "Graphic designer with expertise in brand identity creation. Looking to exchange my design skills for help with social media marketing for my design business.",
    timeCommitment: "3-4 hours/week",
    experienceLevel: "Intermediate",
    createdAt: "3 days ago"
  },
  {
    id: 5,
    user: {
      name: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      rating: 4.9,
      reviews: 18
    },
    offering: ["Financial Analysis", "Investment Planning"],
    seeking: ["Website Development", "Video Editing"],
    description: "Finance professional offering financial analysis and investment planning advice. Looking for help with personal website development and creating educational videos.",
    timeCommitment: "2-3 hours/week",
    experienceLevel: "Advanced",
    createdAt: "1 day ago"
  },
  {
    id: 6,
    user: {
      name: "Ananya Desai",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      rating: 4.8,
      reviews: 15
    },
    offering: ["English Language Teaching", "Content Editing"],
    seeking: ["Photography", "Basic Coding"],
    description: "English language teacher offering language tutoring and content editing. Looking to learn photography and basic coding for a personal project.",
    timeCommitment: "4-5 hours/week",
    experienceLevel: "Beginner (seeking), Advanced (offering)",
    createdAt: "6 days ago"
  }
];

const skillCategories = [
  "All Categories",
  "Programming & Development",
  "Design & Creative",
  "Marketing & Sales",
  "Writing & Translation",
  "Finance & Accounting",
  "Education & Teaching",
  "Video & Animation",
  "Music & Audio",
  "Business & Entrepreneurship"
];

export default function SkillExchange() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTab, setSelectedTab] = useState("offerings");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // New listing form state
  const [newOffering, setNewOffering] = useState<string[]>([]);
  const [newSeeking, setNewSeeking] = useState<string[]>([]);
  const [newDescription, setNewDescription] = useState("");
  const [newTimeCommitment, setNewTimeCommitment] = useState("");
  const [newExperienceLevel, setNewExperienceLevel] = useState("");

  // Handle adding skills to offering/seeking
  const [currentSkill, setCurrentSkill] = useState("");
  
  const handleAddSkill = (type: 'offering' | 'seeking') => {
    if (!currentSkill.trim()) return;
    
    if (type === 'offering') {
      setNewOffering([...newOffering, currentSkill]);
    } else {
      setNewSeeking([...newSeeking, currentSkill]);
    }
    setCurrentSkill("");
  };

  const handleRemoveSkill = (type: 'offering' | 'seeking', index: number) => {
    if (type === 'offering') {
      setNewOffering(newOffering.filter((_, i) => i !== index));
    } else {
      setNewSeeking(newSeeking.filter((_, i) => i !== index));
    }
  };

  const handleCreateListing = () => {
    // In a real app, this would send data to the backend
    console.log("Creating new listing:", {
      offering: newOffering,
      seeking: newSeeking,
      description: newDescription,
      timeCommitment: newTimeCommitment,
      experienceLevel: newExperienceLevel
    });
    
    // Reset form
    setNewOffering([]);
    setNewSeeking([]);
    setNewDescription("");
    setNewTimeCommitment("");
    setNewExperienceLevel("");
    setCreateDialogOpen(false);
  };

  // Filter listings based on search and category
  const filteredListings = skillExchangeListings.filter((listing) => {
    // Filter by search term
    const matchesSearch = listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        listing.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        listing.offering.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        listing.seeking.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by category
    const matchesCategory = selectedCategory === "All Categories" || (
      selectedTab === "offerings" 
        ? listing.offering.some(skill => skill.includes(selectedCategory.replace(' & ', ' ')))
        : listing.seeking.some(skill => skill.includes(selectedCategory.replace(' & ', ' ')))
    );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Skill Exchange Marketplace</h1>
          <p className="mt-3 text-lg text-blue-100 max-w-2xl mx-auto">
            Exchange your expertise with others in our collaborative learning community
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                className="pl-10"
                placeholder="Search skills, descriptions, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Listing
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create Skill Exchange Listing</DialogTitle>
                  <DialogDescription>
                    List the skills you're offering and what you're looking to learn in exchange.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Skills You're Offering</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill you can teach"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                      />
                      <Button type="button" onClick={() => handleAddSkill('offering')}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newOffering.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill('offering', index)}
                            className="ml-1 h-3 w-3 rounded-full"
                          >
                            ✕
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Skills You're Seeking</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill you want to learn"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                      />
                      <Button type="button" onClick={() => handleAddSkill('seeking')}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newSeeking.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill('seeking', index)}
                            className="ml-1 h-3 w-3 rounded-full"
                          >
                            ✕
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your experience and what you're looking to exchange"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time-commitment">Time Commitment</Label>
                      <Select value={newTimeCommitment} onValueChange={setNewTimeCommitment}>
                        <SelectTrigger id="time-commitment">
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2 hours/week">1-2 hours/week</SelectItem>
                          <SelectItem value="2-3 hours/week">2-3 hours/week</SelectItem>
                          <SelectItem value="3-4 hours/week">3-4 hours/week</SelectItem>
                          <SelectItem value="4-5 hours/week">4-5 hours/week</SelectItem>
                          <SelectItem value="5+ hours/week">5+ hours/week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience-level">Experience Level</Label>
                      <Select value={newExperienceLevel} onValueChange={setNewExperienceLevel}>
                        <SelectTrigger id="experience-level">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" onClick={handleCreateListing}>Create Listing</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Browse By</h3>
                
                <Tabs defaultValue="offerings" value={selectedTab} onValueChange={setSelectedTab} className="w-full mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="offerings">Offerings</TabsTrigger>
                    <TabsTrigger value="seeking">Seeking</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Categories</h4>
                  <div className="space-y-1">
                    {skillCategories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        className="w-full justify-start font-normal"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <h3 className="font-semibold text-lg mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Plus className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-sm">Create a listing</h4>
                      <p className="text-sm text-gray-600">Share what you can offer and what you're looking to learn</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-sm">Connect with others</h4>
                      <p className="text-sm text-gray-600">Message potential exchange partners to discuss details</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Repeat className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-sm">Exchange skills</h4>
                      <p className="text-sm text-gray-600">Schedule sessions to teach and learn from each other</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedTab === "offerings" ? "Skills Being Offered" : "Skills Being Sought"}
                </h2>
                <p className="text-gray-600">
                  Browse listings where people are {selectedTab === "offerings" ? "offering" : "seeking"} skills in {selectedCategory === "All Categories" ? "all categories" : selectedCategory}
                </p>
              </div>
              
              <div className="space-y-6">
                {filteredListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-md transition">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={listing.user.avatar} alt={listing.user.name} />
                              <AvatarFallback>{listing.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-2 font-semibold">{listing.user.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className="text-amber-500 font-semibold">{listing.user.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">({listing.user.reviews})</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Posted {listing.createdAt}</p>
                          </div>
                        </div>
                        
                        <div className="md:w-3/4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold flex items-center text-gray-900">
                                <span className="bg-green-100 p-1 rounded text-green-600 mr-2">
                                  <Plus className="h-4 w-4" />
                                </span>
                                Offering
                              </h4>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {listing.offering.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-700">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold flex items-center text-gray-900">
                                <span className="bg-blue-100 p-1 rounded text-blue-600 mr-2">
                                  <Repeat className="h-4 w-4" />
                                </span>
                                Seeking
                              </h4>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {listing.seeking.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200 text-primary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{listing.description}</p>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <span className="font-medium">Time Commitment:</span>
                              <span className="ml-1">{listing.timeCommitment}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">Experience Level:</span>
                              <span className="ml-1">{listing.experienceLevel}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 px-6 py-3 flex justify-end">
                      <Button>Contact to Exchange</Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredListings.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900">No listings found</h3>
                    <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
                    <Button variant="outline" className="mt-4" onClick={() => setCreateDialogOpen(true)}>
                      Create a New Listing
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Skill Exchange Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our community members have been successfully exchanging skills and growing together.
            Here's what they have to say about their experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "I taught digital marketing to a web developer who helped me build my portfolio website. The exchange was extremely valuable for both of us!",
                name: "Meera Joshi",
                role: "Digital Marketer"
              },
              {
                quote: "Through skill exchange, I found a data scientist who taught me Python while I helped him improve his presentation skills. Win-win!",
                name: "Rohan Kapoor",
                role: "Public Speaking Coach"
              },
              {
                quote: "I exchanged my UX design skills for financial literacy coaching. It's amazing how complementary our skills were!",
                name: "Aditya Sharma",
                role: "UX Designer"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="text-left">
                <CardContent className="pt-6">
                  <p className="italic text-gray-600">{testimonial.quote}</p>
                  <div className="mt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}