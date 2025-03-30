import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { courses } from "@/data/mockData";
import { Link } from "wouter";

const categories = [
  "Data Science",
  "Programming",
  "Business",
  "Design",
  "Marketing",
  "View All"
];

export default function CourseCategories() {
  return (
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Categories</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Find your perfect program</p>
        </div>
        
        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                href={index === categories.length - 1 
                  ? "/courses" 
                  : `/courses?category=${encodeURIComponent(category)}`}
              >
                <Button
                  variant={index === categories.length - 1 ? "default" : "outline"}
                  className={index === categories.length - 1 ? "rounded-full" : "rounded-full bg-white text-gray-700"}
                >
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-4 md:grid-cols-2">
          {courses.map((course, index) => (
            <Link key={index} href={`/courses/${index + 1}`} className="block">
              <Card className="overflow-hidden hover:shadow-md transition h-full cursor-pointer">
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/courses">
            <Button className="inline-flex items-center">
              View All Courses
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
