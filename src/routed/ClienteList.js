import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { makeStyles } from '@mui/styles'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton, Paper, Snackbar } from '@mui/material'
import {Toolbar, Button} from '@mui/material'
import { useHistory } from 'react-router-dom'

import { api } from '../services/api'
import ConfirmDialog from "../ui/ConfirmDialog"


const useStyles = makeStyles(theme => ({
  dataGrid: {

    //color: theme.palette.text.primary + ' !important',
    '& .MuiTablePagination-root': {
      color: theme.palette.text.primary
    },
    /* '& .MuiIconButton-root': {
      color: theme.palette.text.primary + ' !important'
    }, */
    '& .MuiDataGrid-row button': {
      visibility: 'hidden'
    },
    '& .MuiDataGrid-row:hover button': {
      visibility: 'visible'
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: theme.palette.action.hover + ' !important'
    },
  },
  toolbar: {
    display: 'flex',
    padding: 0,
    margin: '20px 0',
    justifyContent: 'flex-end'
  }
}))

export default function ClientesList() {
  const styles = useStyles()
  
  const history = useHistory()
  const [state, setState] = useState(() =>({
    clientes: [],
    isDialogOpen: false,
    deletable: null,
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  }))

  const {
    clientes, isDialogOpen, deletable,
    isSnackOpen, snackMessage, isError
  } = state

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
        <IconButton aria-label='Editar'>
          <EditIcon />
        </IconButton>
      )
    },
    {
      field: 'excluir', headerName: 'Excluir', width: 100,
      headerAlign: 'center', disableColumnMenu: true,
      sortable: false,
      renderCell: params => (
        <IconButton 
          aria-label='Excluir'
          onClick={() => handleDelete(params.id)}
        >
          <DeleteForeverIcon color='error'/>
        </IconButton>
      )
    },
  ];

  async function getData() {
    const { data: clientes } = await api.get('/clientes')
    setState({ ...state, clientes, isDialogOpen:false })
  }
  
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleDialogClose(answer) {
    if (answer) {
      api.delete(`/clientes/${deletable}`)
        .then(
          () => {
            setState({
              ...state,
              isError: false,
              isSnackOpen: true,
              snackMessage: 'Item excluido com sucesso',
              isDialogOpen: false
            })
            getData()
          }
        )
        .catch(
          error => {
            setState({
              ...state,
              isError: true,
              isSnackOpen: true,
              snackMessage: 'Erro: não foi possivel excluir o item. Motive: '+ error.message,
              isDialogOpen: false
            })
          }
        )
    }
  }

  function handleDelete(id) {
    setState({...state, isDialogOpen: true, deletable: id})
  }

  function handleSnackClose(event, reason) {
    if (reason === 'clickaway') return
    setState({...state, isSnackOpen: false})
  }

  return (
    <section>
      <h1>Listagem de clientes</h1>

      <ConfirmDialog
        title="Atenção"
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
      
        Deseja realmente excluir este item
      </ConfirmDialog>

      <Snackbar
        open={isSnackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={isError? 'Que pena': 'Entendi'}
      />

      <Toolbar className={styles.toolbar}>
        <Button startIcon={<AddCircleIcon />} variant="contained" 
          size="large" color="secondary"
          onClick={() => history.push('/clientes/new')}>
          Cadastrar novo cliente
          </Button>
      </Toolbar>
      <Paper
        elevation={4}>
        <DataGrid
          className={styles.dataGrid}
          rows={clientes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick={true}
          autoHeight={true}
        />
      </Paper>
    </section>
  )
}