import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { experts } from "@/data/mockData";
import { Link } from "wouter";

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
        
        <div className="mt-12 grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {experts.map((expert, index) => (
            <Link key={index} href={`/mentors/${index + 1}`} className="block">
              <Card className="overflow-hidden hover:shadow-md transition h-full cursor-pointer">
                <div className="w-full h-56 overflow-hidden">
                  <img 
                    src={expert.image} 
                    alt={`${expert.name} - ${expert.title}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                  <p className="text-sm text-primary">{expert.title}</p>
                  <p className="mt-2 text-sm text-gray-600">{expert.bio}</p>
                  <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-blue-50">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/mentors">
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
