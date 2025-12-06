import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
type ChartUIProps = {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
};

export default function ChartUI({ data, loading, error }: ChartUIProps) {
    
    if (loading) {
        return <Typography variant="body1">Cargando datos del gráfico...</Typography>;
    }

    if (error) {
        return <Typography color="error" variant="body1">Error al cargar el gráfico: {error}</Typography>;
    }

    if (!data) {
        return <Typography variant="body1">No hay datos disponibles para el gráfico.</Typography>;
    }

    const timeLabels = data.hourly.time.slice(0, 24).map(t => 
        // Formato HH:MM
        t.substring(t.indexOf('T') + 1, t.lastIndexOf(':'))
    );
    const temperatureValues = data.hourly.temperature_2m.slice(0, 24);
    const temperatureUnit = data.hourly_units.temperature_2m;
    
    return (
        <>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                Temperatura (2m) Horaria
            </Typography>
            <LineChart
                height={300}                
                series={[
                    { 
                        data: temperatureValues, 
                        label: `Temperatura 2m (${temperatureUnit})`,
                    },
                ]}
                // Eje X: Etiquetas de tiempo (horas)
                xAxis={[{ 
                    scaleType: 'point', 
                    data: timeLabels,
                    label: "Hora",                    
                    tickLabelInterval: (i) => i % 3 === 0, 
                }]}
                // Eje Y: Temperatura
                yAxis={[{
                    label: `Temperatura (${temperatureUnit})`
                }]}
            />
        </>
    );
}