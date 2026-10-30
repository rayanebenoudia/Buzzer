import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface UseWebSocketProps {
  brokerURL: string;
  onMessageReceived?: (message: IMessage) => void;
}

export const useWebSocket = ({ brokerURL, onMessageReceived }: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    // Configuration du client STOMP avec SockJS
    const socket = new SockJS(brokerURL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // Backoff pour la reconnexion
      onConnect: () => {
        setIsConnected(true);
        console.log('Connecté au WebSocket !');
      },
      onDisconnect: () => {
        setIsConnected(false);
        console.log('Déconnecté du WebSocket.');
      },
    });

    client.activate();
    stompClient.current = client;

    // Nettoyage obligatoire au démontage (exigé par le sujet)
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [brokerURL]);

  return { isConnected, stompClient: stompClient.current };
};
