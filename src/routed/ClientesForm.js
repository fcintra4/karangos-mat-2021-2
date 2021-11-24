import * as React from 'react'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'
import { makeStyles } from '@mui/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import validator from 'validator'
import { validate as cpfValidate, validate } from 'gerador-validador-cpf'
import { isFuture as dateIsFuture, isValid as dateIsValid } from 'date-fns'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'

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
    },
    toolbar: {
      width: '100%',
      justifyContent: 'space-around'
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

const formatChars = {
  '9': '[0-9]',   // Dígito obrigatório
  '#': '[0-9]?'   // Dígito opcional
}

export default function ClientesForm() {

  const classes = useStyles()
  const history = useHistory()

  const [state, setState] = React.useState({
    cliente: {}, // Objeto vazio,
    errors: {},
    formValid: true,
    isSnackOpen: false,
    snackMessage: '',
    isSendingError: false,
    btnSendLabel: 'Enviar'
  })
  const { cliente, errors, formValid, isSnackOpen, snackMessage, isSendingError, btnSendLabel } = state

  function handleInputChange(event, field = event.target.id) {

    // Preencher a variável de estado "cliente" com o valor
    // dos inputs
    const newCliente = {...cliente}

    if(field === 'data_nascimento') {
      newCliente[field] = event
    }
    // trim() retira espaços em branco antes e depois da string
    else newCliente[field] = event.target.value 

    // Chama a validação do formulário
    const newErrors = formValidate(newCliente)
    const newFormValid = Object.keys(newErrors).length === 0

    setState({...state, cliente: newCliente, errors: newErrors, formValid: newFormValid})
  }
  
  function formValidate(fields) {

    const newErrors = {}

    // Validação do campo "nome", mínimo de 5 caracteres, contendo pelo menos
    // um espaço entre palavras
    
    if(!fields.nome || !(validator.isLength(fields.nome.trim(), {min: 5}) 
      && validator.contains(fields.nome.trim(), ' '))) {
      newErrors.nome = 'Informe o nome completo'
    }
    
    // Validação do campo "cpf": precisa ser válido
    if(!fields.cpf || !cpfValidate(fields.cpf)) {
      newErrors.cpf = 'CPF inválido'
    }

    // Validação do campo "rg": 4 caracteres, no mínimo
    if(!fields.rg || !validator.isLength(fields.rg.trim(), {min: 4})) {
      newErrors.rg = 'Doc. identidade incompleto ou não informado'
    }

    // Validação do campo "data_nascimento": deve ser válida e não pode ser futura
    if(!fields.data_nascimento || !dateIsValid(fields.data_nascimento) 
      || dateIsFuture(fields.data_nascimento)) {
        newErrors.data_nascimento = 'Data inválida ou no futuro'
    }

    // Validação do campo "logradouro": 4 caracteres, no mínimo
    if(!fields.logradouro || !validator.isLength(fields.logradouro.trim(), {min: 4})) {
      newErrors.logradouro = 'Logradouro incompleto ou não informado'
    }

    // Validação do campo "num_imovel": 1 caracter, no mínimo
    if(!fields.num_imovel || !validator.isLength(fields.num_imovel.trim(), {min: 1})) {
      newErrors.num_imovel = 'Número não informado'
    }

    // Validação do campo "bairro": 3 caracteres, no mínimo
    if(!fields.bairro || !validator.isLength(fields.bairro.trim(), {min: 3})) {
      newErrors.bairro = 'Bairro incompleto ou não informado'
    }

    // Validação do campo "municipio": 3 caracteres, no mínimo
    if(!fields.municipio || !validator.isLength(fields.municipio.trim(), {min: 3})) {
      newErrors.municipio = 'Município incompleto ou não informado'
    }

    // Validação do campo "uf": 2 caracteres (mínimo e máximo)
    if(!fields.uf || !validator.isLength(fields.uf.trim(), {min: 2, max: 2})) {
      newErrors.uf = 'Selecione a UF'
    }

    // Validação do campo "telefone": não pode conter sublinhado, indicando que
    // a entrada com máscara está incompleta
    if(!fields.telefone || validator.contains(fields.telefone, '_')) {
      newErrors.telefone = 'Telefone inválido'
    }

    // Validação do campo "email": deve ser um endereço de e-mail válido
    if(!fields.email || !validator.isEmail(fields.email)) {
      newErrors.email = 'E-mail inválido ou não informado'
    }
    
    return newErrors

  }

  function handleSubmit(event) {

    // Evita o recarregamento da página
    event.preventDefault()

    if(formValid) saveData()

  }

  function saveData() {

    // Desabilita o botão de envio para evitar cliques duplicados
    // e múltiplos envios dos mesmos dados
    setState({...state, btnSendLabel: 'Enviando...'})

    axios.post('https://api.faustocintra.com.br/clientes', cliente)
      .then(
        () => {
          setState({
            ...state, 
            isSnackOpen: true,
            snackMessage: 'Dados salvos com sucesso!',
            isSendingError: false,
            btnSendLabel: 'Enviar' // Reabilita o botão de envio 
          })
          
        }
      )
      .catch(
        error => {
          setState({
            ...state, 
            isSnackOpen: true,
            snackMessage: 'ERRO: ' + error.message,
            isSendingError: true,
            btnSendLabel: 'Enviar' // Reabilita o botão de envio 
          })  
        }
      )
  }

  function handleSnackClose(event, reason) {
    // Evita que o snackbar seja fechado clicando-se fora dele 
    if (reason === 'clickaway') return
    
    // Fechamento em condições normais
    setState({...state, isSnackOpen: false})
    
    // Retorna ao componente de listagem
    history.push('/clientes')

  }

  return (
    <>
      <h1>Cadastro de novo cliente</h1>

      <div>
        {JSON.stringify(cliente)}<br />
        {'formValid: ' + formValid}<br />
        {'errors:' + JSON.stringify(errors)}
      </div>

      <Snackbar
        open={isSnackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <Button color="secondary" onClick={handleSnackClose}>
            {isSendingError ? 'Que pena!' : 'Entendi'}
          </Button>
        }
      />

      <form className={classes.form} onSubmit={handleSubmit}>
        
        <TextField 
          id="nome" 
          label="Nome" 
          variant="filled"
          value={cliente.nome}
          required
          fullWidth
          onChange={handleInputChange}
          error={errors?.nome}
          helperText={errors?.nome}
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
              error={errors?.cpf}
              helperText={errors?.cpf}
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
          error={errors?.rg}
          helperText={errors?.rg}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
          { /* new Date() => data de hoje, previne digitação de datas futuras */ }
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
                error={errors?.data_nascimento}
                helperText={errors?.data_nascimento}
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
          error={errors?.logradouro}
          helperText={errors?.logradouro}
        />

        <TextField 
          id="num_imovel" 
          label="Nº" 
          variant="filled"
          value={cliente.num_imovel}
          required
          fullWidth
          onChange={handleInputChange}
          error={errors?.num_imovel}
          helperText={errors?.num_imovel}
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
          error={errors?.bairro}
          helperText={errors?.bairro}
        />

        <TextField 
          id="municipio" 
          label="Município" 
          variant="filled"
          value={cliente.municipio}
          required
          fullWidth
          onChange={handleInputChange}
          error={errors?.municipio}
          helperText={errors?.municipio}
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
          error={errors?.uf}
          helperText={errors?.uf}
        >
          {unidadesFed.map((option) => (
            <MenuItem key={option.sigla} value={option.sigla}>
              {option.nome}
            </MenuItem>
          ))}
        </TextField>

        <InputMask
          mask="(99) #9999-9999"
          formatChars={formatChars}
          value={cliente.telefone}
          onChange={handleInputChange}
        >
          {
            () => <TextField 
              id="telefone"
              label="Telefone" 
              variant="filled"
              required
              fullWidth
              error={errors?.telefone}
              helperText={errors?.telefone}
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
          error={errors?.email}
          helperText={errors?.email}
        />

        <Toolbar className={classes.toolbar}>
          <Button 
            variant="contained" 
            color="secondary"
            type="submit"
            disabled={btnSendLabel !== 'Enviar'}
          >
            {btnSendLabel}
          </Button>
          
          <Button variant="outlined">Voltar</Button>
        </Toolbar>

      </form>

    </>
  )
}