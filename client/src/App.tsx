import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Lazy load components
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
const Register = lazy(() => import("@/pages/register"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Courses = lazy(() => import("@/pages/courses"));
const Mentors = lazy(() => import("@/pages/mentors"));
const StudySpaces = lazy(() => import("@/pages/study-spaces"));
const SkillExchange = lazy(() => import("@/pages/skill-exchange"));
const About = lazy(() => import("@/pages/about"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
};

function Router() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/courses" component={Courses}/>
        <Route path="/mentors" component={Mentors}/>
        <Route path="/study-spaces" component={StudySpaces}/>
        <Route path="/skill-exchange" component={SkillExchange}/>
        <Route path="/about" component={About}/>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
