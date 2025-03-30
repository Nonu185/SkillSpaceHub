import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experts } from "@/data/mockData";
import { Link } from "wouter";
import { Linkedin } from "lucide-react";

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
  return (
    <section id="mentors" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Mentorship</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet our experts</p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get personalized guidance from industry professionals who are passionate about teaching.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {experts.map((expert, index) => {
            // Get specializations for this mentor
            const specializations = Object.keys(mentorSpecializations).includes(expert.name) 
              ? mentorSpecializations[expert.name as MentorName] 
              : [];
              
            return (
              <Link key={index} to="/mentors" className="block">
                <Card className="overflow-hidden hover:shadow-md transition h-full cursor-pointer">
                  <div className="relative">
                    <div className="w-full h-64 overflow-hidden bg-blue-50">
                      <img 
                        src={expert.image} 
                        alt={`${expert.name} - ${expert.title}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
                      <div className="rounded-full h-28 w-28 overflow-hidden border-4 border-white shadow-md">
                        <img 
                          src={expert.image} 
                          alt={expert.name}
                          loading="lazy"
                          width="112"
                          height="112" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 pt-16 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                    <p className="text-sm text-primary">{expert.title}</p>
                    
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {specializations.slice(0, 2).map((specialization, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-50 text-primary border-blue-200 text-xs">
                          {specialization}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-600 line-clamp-3">{expert.bio}</p>
                    
                    <div className="mt-4 flex gap-2 justify-center">
                      {expert.linkedIn && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-2 border-blue-200 text-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(expert.linkedIn, '_blank');
                          }}
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </Button>
                      )}
                      <Button size="sm" variant="secondary">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/mentors">
            <Button className="inline-flex items-center">
              View All Mentors
              <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
