import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// Estrategia para convertir la opción seleccionada en un objeto
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'Quito': { latitude: -0.2299, longitude: -78.5249 },
  'Manta': { latitude: -0.9491, longitude: -80.7111 },
  'Cuenca': { latitude: -2.9006, longitude: -79.0045 }
};

// Define el tipo de retorno del hook
interface UseFetchDataReturn {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

// Tipo del prop: string | null
export default function useFetchData(selectedOption: string | null): UseFetchDataReturn {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Parametrice la opción seleccionada en la URL del requerimiento asíncrono
    const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
    
    if (!cityConfig) {
      setError(`Ciudad no encontrada: ${selectedOption}`);
      setData(null);
      setLoading(false);
      return;
    }

    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America/Guayaquil`;

    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(URL);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Error al cargar datos');
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedOption]); // El efecto secundario depende de la opción seleccionada

  return { data, loading, error };
}