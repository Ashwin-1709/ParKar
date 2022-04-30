import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'location', headerName: 'Location', width: 130 },
  { field: 'inTime', headerName: 'In Time', width: 130 },
  { field: 'outTime', headerName: 'Out Time', width: 130 },
  { field: 'cost', headerName: 'Cost', width: 70 },
];

export default function TransactionTable({rows}) {
  return (
    <div style={{ height: 400, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}