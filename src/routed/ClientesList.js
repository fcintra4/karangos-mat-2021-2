import * as React from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { makeStyles } from '@mui/styles'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paper } from '@mui/material'
import { Toolbar, Button } from '@mui/material'

const useStyles = makeStyles(theme => ({
  dataGrid: {
    // color: theme.palette.text.primary + ' !important',
    '& .MuiTablePagination-root': {
      color: theme.palette.text.primary
    },/*
    '& .MuiIconButton-root': {
      color: theme.palette.text.primary + ' !important'
    },*/
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

export default function ClientesList() {

  const classes = useStyles()
  
  const [state, setState] = React.useState({
    clientes: []
  })
  const { clientes } = state

  React.useEffect(() => {
    // Buscando os dados na API do back-end (servidor remoto)
    axios.get('https://api.faustocintra.com.br/clientes').then(
      response => setState({...state, clientes: response.data})
    )
  }, [])

  const columns = [
    { 
      field: 'id', 
      headerName: 'Cód.',
      width: 120
    },
    { 
      field: 'nome', 
      headerName: 'Nome do cliente',
      width: 300
    },
    { 
      field: 'cpf', 
      headerName: 'CPF',
      width: 200
    },
    { 
      field: 'telefone', 
      headerName: 'Telefone',
      width: 200
    },
    { 
      field: 'email', 
      headerName: 'E-mail',
      width: 300
    },
    {
      field: 'editar',
      headerName: 'Editar',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: params => (
        <IconButton aria-label="editar">
          <EditIcon />
        </IconButton>
      )
    },
    {
      field: 'excluir',
      headerName: 'Excluir',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: params => (
        <IconButton aria-label="excluir">
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    }

  ];
  
  return (
    <>
      <h1>Listagem de clientes</h1>
      
      <Toolbar>
        <Button variant="contained" size="large" color="secondary">Cadastrar novo cliente</Button>
      </Toolbar>

      <Paper elevation={4}>
        <DataGrid className={classes.dataGrid}
          rows={clientes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick={true}
          autoHeight={true}
        />  
      </Paper>
    </>
  )

}