import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import MovieDetail from "@/pages/MovieDetail";
import MovieBooking from "@/pages/MovieBooking";
import EventDetailPage from "@/pages/EventDetail";
import Confirmation from "@/pages/Confirmation";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movie/:id" component={MovieDetail} />
      <Route path="/movie/:id/seats" component={MovieBooking} />
      <Route path="/event/:id" component={EventDetailPage} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
