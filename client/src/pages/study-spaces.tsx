import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, MapPin, Users, Wifi, Coffee, Clock, Monitor, Loader2, Check } from "lucide-react";
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { format } from "date-fns";

// Mock study spaces data with Bangalore areas
const studySpaces = [
  {
    id: 1,
    name: "InnovatorsLab Study Hub",
    description: "A quiet space with individual study cubicles and high-speed internet.",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
    location: "Koramangala",
    price: "₹150/hour",
    capacity: "50 people",
    amenities: ["Wi-Fi", "Power Outlets", "Coffee Shop", "Air Conditioning", "Computers"],
    availability: "Available",
    rating: "4.8",
    reviews: 126,
  },
  {
    id: 2,
    name: "TechHub Co-working Space",
    description: "Modern co-working space ideal for group projects and collaborative learning.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
    location: "Indiranagar",
    price: "₹150/hour",
    capacity: "30 people",
    amenities: ["Wi-Fi", "Power Outlets", "Coffee Shop", "Whiteboards", "Projector"],
    availability: "Limited Seats",
    rating: "4.7",
    reviews: 98,
  },
  {
    id: 3,
    name: "Serene Study Café",
    description: "Calm café environment with dedicated study zones and great coffee.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1147&q=80",
    location: "HSR Layout",
    price: "₹100/hour",
    capacity: "25 people",
    amenities: ["Wi-Fi", "Power Outlets", "Coffee Shop", "Snacks"],
    availability: "Available",
    rating: "4.9",
    reviews: 152,
  },
  {
    id: 4,
    name: "Campus Innovation Center",
    description: "University facility with advanced tech tools and quiet study areas.",
    image: "https://images.unsplash.com/photo-1519155031214-e8d583928bf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    location: "Whitefield",
    price: "₹200/hour",
    capacity: "40 people",
    amenities: ["Wi-Fi", "Power Outlets", "Computers", "Printer", "Technical Support"],
    availability: "Fully Booked",
    rating: "4.6",
    reviews: 87,
  },
  {
    id: 5,
    name: "Mindful Reading Room",
    description: "Traditional library setting with extensive reference materials and silence policy.",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    location: "Jayanagar",
    price: "₹80/hour",
    capacity: "60 people",
    amenities: ["Wi-Fi", "Power Outlets", "Reference Books"],
    availability: "Available",
    rating: "4.5",
    reviews: 64,
  },
  {
    id: 6,
    name: "Creative Commons Space",
    description: "Artistic environment designed to inspire creativity and innovation in projects.",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1025&q=80",
    location: "Electronic City",
    price: "₹180/hour",
    capacity: "35 people",
    amenities: ["Wi-Fi", "Power Outlets", "Art Supplies", "Coffee Shop", "Music"],
    availability: "Limited Seats",
    rating: "4.7",
    reviews: 112,
  }
];

const locations = ["All Locations", "Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Jayanagar", "Electronic City"];
const amenities = ["Wi-Fi", "Power Outlets", "Coffee Shop", "Computers", "Whiteboards", "Reference Books"];

export default function StudySpaces() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState("any");
  
  // Host form state
  const [hostDialogOpen, setHostDialogOpen] = useState(false);
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [hostPhone, setHostPhone] = useState("");
  const [hostLocation, setHostLocation] = useState("");
  const [hostSpaceType, setHostSpaceType] = useState("");
  const [hostDescription, setHostDescription] = useState("");
  const [hostCapacity, setHostCapacity] = useState("");
  const [hostPrice, setHostPrice] = useState("");
  const [hostAmenities, setHostAmenities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Toggle amenity selection for filtering
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  // Toggle amenity selection for host form
  const toggleHostAmenity = (amenity: string) => {
    if (hostAmenities.includes(amenity)) {
      setHostAmenities(hostAmenities.filter(a => a !== amenity));
    } else {
      setHostAmenities([...hostAmenities, amenity]);
    }
  };
  
  // Handle host form submission
  const handleHostSubmit = () => {
    // Form validation
    if (!hostName || !hostEmail || !hostPhone || !hostLocation || 
        !hostSpaceType || !hostDescription || !hostCapacity || !hostPrice) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after showing success state
      setTimeout(() => {
        setHostDialogOpen(false);
        setShowSuccess(false);
        
        // Clear form fields
        setHostName("");
        setHostEmail("");
        setHostPhone("");
        setHostLocation("");
        setHostSpaceType("");
        setHostDescription("");
        setHostCapacity("");
        setHostPrice("");
        setHostAmenities([]);
        
        toast({
          title: "Success!",
          description: "Your space has been submitted for review. We'll contact you soon.",
        });
      }, 2000);
    }, 1500);
  };

  // Filter study spaces based on search, location, amenities, and availability
  const filteredSpaces = studySpaces.filter((space) => {
    // Filter by search term
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        space.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by location
    const matchesLocation = selectedLocation === "All Locations" || space.location === selectedLocation;
    
    // Filter by amenities
    const matchesAmenities = selectedAmenities.length === 0 || 
                          selectedAmenities.every(amenity => space.amenities.includes(amenity));
    
    // Filter by availability
    const matchesAvailability = availabilityFilter === "all" || 
                              (availabilityFilter === "available" && space.availability === "Available");
    
    return matchesSearch && matchesLocation && matchesAmenities && matchesAvailability;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Find your ideal study space</h1>
          <p className="mt-3 text-lg text-blue-100 max-w-2xl mx-auto">
            Book quiet, equipped spaces to maximize your productivity and learning
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                className="pl-10"
                placeholder="Search for study spaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-[180px]">
                <MapPin className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-[210px] justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Time</SelectItem>
                <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12PM-4PM)</SelectItem>
                <SelectItem value="evening">Evening (4PM-8PM)</SelectItem>
                <SelectItem value="night">Night (8PM-12AM)</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="w-full md:w-auto">Search</Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-2">Availability</h4>
                  <div className="flex gap-2">
                    <Button 
                      variant={availabilityFilter === "all" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setAvailabilityFilter("all")}
                    >
                      All
                    </Button>
                    <Button 
                      variant={availabilityFilter === "available" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setAvailabilityFilter("available")}
                    >
                      Available Now
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Amenities</h4>
                  <div className="space-y-2">
                    {amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <Button 
                          variant={selectedAmenities.includes(amenity) ? "default" : "outline"} 
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => toggleAmenity(amenity)}
                        >
                          {amenity === "Wi-Fi" && <Wifi className="mr-2 h-4 w-4" />}
                          {amenity === "Coffee Shop" && <Coffee className="mr-2 h-4 w-4" />}
                          {amenity === "Computers" && <Monitor className="mr-2 h-4 w-4" />}
                          {!["Wi-Fi", "Coffee Shop", "Computers"].includes(amenity) && 
                            <div className="w-4 h-4 mr-2" />}
                          {amenity}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSpaces.map((space) => (
                  <Card key={space.id} className="overflow-hidden hover:shadow-md transition">
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={space.image} 
                        alt={space.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <Badge 
                          variant={space.availability === "Available" ? "outline" : "secondary"}
                          className={space.availability === "Available" 
                            ? "border-green-500 text-green-600" 
                            : space.availability === "Limited Seats"
                              ? "bg-amber-100 text-amber-600 border-amber-200"
                              : "bg-gray-200 text-gray-600"}
                        >
                          {space.availability}
                        </Badge>
                        <div className="flex items-center">
                          <span className="font-semibold text-amber-500">{space.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({space.reviews})</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{space.name}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {space.location}
                        <Users className="h-4 w-4 ml-4 mr-1" />
                        {space.capacity}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{space.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {space.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-primary border-blue-200">
                            {amenity}
                          </Badge>
                        ))}
                        {space.amenities.length > 3 && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                            +{space.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-bold">{space.price}</span>
                        <Button disabled={space.availability === "Fully Booked"}>
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredSpaces.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900">No study spaces found</h3>
                  <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Do you have a space to share?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              List your space on SkillSpace and earn money by renting it out to students and learners.
            </p>
            <Dialog open={hostDialogOpen} onOpenChange={setHostDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">Become a Host</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                {!showSuccess ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>List your study space</DialogTitle>
                      <DialogDescription>
                        Fill in the details about your space. We'll review your submission and contact you soon.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={hostName}
                          onChange={(e) => setHostName(e.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={hostEmail}
                          onChange={(e) => setHostEmail(e.target.value)}
                          placeholder="Your email address"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={hostPhone}
                          onChange={(e) => setHostPhone(e.target.value)}
                          placeholder="Your phone number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Space Location</Label>
                        <Select value={hostLocation} onValueChange={setHostLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.slice(1).map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="type">Space Type</Label>
                        <Select value={hostSpaceType} onValueChange={setHostSpaceType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="library">Library</SelectItem>
                            <SelectItem value="cafe">Café</SelectItem>
                            <SelectItem value="coworking">Co-working Space</SelectItem>
                            <SelectItem value="classroom">Classroom</SelectItem>
                            <SelectItem value="conference">Conference Room</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input 
                          id="capacity" 
                          value={hostCapacity}
                          onChange={(e) => setHostCapacity(e.target.value)}
                          placeholder="Number of people (e.g., 20)"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price per Hour (₹)</Label>
                        <Input 
                          id="price" 
                          value={hostPrice}
                          onChange={(e) => setHostPrice(e.target.value)}
                          placeholder="Amount in Rupees"
                        />
                      </div>
                      
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="description">Space Description</Label>
                        <Textarea 
                          id="description" 
                          value={hostDescription}
                          onChange={(e) => setHostDescription(e.target.value)}
                          placeholder="Describe your space in detail"
                          rows={4}
                        />
                      </div>
                      
                      <div className="col-span-2 space-y-2">
                        <Label>Amenities Available</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                          {amenities.map((amenity) => (
                            <Button 
                              key={amenity}
                              type="button"
                              variant={hostAmenities.includes(amenity) ? "default" : "outline"} 
                              size="sm"
                              className="justify-start"
                              onClick={() => toggleHostAmenity(amenity)}
                            >
                              {amenity === "Wi-Fi" && <Wifi className="mr-2 h-4 w-4" />}
                              {amenity === "Coffee Shop" && <Coffee className="mr-2 h-4 w-4" />}
                              {amenity === "Computers" && <Monitor className="mr-2 h-4 w-4" />}
                              {!["Wi-Fi", "Coffee Shop", "Computers"].includes(amenity) && 
                                <div className="w-4 h-4 mr-2" />}
                              {amenity}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={handleHostSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </DialogFooter>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>
                    <p className="text-gray-600 mb-6">
                      Thank you for your interest in hosting a study space. Our team will review your application and contact you shortly.
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}