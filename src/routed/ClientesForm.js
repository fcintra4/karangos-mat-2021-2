import * as React from 'react'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'
import { makeStyles } from '@mui/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';
import MenuItem from '@mui/material/MenuItem'

const useStyles = makeStyles(theme => (
  {
    form: {
      maxWidth: '80%',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      '& .MuiFormControl-root': {
        minWidth: '200px',
        maxWidth: '500px',
        marginBottom: '24px',
      }
    }
  }
))

const unidadesFed = [
  { sigla: 'DF', nome: 'Distrito Federal'},
  { sigla: 'ES', nome: 'Espírito Santo'},
  { sigla: 'GO', nome: 'Goiás'},
  { sigla: 'MS', nome: 'Mato Grosso do Sul'},
  { sigla: 'MG', nome: 'Minas Gerais'},
  { sigla: 'PR', nome: 'Paraná'},
  { sigla: 'RJ', nome: 'Rio de Janeiro'},
  { sigla: 'SP', nome: 'São Paulo' }
]

export default function ClientesForm() {

  const classes = useStyles()

  const [state, setState] = React.useState({
    cliente: {} // Objeto vazio
  })
  const { cliente } = state

  function handleInputChange(event, field = event.target.id) {

    // Preencher a variável de estado "cliente" com o valor
    // dos inputs
    const newCliente = {...cliente}

    if(field === 'data_nascimento') newCliente[field] = event
    else newCliente[field] = event.target.value

    setState({...state, cliente: newCliente})
  }
  
  return (
    <>
      <h1>Cadastro de novo cliente</h1>

      <form className={classes.form}>
        
        <TextField 
          id="nome" 
          label="Nome" 
          variant="filled"
          value={cliente.nome}
          required
          fullWidth
          onChange={handleInputChange}
        />

        <InputMask
          mask="999.999.999-99"
          value={cliente.cpf}
          onChange={handleInputChange}
        >
          {
            () => <TextField 
              id="cpf"
              label="CPF" 
              variant="filled"
              required
              fullWidth
            />
          }
        </InputMask>

        <TextField 
          id="rg" 
          label="Doc. Identidade" 
          variant="filled"
          value={cliente.rg}
          required
          fullWidth
          onChange={handleInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
          <DatePicker
            label="Data de nascimento"
            value={cliente.data_nascimento}
            onChange={event => handleInputChange(event, 'data_nascimento')}
            renderInput={(params) => 
              <TextField 
                {...params}
                id="data_nascimento"
                variant="filled"
                fullWidth 
              />
            }
          />
        </LocalizationProvider>

        <TextField 
          id="logradouro" 
          label="Logradouro (Rua, Av., etc.)" 
          variant="filled"
          value={cliente.logradouro}
          required
          fullWidth
          onChange={handleInputChange}
        />

        <TextField 
          id="num_imovel" 
          label="Nº" 
          variant="filled"
          value={cliente.num_imovel}
          required
          fullWidth
          onChange={handleInputChange}
        />

        <TextField 
          id="complemento" 
          label="Complemento" 
          variant="filled"
          value={cliente.complemento}
          fullWidth
          onChange={handleInputChange}
        />

        <TextField 
          id="bairro" 
          label="Bairro" 
          variant="filled"
          value={cliente.bairro}
          required
          fullWidth
          onChange={handleInputChange}
        />

        <TextField 
          id="municipio" 
          label="Município" 
          variant="filled"
          value={cliente.municipio}
          required
          fullWidth
          onChange={handleInputChange}
        />

        <TextField
          id="uf"
          select
          label="UF"
          value={cliente.uf}
          onChange={event => handleInputChange(event, 'uf')}
          helperText="(Selecione)"
          variant="filled"
          required
          fullWidth
        >
          {unidadesFed.map((option) => (
            <MenuItem key={option.sigla} value={option.sigla}>
              {option.nome}
            </MenuItem>
          ))}
        </TextField>

        <InputMask
          mask="(99) 99999-9999"
          value={cliente.telefone}
          onChange={handleInputChange}
        >
          {
            () => <TextField 
              id="telefone"
              label="Celular" 
              variant="filled"
              required
              fullWidth
            />
          }
        </InputMask>

        <TextField 
          id="email" 
          label="E-mail" 
          variant="filled"
          value={cliente.email}
          required
          fullWidth
          type="email"
          onChange={handleInputChange}
        />

      </form>

      <div>
        {JSON.stringify(cliente)}
      </div>

    </>
  )
}