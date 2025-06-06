
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { getAppMode } from '@/utils/localStorage';

type QRScannerProps = {
  onScanSuccess: (data: string) => void;
};

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const appMode = getAppMode();

  // Fonction qui simule un scan QR en mode dev ou initie un vrai scan en mode run
  const handleScan = () => {
    setIsScanning(true);
    
    if (appMode === 'dev') {
      // Mode développement: simulation d'un QR code
      setTimeout(() => {
        // Pour le MVP, on va juste simuler différents QR codes
        const mockQRCodes = [
          '/question/1',
          '/question/2',
          '/question/3',
          '/question/4',
          '/finish'
        ];
        
        // Choix aléatoire d'un QR code dans la liste
        const randomQR = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];
        
        toast({
          title: "QR Code détecté ! (SIMULATION)",
          description: "Redirection vers la prochaine étape...",
        });
        
        setIsScanning(false);
        onScanSuccess(randomQR);
        
        // Redirection vers la page correspondante
        setTimeout(() => {
          navigate(randomQR);
        }, 1000);
      }, 2000);
    } else {
      // Mode production: utilisation d'un vrai scanner de QR code
      // Dans un vrai projet, on utiliserait la caméra et une bibliothèque comme react-qr-reader
      
      // Pour le MVP, nous allons simuler un scan mais avec un message différent
      setTimeout(() => {
        toast({
          title: "Scanner un vrai QR code",
          description: "Placez un QR code devant la caméra",
        });
        
        // NOTE: Dans une implémentation réelle, nous utiliserions ici un vrai scanner
        // qui appellerait onScanSuccess avec les données du QR code scanné
        
        // Simulons pour l'instant un timeout
        setTimeout(() => {
          setIsScanning(false);
          toast({
            title: "Pas de QR code détecté",
            description: "Veuillez réessayer",
            variant: "destructive"
          });
        }, 5000);
      }, 2000);
    }
  };

  return (
    <div className="quest-card flex flex-col items-center">
      <div className="w-full mb-4">
        <h3 className="quest-subtitle text-center">Scanner le QR Code</h3>
        <div className="text-xs text-center mb-2 text-muted-foreground">
          Mode: {appMode === 'dev' ? 'Développement (simulation)' : 'Production (réel)'}
        </div>
        
        <div className={`border-2 border-dashed border-primary rounded-lg p-4 aspect-square mb-4 flex items-center justify-center ${isScanning ? 'animate-pulse-scale' : ''}`}>
          {isScanning ? (
            <div className="text-center text-muted-foreground">
              <svg className="w-16 h-16 mx-auto text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <p className="mt-2">Scan en cours...</p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <svg className="w-16 h-16 mx-auto text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="mt-2">Prêt pour le scan</p>
            </div>
          )}
        </div>
      </div>
      
      <Button 
        onClick={handleScan} 
        disabled={isScanning}
        className="quest-button"
      >
        {isScanning ? 'Scan en cours...' : 'Scanner un QR Code'}
      </Button>
    </div>
  );
};

export default QRScanner;
