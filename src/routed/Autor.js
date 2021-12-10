import * as React from 'react' 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material'; 
import StarIcon from '@mui/icons-material/Star';
import Foto from '../assets/foto.jpg'
 

export default function Autor() {
    
    console.log('Estado salvo: ', window.localStorage.getItem('favs'))


    const [count, setCount] = React.useState(0)
    const [state, setState] = React.useState(() => {
        (window.localStorage.getItem('favs'))
    })

    React.useEffect(() => {
        // salvo de forma correta no localStorage
       
        window.localStorage.setItem('favs', state)
        setCount(count + 1)
        }, [state]
    ) 

    return (
        <div>
            <h1>
                Sobre o Autor
            </h1> 

            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image={Foto}
                    alt="Emmanuel"
                    background
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Emmanuel Rolim Stocco
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Estou no caminho da programação a algum tempo e busco sempre me desenvolver. Possuo conhecimentos em React, Javascript, Node.js, React Native e estou me iniciando estudos em Typescript. Café encima da mesa, React startado e bora codar!
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <StarIcon />
                          Favorito ({count})
                    </Button>
                </CardActions>
            </Card>

        </div>
    )

}