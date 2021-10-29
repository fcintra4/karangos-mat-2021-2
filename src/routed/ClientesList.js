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
  },
  toolbar: {
    padding: 0,
    margin: '20px 0',
    justifyContent: 'flex-end'
  }
}))

export default function ClientesList() {

  const classes = useStyles()

  const history = useHistory()
  
  // Usando lazy initializer
  const [state, setState] = React.useState(() => ({ 
    clientes: [],
    deletable: null,
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  }))
  const { clientes, deletable, isSnackOpen, snackMessage, isError } = state

  const [isDialogOpen, setDialogOpen] = React.useState(false)

  async function getData() {
    // Buscando os dados na API do back-end (servidor remoto)
    let response = await axios.get('https://api.faustocintra.com.br/clientes')
    setState({...state, clientes: response.data, isDialogOpen: false})
  }

  React.useEffect(() => {
    getData()
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
    
    // Fecha a caixa de diálogo de confirmação
    setDialogOpen(false)

    // O usuário confirmou a exclusão
    if(answer) {
        // Usa o axios para enviar uma ordem de exclusão
        // para a API do back-end
        axios.delete(`https://api.faustocintra.com.br/clientes/${deletable}`)
        .then(
          // Callback se ser certo
          () => {
            // Exibe o snackbar com a mensagem de sucesso
            setState({
              ...state,
              isError: false,
              isSnackOpen: true,
              snackMessage: 'Item excluído com sucesso'
            })
            // Recarregar os dados da tabela
            getData()
          }
        )
        .catch(
          // Callback se der errado
          error => {
            // Exibe o snackbar com mensagem de erro
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
    setState({...state, deletable: id})
    setDialogOpen(true)
  }
  
  function handleSnackClose(event, reason) {
    // Evita que o snackbar seja fechado clicando-se fora dele 
    if (reason === 'clickaway') return
    
    // Fechamento em condições normais
    setState({...state, isSnackOpen: false})
  }

  return (
    <>
      <h1>Listagem de clientes</h1>

      <ConfirmDialog 
        title="Atenção" 
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
        Deseja realmente excluir este item?
      </ConfirmDialog>

      <Snackbar
        open={isSnackOpen}
        autoHideDuration={null}
        onClose={handleSnackClose}
        message={snackMessage}
        action={isError ? 'Que pena!' : 'Entendi'}
      />
      
      <Toolbar className={classes.toolbar}>
        <Button 
          startIcon={<AddCircleIcon />}
          variant="contained" 
          size="large" 
          color="secondary"
          onClick={() => history.push('/clientes/new')}
        >
          Cadastrar novo cliente
        </Button>
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