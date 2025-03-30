import Logo from "@/components/ui/logo";
import { Facebook, Instagram, Twitter } from "lucide-react";

const footerColumns = [
  {
    title: "Courses",
    links: [
      { label: "Data Science", href: "#" },
      { label: "Programming", href: "#" },
      { label: "Business", href: "#" },
      { label: "Design", href: "#" },
      { label: "Marketing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Partnerships", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: <Facebook className="h-6 w-6" />, label: "Facebook", href: "#" },
  { icon: <Instagram className="h-6 w-6" />, label: "Instagram", href: "#" },
  { icon: <Twitter className="h-6 w-6" />, label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-2 text-xl font-bold">Skill<span className="text-blue-400">Space</span></span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              SkillSpace is your all-in-one platform for learning, connecting with mentors, finding study spaces, and exchanging skills.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((socialLink, index) => (
                <a 
                  key={index} 
                  href={socialLink.href} 
                  className="text-gray-400 hover:text-white"
                  aria-label={socialLink.label}
                >
                  {socialLink.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold uppercase tracking-wider">{column.title}</h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-400 hover:text-white text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">© {new Date().getFullYear()} SkillSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
