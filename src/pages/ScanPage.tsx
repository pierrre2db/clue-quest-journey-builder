
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestLogo from '@/components/QuestLogo';
import QRScanner from '@/components/QRScanner';
import { Button } from "@/components/ui/button";
import { getUser } from '@/utils/localStorage';

const ScanPage = () => {
  const navigate = useNavigate();
  const user = getUser();

  // Si l'utilisateur n'est pas inscrit, rediriger vers la page d'inscription
  React.useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  }, [user, navigate]);

  const handleScanSuccess = (data: string) => {
    console.log("QR Code scanné:", data);
    // La redirection est gérée par le composant QRScanner
  };

  return (
    <div className="quest-container">
      <QuestLogo />
      
      {user && (
        <div className="mb-4 text-center">
          <p className="text-sm font-medium text-foreground">
            Bienvenue, {user.firstName} !
          </p>
          <p className="text-xs text-muted-foreground">
            ID: {user.id}
          </p>
        </div>
      )}
      
      <QRScanner onScanSuccess={handleScanSuccess} />
      
      <div className="mt-6 px-4">
        <div className="bg-muted/50 rounded-lg p-4 text-sm">
          <h3 className="font-medium mb-2">Comment scanner un QR code ?</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Positionnez l'appareil face au QR code</li>
            <li>Assurez-vous que le QR code est bien visible à l'écran</li>
            <li>Appuyez sur le bouton "Scanner un QR Code"</li>
            <li>Patientez pendant le scan</li>
          </ol>
        </div>
      </div>
      
      <div className="mt-auto pt-8 flex flex-col items-center space-y-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/')}
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default ScanPage;
