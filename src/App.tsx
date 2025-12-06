import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI'; // Importación
import ChartUI from './components/ChartUI'; // Importación

import { Grid, Typography } from '@mui/material';

function App() {
  //const [count, setCount] = useState(0)    
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const dataFetcherOutput = useFetchData(); // { data, loading, error }

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI />
      </Grid>

      <Grid container size={{ xs: 12, md: 9 }} >
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <>

            <Grid size={{ xs: 12, md: 3 }} >
              <IndicatorUI
                title='Temperatura (2m)'
                description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura aparente'
                description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
            </Grid>

          </>
        )}

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 12 }} >
        <ChartUI {...dataFetcherOutput} /> {/* Pasa { data, loading, error } */}
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 12 }} >
        <TableUI {...dataFetcherOutput} /> {/* Pasa { data, loading, error } */}
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs:12 ,md:12 }}>

        <Typography variant="caption" display="block" gutterBottom>
          Hora de Visita Local: {localTime.toLocaleTimeString()}
        </Typography>
        {dataFetcherOutput.data && (
          <Typography variant="caption" display="block" gutterBottom>
            Última Actualización de Datos: {new Date(dataFetcherOutput.data.current.time).toLocaleString()}.
            Fuente: Open-Meteo. (Latitud: {dataFetcherOutput.data.latitude}, Longitud: {dataFetcherOutput.data.longitude}).
          </Typography>
        )}
      </Grid>
      
    </Grid>
  )
}
export default App