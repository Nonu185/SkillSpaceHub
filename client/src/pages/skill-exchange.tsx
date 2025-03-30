import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Repeat, MessageSquare, Loader2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Message dialog imports
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface User {
  id: number;
  username: string;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  rating: number | null;
  reviewCount: number | null;
}

interface SkillListing {
  id: number;
  userId: number;
  offering: string[];
  seeking: string[];
  description: string;
  timeCommitment: string;
  experienceLevel: string;
  createdAt: string;
  createdAtFormatted?: string;
  user?: User;
}

interface Message {
  id: number;
  listingId: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
  createdAtFormatted?: string;
  read: boolean;
}

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
  const { toast } = useToast();
  
  // State variables for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTab, setSelectedTab] = useState("offerings");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // Current user (normally would come from auth context)
  // For demo, we'll simulate being logged in as Neha
  const currentUser = {
    id: 4,
    name: "Neha Gupta",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
  };

  // New listing form state
  const [newOffering, setNewOffering] = useState<string[]>([]);
  const [newSeeking, setNewSeeking] = useState<string[]>([]);
  const [newDescription, setNewDescription] = useState("");
  const [newTimeCommitment, setNewTimeCommitment] = useState("");
  const [newExperienceLevel, setNewExperienceLevel] = useState("");

  // Message state
  const [messageSheetOpen, setMessageSheetOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<SkillListing | null>(null);
  const [messageText, setMessageText] = useState("");
  
  // Handle adding skills to offering/seeking
  const [currentSkill, setCurrentSkill] = useState("");

  // Fetch all skill listings
  const { data: listings, isLoading, isError } = useQuery<SkillListing[]>({
    queryKey: ['/api/skill-listings'],
    refetchOnWindowFocus: false,
  });
  
  // Create listing mutation
  const createListingMutation = useMutation({
    mutationFn: async (listingData: Omit<SkillListing, 'id' | 'createdAt'>) => {
      return apiRequest(
        'POST',
        '/api/skill-listings',
        listingData
      );
    },
    onSuccess: () => {
      // Show success message
      toast({
        title: "Listing created!",
        description: "Your skill exchange listing has been posted successfully.",
      });
      
      // Reset form and close dialog
      setNewOffering([]);
      setNewSeeking([]);
      setNewDescription("");
      setNewTimeCommitment("");
      setNewExperienceLevel("");
      setCreateDialogOpen(false);
      
      // Refetch listings to show the new one
      queryClient.invalidateQueries({ queryKey: ['/api/skill-listings'] });
    },
    onError: (error) => {
      console.error('Error creating listing:', error);
      toast({
        title: "Error",
        description: "There was a problem creating your listing. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: Omit<Message, 'id' | 'createdAt' | 'read' | 'createdAtFormatted'>) => {
      return apiRequest(
        'POST',
        '/api/skill-messages',
        messageData
      );
    },
    onSuccess: () => {
      // Show success message
      toast({
        title: "Message sent!",
        description: "Your message has been sent successfully.",
      });
      
      // Reset form and close sheet
      setMessageText("");
      setMessageSheetOpen(false);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Add skill to offering or seeking
  const handleAddSkill = (type: 'offering' | 'seeking') => {
    if (!currentSkill.trim()) return;
    
    if (type === 'offering') {
      setNewOffering([...newOffering, currentSkill]);
    } else {
      setNewSeeking([...newSeeking, currentSkill]);
    }
    setCurrentSkill("");
  };

  // Remove skill from offering or seeking
  const handleRemoveSkill = (type: 'offering' | 'seeking', index: number) => {
    if (type === 'offering') {
      setNewOffering(newOffering.filter((_, i) => i !== index));
    } else {
      setNewSeeking(newSeeking.filter((_, i) => i !== index));
    }
  };

  // Create a new listing
  const handleCreateListing = () => {
    // Validate form
    if (newOffering.length === 0) {
      toast({
        title: "Missing information",
        description: "Please add at least one skill you're offering.",
        variant: "destructive",
      });
      return;
    }
    
    if (newSeeking.length === 0) {
      toast({
        title: "Missing information",
        description: "Please add at least one skill you're seeking.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newDescription) {
      toast({
        title: "Missing information",
        description: "Please provide a description of your exchange.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newTimeCommitment) {
      toast({
        title: "Missing information",
        description: "Please select a time commitment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newExperienceLevel) {
      toast({
        title: "Missing information",
        description: "Please select your experience level.",
        variant: "destructive",
      });
      return;
    }
    
    // Use a hardcoded user ID (1) since we're using in-memory storage
    // Create the listing
    createListingMutation.mutate({
      userId: 1, // Using ID 1 for demo purposes since we know this user exists in storage
      offering: newOffering,
      seeking: newSeeking,
      description: newDescription,
      timeCommitment: newTimeCommitment,
      experienceLevel: newExperienceLevel,
    });
  };
  
  // Open message sheet for a listing
  const handleOpenMessageSheet = (listing: SkillListing) => {
    setSelectedListing(listing);
    setMessageSheetOpen(true);
  };
  
  // Send a message to the listing owner
  const handleSendMessage = () => {
    if (!selectedListing || !messageText.trim()) {
      toast({
        title: "Cannot send message",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }
    
    // Use hardcoded user ID for demo purposes
    sendMessageMutation.mutate({
      listingId: selectedListing.id,
      senderId: 2, // Using ID 2 for demo purposes since we know this user exists in storage
      receiverId: selectedListing.userId,
      message: messageText,
    });
  };

  // Filter listings based on search and category
  const filteredListings = listings ? listings.filter((listing) => {
    // Filter by search term
    const matchesSearch = 
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.user?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      listing.offering.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      listing.seeking.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by category
    const matchesCategory = selectedCategory === "All Categories" || (
      selectedTab === "offerings" 
        ? listing.offering.some(skill => skill.includes(selectedCategory.replace(' & ', ' ')))
        : listing.seeking.some(skill => skill.includes(selectedCategory.replace(' & ', ' ')))
    );
    
    return matchesSearch && matchesCategory;
  }) : [];

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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill('offering');
                          }
                        }}
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill('seeking');
                          }
                        }}
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
                  <Button 
                    type="button" 
                    onClick={handleCreateListing}
                    disabled={createListingMutation.isPending}
                  >
                    {createListingMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Listing
                  </Button>
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
              
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              ) : isError ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Error loading listings</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    There was a problem loading the skill exchange listings. Please try refreshing the page.
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/skill-listings'] })}
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden hover:shadow-md transition">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/4">
                            <div className="flex flex-col items-center text-center">
                              <Avatar className="h-20 w-20">
                                <AvatarImage src={listing.user?.avatar || undefined} alt={listing.user?.name || 'User'} />
                                <AvatarFallback>{listing.user?.name?.[0] || 'U'}</AvatarFallback>
                              </Avatar>
                              <h3 className="mt-2 font-semibold">{listing.user?.name || 'Anonymous User'}</h3>
                              <div className="flex items-center mt-1">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1 text-sm text-gray-600">
                                  {(listing.user?.rating || 0) / 10} ({listing.user?.reviewCount || 0} reviews)
                                </span>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-3"
                                onClick={() => handleOpenMessageSheet(listing)}
                                disabled={listing.userId === currentUser.id}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {listing.userId === currentUser.id ? 'Your Listing' : 'Message'}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="md:w-3/4">
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-medium text-lg">{listing.description}</h3>
                                <p className="text-sm text-gray-500 mt-1">Posted {listing.createdAtFormatted}</p>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-500">Offering</h4>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {listing.offering.map((skill, index) => (
                                      <Badge key={index} variant="secondary">{skill}</Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-500">Seeking</h4>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {listing.seeking.map((skill, index) => (
                                      <Badge key={index} variant="outline">{skill}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Time Commitment:</span> {listing.timeCommitment}
                                </div>
                                <div>
                                  <span className="font-medium">Experience Level:</span> {listing.experienceLevel}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredListings.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No listings found</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        We couldn't find any skill exchange listings matching your filters. Try adjusting your search or create your own listing.
                      </p>
                      <Button className="mt-4" onClick={() => setCreateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create a Listing
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Message sheet */}
      <Sheet open={messageSheetOpen} onOpenChange={setMessageSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Message {selectedListing?.user?.name}</SheetTitle>
            <SheetDescription>
              Discuss potential skill exchange details with {selectedListing?.user?.name}.
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 flex flex-col space-y-4 h-[calc(100vh-200px)]">
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-md">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                <p className="text-sm">
                  Hi! I'm interested in your skill exchange listing. Let's discuss how we can help each other.
                </p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Textarea 
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={sendMessageMutation.isPending || !messageText.trim()}
              >
                {sendMessageMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <Footer />
    </div>
  );
}