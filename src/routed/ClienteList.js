import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { api } from '../services/api'
import { makeStyles } from '@mui/styles'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paper } from '@mui/material'
import {Toolbar, Button} from '@mui/material';


const useStyles = makeStyles(theme => ({
  dataGrid: {
    color: theme.palette.text.primary + ' !important',
    '& .MuiTablePagination-root': {
      color: theme.palette.text.primary
    },
    '& .MuiIconButton-root': {
      color: theme.palette.text.primary + ' !important'
    },
    '& .MuiDataGrid-row button': {
      visibility: 'hidden'
    },
    '& .MuiDataGrid-row:hover button': {
      visibility: 'visible'
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: theme.palette.action.hover + ' !important'
    }
  }
}))

const columns = [
  { field: 'id', headerName: 'Codigo', flex: true },
  { field: 'nome', headerName: 'Nome', width: 250 },
  { field: 'cpf', headerName: 'Cpf', width: 200 },
  { field: 'rg', headerName: 'RG', width: 200 },
  { field: 'email', headerName: 'Email', width: 300 },
  {
    field: 'editar', headerName: 'Editar', width: 100,
    headerAlign: 'center', disableColumnMenu: true,
    sortable: false,
    renderCell: params => (
      <Button aria-label='Editar'>
        <EditIcon />
      </Button>
    )
  },
  {
    field: 'excluir', headerName: 'Excluir', width: 100,
    headerAlign: 'center', disableColumnMenu: true,
    sortable: false,
    renderCell: params => (
      <Button aria-label='Editar'>
        <DeleteForeverIcon color='error'/>
      </Button>
    )
  },
];


export default function ClientesList() {
  const styles = useStyles()
  const [state, setState] = useState({
    clientes: []
  })
  console.log(styles)

  useEffect(() => {
    (
      async () => {
        const { data: clientes } = await api.get('/clientes')
        setState({ ...state, clientes })
      }
    )()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <>
      <h1>Listagem de clientes</h1>
      <Toolbar>
        <Button variant="contained" size="large" color="secondary">Cadastrar novo cliente</Button>
      </Toolbar>
      <Paper style={{ height: 400, width: '100%' }}
        elevation={4}>
        <DataGrid
          className={styles.dataGrid}
          rows={state.clientes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick={true}
          autoHeight={true}
        />
      </Paper>
      <div>
        {JSON.stringify(state.clientes)}
      </div>
    </>
  )
}