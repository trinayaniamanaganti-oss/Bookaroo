import { useLocation } from "wouter";
import Header from "@/components/Header";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";

export default function Admin() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8">
        <AdminPanel />

        <div className="text-center mt-8">
          <Button
            variant="outline"
            data-testid="button-back-home-admin"
            onClick={() => setLocation('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
