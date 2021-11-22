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
    isDialogOpen: false,
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  }))
  const { clientes, deletable, isDialogOpen, isSnackOpen, snackMessage, isError } = state

  function getData(otherState = state) {
    // Buscando os dados na API do back-end (servidor remoto)
    axios.get('https://api.faustocintra.com.br/karangos ')
    .then(
      response => setState({...otherState, clientes: response.data})
    )
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
      field: 'marca', 
      headerName: 'Marca',
      width: 300
    },
    { 
      field: 'modelo', 
      headerName: 'Modelo',
      width: 200
    },
    { 
      field: 'cor', 
      headerName: 'Cor',
      width: 200
    },
    { 
      field: 'ano_fabricacao', 
      headerName: 'Ano de fabricação',
      width: 300
    },
    { 
      field: 'importado', 
      headerName: 'Carro importado',
      width: 300
    },
    { 
      field: 'placa', 
      headerName: 'N° da placa',
      width: 300
    },
    { 
      field: 'preco', 
      headerName: 'Valor do veículo',
      width: 300
    },
  ];

  function handleDialogClose(answer) {

    // Fecha a caixa de diálogo de confirmação
    setState({...state, isDialogOpen: false})

    // O usuário confirmou a exclusão
    if(answer) {
      
        // Usa o axios para enviar uma ordem de exclusão
        // para a API do back-end
        axios.delete(` https://api.faustocintra.com.br/karangos`)
        .then(
          // Callback se ser certo
          () => {
            // Exibe o snackbar com a mensagem de sucesso
            console.log({isDialogOpen})
            const newState = {
              ...state,
              isError: false,
              isSnackOpen: true,
              isDialogOpen: false,
              snackMessage: 'Item excluído com sucesso'
            }
            // Recarregar os dados da tabela
            getData(newState)
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
    setState({...state, deletable: id, isDialogOpen: true})
  }
  
  function handleSnackClose(event, reason) {
    // Evita que o snackbar seja fechado clicando-se fora dele 
    if (reason === 'clickaway') return
    
    // Fechamento em condições normais
    setState({...state, isSnackOpen: false})
    //getData()
  }

  return (
    <>
      <h1>Listagem de veículos</h1>

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
