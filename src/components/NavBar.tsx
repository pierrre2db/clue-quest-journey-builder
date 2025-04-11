
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Settings, Map, ScanLine } from 'lucide-react';
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-4 flex space-x-2 shadow-lg rounded-full bg-background/80 backdrop-blur-sm p-1 z-50">
      <Button
        onClick={() => navigate('/')}
        className="p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors"
        variant="ghost"
        size="icon"
        aria-label="Accueil"
      >
        <Home size={24} />
      </Button>
      <Button
        onClick={() => navigate('/scan')}
        className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
        variant="default"
        size="icon"
        aria-label="Scanner"
      >
        <ScanLine size={24} />
      </Button>
      <Button
        onClick={() => navigate('/navigation')}
        className="p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors"
        variant="ghost"
        size="icon"
        aria-label="Navigation"
      >
        <Map size={24} />
      </Button>
      <Button
        onClick={() => navigate('/setup')}
        className="p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors"
        variant="ghost"
        size="icon"
        aria-label="Paramètres"
      >
        <Settings size={24} />
      </Button>
    </div>
  );
};

export default NavBar;
