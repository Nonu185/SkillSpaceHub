import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function CallToAction() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed to newsletter");
  };

  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to boost your skills?
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-blue-100">
              Join SkillSpace today and get access to expert-led courses, personalized mentorship, study spaces, and skill exchange opportunities.
            </p>
            <div className="mt-8 flex">
              <Link href="/register">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="ml-3 text-white hover:bg-blue-700 border border-white">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <Card className="shadow-xl">
              <CardContent className="px-6 py-8 sm:px-10 sm:py-10">
                <h3 className="text-lg font-medium text-gray-900">Sign up for our newsletter</h3>
                <p className="mt-1 text-sm text-gray-600">Get the latest updates on new courses, mentors, and special offers.</p>
                <form className="mt-6" onSubmit={handleSubscribe}>
                  <div className="flex">
                    <div className="flex-1">
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="block w-full px-4 py-3" 
                        required
                      />
                    </div>
                    <div className="ml-3">
                      <Button type="submit">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-xs text-gray-600">We respect your privacy. Unsubscribe at any time.</p>
                <Link href="/about">
                  <span className="text-xs text-primary font-medium cursor-pointer">Privacy Policy</span>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
