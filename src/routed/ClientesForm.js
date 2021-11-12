import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import * as React from 'react'
import InputMask from 'react-input-mask'

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: '80%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& .MuiFormControl-root': {
      minWidth: '200px',
      maxWidth: '500px',
      marginBottom: '24px'
    }
  }
}))

const unidadesFed = [
  {sigla: 'DF', nome: 'Distrito Federal'},
  {sigla: 'ES', nome: 'Espirito Santos'},
  {sigla: 'GO', nome: 'Goias'},
  {sigla: 'MS', nome: 'Mato Grosso do Sul'},
  {sigla: 'MG', nome: 'Minas Gerais'},
  {sigla: 'PR', nome: 'Parana'},
  {sigla: 'RG', nome: 'Rio de Janeiro'},
  {sigla: 'SP', nome: 'São Paulo'},
]

export default function ClientesForm() {
  const styles = useStyles()
  const [state, setState] = React.useState({
    cliente: {}
  })


  const {
    cliente
  } = state


  function handleInputChange(event, attr) {
    if (!attr) attr = event.target.id
    let newCliente
    if (!event.target) {
      newCliente = { ...cliente, [attr]: event }
    } else {
      newCliente = { ...cliente, [attr]: event.target.value }
    }
    console.log({newCliente})
    setState({ ...state, cliente: newCliente })
  }

  return (
    <>
      <h1>Cadastro de novo cliente</h1>
      <form className={styles.form}>
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
          mask='999.999.999-99'
          value={cliente.cpf}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id='cpf'
              label="CPF"
              variant="filled"
              required
              fullWidth
            />
          )}
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data de nascimento"
            value={cliente.dataNascimento}
            onChange={event => handleInputChange(event, 'dataNascimento')}
            renderInput={
              (params) => <TextField {...params}
                fullWidth
                id="dataNascimento"
                variant='filled'
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
          id="numImovel"
          label="Nº"
          variant="filled"
          value={cliente.numImovel}
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
          fullWidth
          required
          onChange={handleInputChange}
        />

        <TextField
          id="municipio"
          label="Municipio"
          variant="filled"
          value={cliente.municipio}
          fullWidth
          required
          onChange={handleInputChange}
        />

        <TextField
          id="uf"
          select
          label="UF"
          value={cliente.uf}
          onChange={event => handleInputChange(event, 'uf')}
          helperText="(Selecione)"
          fullWidth
          required
          variant="filled"
        >
          {unidadesFed.map((option) => (
            <MenuItem key={option.sigla} value={option.sigla}>
              {option.nome}
            </MenuItem>
          ))}
        </TextField>

        <InputMask
          mask='(99) 99999-9999'
          value={cliente.telefone}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id='telefone'
              label="Celular"
              variant="filled"
              required
              fullWidth
            />
          )}
        </InputMask>

        <TextField
          id="email"
          label="E-mail"
          variant="filled"
          value={cliente.email}
          fullWidth
          required
          type='email'
          onChange={handleInputChange}
        />

      </form>
    </>
  )
}