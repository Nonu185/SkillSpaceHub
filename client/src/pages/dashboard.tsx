import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/home-page/Navbar";
import Footer from "@/components/home-page/Footer";
import { BookOpen, Calendar, Award, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h1>
            <p className="text-lg text-gray-600 mt-2">Track your progress and manage your learning journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-gray-500">2 in progress, 1 completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-gray-500">Next session in 3 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                <Award className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-gray-500">Data Science Fundamentals</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Learning Progress</CardTitle>
                  <CardDescription>Continue where you left off</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Data Science & Machine Learning Bootcamp",
                        progress: 65,
                        timeLeft: "3 hours left",
                      },
                      {
                        title: "Full-Stack Web Development",
                        progress: 32,
                        timeLeft: "8 hours left",
                      },
                      {
                        title: "UI/UX Design Fundamentals",
                        progress: 100,
                        timeLeft: "Completed",
                      },
                    ].map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{course.title}</p>
                          <p className="text-sm text-gray-500">{course.progress}%</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              course.progress === 100 ? "bg-green-500" : "bg-primary"
                            }`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">{course.timeLeft}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Mentoring Sessions</CardTitle>
                  <CardDescription>Your scheduled sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        mentor: "John Smith",
                        topic: "Data Analysis Techniques",
                        date: "March 25, 2025",
                        time: "10:00 AM",
                      },
                      {
                        mentor: "Sarah Johnson",
                        topic: "UX Design Review",
                        date: "April 2, 2025",
                        time: "2:00 PM",
                      },
                    ].map((session, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="font-medium">{session.topic}</div>
                        <div className="text-sm text-gray-500">with {session.mentor}</div>
                        <div className="mt-2 text-xs text-gray-500">
                          {session.date} at {session.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => setLocation("/courses")}>
              Browse More Courses
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}