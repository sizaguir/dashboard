//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';

import { Grid } from '@mui/material';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI/>        
      </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI description="No se preveen lluvias"/>
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>Elemento: Selector</Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

      {/* Gráfico */}
      <Grid sx={{ display: { xs: "none", md: "block" } }} >
        Elemento: Gráfico
      </Grid>

      {/* Tabla */}
      <Grid sx={{ display: { xs: "none", md: "block" } }} >Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
