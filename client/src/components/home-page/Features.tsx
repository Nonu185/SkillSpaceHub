import { BookOpen, Users, Briefcase } from "lucide-react";
import { Link } from "wouter";

const features = [
  {
    icon: <BookOpen className="h-6 w-6 text-white" />,
    title: "Expert-led Courses",
    description: "Access quality courses curated by industry professionals to gain practical skills that matter.",
    href: "/courses"
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Personalized Mentorship",
    description: "Connect with industry mentors who provide guidance and feedback on your learning journey.",
    href: "/mentors"
  },
  {
    icon: <Briefcase className="h-6 w-6 text-white" />,
    title: "Study Space Booking",
    description: "Reserve quiet study venues for individual or group learning sessions to maximize productivity.",
    href: "/study-spaces"
  }
];

export default function Features() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            SkillSpace provides a comprehensive learning ecosystem for your professional growth.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href} className="block">
                <div className="relative border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition cursor-pointer">
                  <div className="absolute top-6 left-6 h-12 w-12 bg-primary rounded-md flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
