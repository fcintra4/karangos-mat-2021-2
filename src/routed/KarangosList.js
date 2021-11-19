import * as React from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { makeStyles } from '@mui/styles'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paper } from '@mui/material'
import { Toolbar, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'
import Snackbar from '@mui/material/Snackbar'

const useStyles = makeStyles(theme => ({
  dataGrid: {
    '& .MuiTablePagination-root': {
      color: theme.palette.text.primary
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
  },
  toolbar: {
    padding: 0,
    margin: '20px 0',
    justifyContent: 'flex-end'
  }
}))

export default function KarangosList() {

  const classes = useStyles()

  const history = useHistory()
  
  const [state, setState] = React.useState(() => ({ 
    karangos: [],
    deletable: null,
    isDialogOpen: false,
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  }))
  const { karangos, deletable, isDialogOpen, isSnackOpen, snackMessage, isError } = state

  function getData(otherState = state) {
    axios.get('https://api.faustocintra.com.br/karangos')
    .then(
      response => setState({...otherState, karangos: response.data})
    )
  }

  React.useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    { 
      field: 'id', 
      headerName: 'Cód.',
      width: 100
    },
    { 
      field: 'marca', 
      headerName: 'Marca do carro',
      width: 200
    },
    { 
      field: 'modelo', 
      headerName: 'Modelo',
      width: 150,
    },
    { 
      field: 'cor', 
      headerName: 'Cor',
      width: 150
    },
    { 
      field: 'ano_fabricacao', 
      headerName: 'Ano de fabricação',
      width: 150
    },
    { 
      field: 'importado', 
      headerName: 'Importado',
      width: 150,
      renderCell: params => {
        const isImported = Number.parseInt(params.formattedValue)
        return Boolean(isImported).toString()
      }
    },
    {
      field: 'placa', 
      headerName: 'Placa',
      width: 150
    },
    { 
      field: 'preco', 
      headerName: 'Preço',
      width: 200,
      renderCell: params => {
        const price = Number(params.formattedValue)
        return `R$ ${price.toFixed(2)}`
      }
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
        <IconButton 
          aria-label="editar"
          onClick={() => history.push(`/karangos/${params.id}`)}
        >
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
        <IconButton 
          aria-label="excluir" 
          onClick={() => handleDelete(params.id)}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    }

  ];

  function handleDialogClose(answer) {
    setState({...state, isDialogOpen: false})

    if(answer) {

        axios.delete(`https://api.faustocintra.com.br/karangos/${deletable}`)
        .then(
          () => {
            console.log({isDialogOpen})
            const newState = {
              ...state,
              isError: false,
              isSnackOpen: true,
              isDialogOpen: false,
              snackMessage: 'Item excluído com sucesso'
            }
            getData(newState)
          }
        )
        .catch(
          error => {
            setState({
              ...state,
              isError: true,
              isSnackOpen: true,
              snackMessage: 'ERRO: não foi possível excluir o item. Motivo: ' + error.message
            })
          }
        )
    }
    
  }

  function handleDelete(id) {
    setState({...state, deletable: id, isDialogOpen: true})
  }
  
  function handleSnackClose(event, reason) {
    if (reason === 'clickaway') return
    setState({...state, isSnackOpen: false})
  }

  return (
    <>
      <h1>Listagem de karangos</h1>

      <ConfirmDialog 
        title="Atenção" 
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
        Deseja realmente excluir este item?
      </ConfirmDialog>

      <Snackbar
        open={isSnackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <Button color="secondary" onClick={handleSnackClose}>
            {isError ? 'Que pena!' : 'Entendi'}
          </Button>
        }
      />
      
      <Toolbar className={classes.toolbar}>
        <Button 
          startIcon={<AddCircleIcon />}
          variant="contained" 
          size="large" 
          color="secondary"
          onClick={() => history.push('/karangos/new')}
        >
          Cadastrar novo karango
        </Button>
      </Toolbar>

      <Paper elevation={4}>
        <DataGrid className={classes.dataGrid}
          rows={karangos}
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