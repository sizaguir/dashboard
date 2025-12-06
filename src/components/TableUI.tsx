import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type OpenMeteoResponse } from '../types/DashboardTypes'; // Asegúrate de que esta ruta y tipo sean correctos

type TableUIProps = {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
};

function transformHourlyData(data: OpenMeteoResponse) {
    const time = data.hourly.time;
    const temperature = data.hourly.temperature_2m;
    const tempUnit = data.hourly_units.temperature_2m;

    return time.map((t, index) => ({
        id: index,        
        time: t.substring(t.indexOf('T') + 1, t.lastIndexOf(':')),       
        date: t.substring(0, t.indexOf('T')), 
        temperature: temperature[index],
        unit: tempUnit,
    }));
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'date',
        headerName: 'Fecha',
        width: 120,
    },
    {
        field: 'time',
        headerName: 'Hora',
        width: 100,
    },
    {
        field: 'temperature',
        headerName: 'Temperatura (2m)',
        width: 150,        
        valueGetter: (_, row) => `${row.temperature} ${row.unit}`,
    },
];

export default function TableUI({ data, loading, error }: TableUIProps) {    
    if (loading) {
        return <Typography variant="body1">Cargando datos de la tabla...</Typography>;
    }

    if (error) {
        return <Typography color="error" variant="body1">Error al cargar la tabla: {error}</Typography>;
    }

    if (!data) {
        return <Typography variant="body1">No hay datos disponibles para la tabla.</Typography>;
    }

    const rows = transformHourlyData(data);

    return (
        <>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                Temperatura por Hora
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 7, 
                            },
                        },
                    }}
                    pageSizeOptions={[5, 7, 10]}
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    );
}