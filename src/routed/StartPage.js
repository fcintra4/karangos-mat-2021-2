/*

    Esta prova consiste em acrescentar um novo componente/página ao projeto Karangos.

    1. Copie este arquivo para a pasta src/routed.

    2. Copie o arquivo "easter-egg.png" para a pasta src.

    3. Altere o arquivo "Apps.js" e adicione um novo Route, com o valor path="/". Assegure-se de que esse novo Route seja POSICIONADO ANTES de todos os outros. Faça com que o componente StartPage seja carregado pelo novo Route. Dessa forma, o componente será exibido logo no início.

    4. No componente StartPage, crie uma variável de estado de objeto contendo duas            propriedades:
        - about (valor inicial: string vazia)
        - imgVisible (valor inicial: false)
    Crie também as respectivas variáveis avulsas usando desestruturação.
    
    5. Recupere as informações de https://api.faustocintra.com.br/sobre/1 e armazene-as na
       propriedade da variável de estado "about".

    6. Faça as modificações necessárias na tag <img> para que a imagem "easter-egg.png" seja exibida.

    7. Adicione um componente Toolbar imediatamente antes da div com a imagem.

    8. Dentro da Toolbar, adicione um botão com as seguintes props:
        - cor: secondary
        - variante: contained
        - texto interno: Surpresa!

    9. Ao clicar no botão criado no passo anterior, a propriedade da variável de estado
    "imgVisible" deve inverter seu valor (ou seja, de true para false ou de false para true).
    Dessa forma, a imagem da div logo abaixo será exibida se estiver oculta, e será ocutada 
    se estiver sendo exibida. Veja as imagens RESULTADO1.png e RESULTADOO2.png para referência.

    10. Aplique as classes de estilo definidas em useStyles nos lugares apropriados.

    10. Coloque os arquivos "App.js" e "StartPage.js" em um ZIP para fazer a entrega da prova.

*/

import React from 'react'
import { makeStyles } from '@mui/styles'
import axios from 'axios' 
import imgHome from '../assets/easter-egg.png'
import { Toolbar, Button } from '@mui/material'


const useStyles = makeStyles({
    figura: {
        display: 'block',
        margin: '0 auto',
        transition: 'opacity 1s linear'
    },
    toolbar: {
        justifyContent: 'space-around'
    },
    div: {
        textAlign: 'center'
    }

})

export default function StartPage() {
    const classes = useStyles()


//4 - Criando variavel de estado de objeto com propriedades about e imgVisible
// Usando lazy initializer
  const [state, setState] = React.useState(() => ({ 
    about: [],
    imgVisible: false,
  }))
  const { about, imgVisible } = state

//5 recuperando informações da API e armazenando na prop-var about
function getData(otherState = state) {
    // Buscando os dados na API do back-end (servidor remoto)
    axios.get('https://api.faustocintra.com.br/sobre/1')
    .then(
      response => setState({...otherState, about: response.data})
    )
  }

  React.useEffect(() => {
    getData()
  }, [])




  return (
        <>
              {/* testando funcionamento da API
             {JSON.stringify(about)}<br />
              */}

        <h1>Sobre o projeto Karangos</h1>
            
         
         <div dangerouslySetInnerHTML={{__html: about.info}}  />
         
       
         {/* passo 9 e 10 - toolbar e classes de personalização  */}
            <Toolbar className={classes.toolbar}>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="secondary"
                    onClick={() =>{// setState({...state, imgVisible: true})}
                        if(imgVisible){
                            setState({...state, imgVisible: false})
                        }
                        else {
                            setState({...state, imgVisible: true})
                            }
                        } 
                    }
                >
                Surpresa
                </Button>
            </Toolbar>

             <div className={classes.div}> 
                <img alt="Carros antigos" src={imgHome} className={classes.figura} style={{opacity: imgVisible ? '1' : '0', height: imgVisible ? '591px': '0'}} />
            </div>
           
             
        </>
    )
}