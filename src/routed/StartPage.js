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
import { Toolbar, Button } from '@mui/material'
import Easteregg from '../assets/easter-egg.png'
import axios from 'axios'

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

    const [state, setState] = React.useState(() => ({
        about:"",
    }))

    const [imgVisible, setimgVisible] = React.useState(false)

    const { about } = state

    function getData(otherState = state){
        axios.get('https://api.faustocintra.com.br/sobre/1')
        .then(
            response => setState({...otherState, about:response.data})
        )
    }

    React.useEffect(() =>{
        getData()
    }, [])

    return (
        <>
            <h1>Sobre o projeto Karangos</h1>

            <div dangerouslySetInnerHTML={{__html: about.info}} />

            <div className={classes.div}>
                
            <Toolbar className={classes.toolbar}>
                <Button 
                    color="secondary"
                    variant="contained" 
                    onClick={()  => (setimgVisible(!imgVisible))}>
                    Surpresa!
                </Button>
            </Toolbar>

                <img src={Easteregg} className={classes.figura} img alt="Carros antigos" style={{opacity: imgVisible ? '1' : '0', height: imgVisible ? '591px': '0'}} />
            </div>
        </>
    )
}