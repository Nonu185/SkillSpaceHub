import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Courses from "@/pages/courses";
import Mentors from "@/pages/mentors";
import StudySpaces from "@/pages/study-spaces";
import SkillExchange from "@/pages/skill-exchange";
import About from "@/pages/about";

function Router() {
  return (
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
