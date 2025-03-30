import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/home-page/Navbar";
import Footer from "@/components/home-page/Footer";
import { BookOpen, Users, Briefcase, Award, Clock, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">About SkillSpace</h1>
              <p className="text-xl text-blue-100 mb-6">
                SkillSpace is a comprehensive education platform that connects learners
                with expert-led courses, personalized mentorship, collaborative study spaces,
                and skill exchange opportunities.
              </p>
              <Button variant="secondary" size="lg">Join Our Community</Button>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-400 opacity-50 rounded-lg transform -rotate-6"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-800 opacity-50 rounded-lg transform rotate-6"></div>
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80" 
                  alt="Students collaborating" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize education by creating an ecosystem where knowledge sharing
              is accessible, collaborative, and tailored to each individual's learning journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-10 w-10 text-primary" />,
                title: "Quality Education",
                description: "We curate expert-led courses that focus on practical skills and real-world applications."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Community Learning",
                description: "We believe in the power of collaborative learning and peer-to-peer knowledge exchange."
              },
              {
                icon: <Award className="h-10 w-10 text-primary" />,
                title: "Career Growth",
                description: "We're committed to helping our members achieve their professional goals and aspirations."
              }
            ].map((value, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  SkillSpace was founded in 2023 by a group of educators and technologists who saw a gap in the 
                  online education market. While there were plenty of platforms offering courses, few addressed 
                  the holistic learning experience.
                </p>
                <p className="text-gray-600">
                  We recognized that effective learning requires more than just video lectures. It needs guidance, 
                  community, proper environments, and opportunities to apply knowledge.
                </p>
                <p className="text-gray-600">
                  That's why we built SkillSpace as an integrated platform that combines courses with mentorship, 
                  study spaces, and skill exchange - creating a complete ecosystem for learning and growth.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-gray-600 text-center">Courses</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary">350+</div>
                  <div className="text-gray-600 text-center">Expert Mentors</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-gray-600 text-center">Study Venues</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary">15k+</div>
                  <div className="text-gray-600 text-center">Members</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
                  alt="Team collaborating" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Makes Us Different</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              SkillSpace offers a unique combination of features that create a holistic learning experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BookOpen className="h-6 w-6 text-primary" />,
                title: "Expert-led Courses",
                description: "Courses designed by industry experts with real-world applications."
              },
              {
                icon: <Users className="h-6 w-6 text-primary" />,
                title: "1-on-1 Mentorship",
                description: "Personalized guidance from professionals in your field of interest."
              },
              {
                icon: <Briefcase className="h-6 w-6 text-primary" />,
                title: "Study Spaces",
                description: "Book productive study environments equipped for focused learning."
              },
              {
                icon: <Repeat className="h-6 w-6 text-primary" />,
                title: "Skill Exchange",
                description: "Trade your expertise with others in a collaborative community."
              },
              {
                icon: <Award className="h-6 w-6 text-primary" />,
                title: "Recognized Certificates",
                description: "Earn credentials that are valued by employers and peers."
              },
              {
                icon: <Clock className="h-6 w-6 text-primary" />,
                title: "Flexible Learning",
                description: "Learn at your own pace with resources available 24/7."
              },
              {
                icon: <Globe className="h-6 w-6 text-primary" />,
                title: "Global Community",
                description: "Connect with learners and mentors from around the world."
              },
              {
                icon: <Star className="h-6 w-6 text-primary" />,
                title: "Quality Assurance",
                description: "All courses and mentors are thoroughly vetted for quality."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition">
                <CardContent className="p-0">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Leadership Team</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              Our diverse leadership team brings together expertise from education, technology, and business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Divyansh Rai",
                role: "CEO & Co-founder",
                bio: "Former EdTech executive with a passion for democratizing education.",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
              },
              {
                name: "Dineeth BS",
                role: "CTO & Co-founder",
                bio: "Tech veteran with experience building scalable learning platforms.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80"
              },
              {
                name: "Fidha Mk",
                role: "Chief Product Officer",
                bio: "Former educator focused on creating intuitive learning experiences.",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
              },
              {
                name: "Divya Shree K",
                role: "Chief Learning Officer",
                bio: "Education researcher specializing in adult learning methodologies.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=761&q=80"
              }
            ].map((person, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{person.name}</h3>
                <p className="text-blue-300">{person.role}</p>
                <p className="text-gray-400 text-sm mt-2">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start your learning journey?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg">Join SkillSpace</Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function Repeat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}