import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Flash } from "@/assets/icons";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 lg:w-full">
          <div className="pt-8 sm:pt-12 lg:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Discover your path</span>
                    <span className="block text-primary">to skills mastery</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                    SkillSpace helps you gain practical skills through expert-led courses, real-world projects, and personalized mentorship.
                  </p>
                  <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <Link href="/courses">
                          <Button size="lg" className="w-full md:text-lg md:px-10">
                            Explore Courses
                          </Button>
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link href="/mentors">
                          <Button variant="outline" size="lg" className="w-full md:text-lg md:px-10">
                            Find a Mentor
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                  <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                    <img 
                      className="w-full rounded-lg"
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1172&q=80" 
                      alt="Student working on laptop"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 p-4 rounded-lg shadow-md mx-4">
                        <div className="flex items-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400">
                            <Flash className="h-6 w-6 text-white" />
                          </span>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Success Rate</p>
                            <p className="text-2xl font-bold text-primary">93%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
