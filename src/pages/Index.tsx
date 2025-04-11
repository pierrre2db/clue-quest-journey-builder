
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAppMode } from "@/utils/localStorage";
import NavBar from "@/components/NavBar";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si un mode a déjà été sélectionné
    const appMode = getAppMode();
    
    if (appMode) {
      // Si un mode est déjà sélectionné, redirection vers la page d'accueil réelle
      navigate("/home", { replace: true });
    } else {
      // Sinon, redirection vers la page de sélection de mode
      navigate("/mode-selection", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-center text-lg">Chargement...</p>
      <NavBar />
    </div>
  );
};

export default Index;
