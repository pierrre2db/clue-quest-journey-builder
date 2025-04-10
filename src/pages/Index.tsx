
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection vers la page d'accueil réelle
    navigate("/");
  }, [navigate]);

  // Ce code ne sera jamais exécuté en raison de la redirection dans useEffect,
  // mais nous l'ajoutons pour permettre d'accéder au menu d'administration
  // en accédant directement à /index
  const handleSetupClick = () => {
    navigate("/setup");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={handleSetupClick}
        className="absolute bottom-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors"
        aria-label="Paramètres"
      >
        <Settings size={24} />
      </button>
    </div>
  );
};

export default Index;
