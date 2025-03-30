import { useState } from "react";
import { Link } from "wouter";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  {
    label: "Courses",
    dropdown: [
      { label: "Data Science", href: "#" },
      { label: "Programming", href: "#" },
      { label: "Business", href: "#" },
      { label: "Design", href: "#" },
    ],
  },
  { label: "Find Mentors", href: "#" },
  { label: "Study Spaces", href: "#" },
  { label: "Skill Exchange", href: "#" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    console.log("Login clicked");
  };

  const handleRegister = () => {
    console.log("Register clicked");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {navItems.map((item, index) => (
              item.dropdown ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary flex items-center">
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <DropdownMenuItem key={dropdownIndex} asChild>
                        <Link href={dropdownItem.href} className="w-full">
                          {dropdownItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={index} href={item.href || "#"}>
                  <Button variant="ghost" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
                    {item.label}
                  </Button>
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center">
            <Button variant="ghost" className="text-primary" onClick={handleLogin}>
              Log in
            </Button>
            <Button variant="default" className="ml-3" onClick={handleRegister}>
              Register
            </Button>

            <div className="ml-4 md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <div className="space-y-4">
                      {navItems.map((item, i) => (
                        <div key={i} className="px-4">
                          {item.dropdown ? (
                            <div className="space-y-2">
                              <div className="font-medium">{item.label}</div>
                              <div className="pl-4 space-y-2">
                                {item.dropdown.map((subItem, subI) => (
                                  <Link key={subI} href={subItem.href} className="block text-sm hover:text-primary">
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link href={item.href || "#"} className="block font-medium hover:text-primary">
                              {item.label}
                            </Link>
                          )}
                        </div>
                      ))}
                      <div className="px-4 pt-4 flex flex-col space-y-2">
                        <Button variant="outline" className="w-full" onClick={handleLogin}>
                          Log in
                        </Button>
                        <Button className="w-full" onClick={handleRegister}>
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
