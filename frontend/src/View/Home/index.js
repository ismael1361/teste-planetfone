import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { Container, CircularProgress, Typography, Grid, Card, CardContent, Alert } from '@mui/material';
import styles from "./style.module.scss";
import { UsuarioController } from "../../Controller";

export default ()=>{
    const [carregando, setCarregando] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);

    const getUsuarios = useCallback(()=>{
        setUsuarios(()=> []);
        UsuarioController.getTodosUsuarios().then((lista)=>{
            setUsuarios(()=> lista);
        }).catch(()=>{
            setErro("Erro na tentativa em obter os dados dos usuários. Por favor, tenta novamente mais tarte!");
        });
    }, []);

    useEffect(()=>{
        setCarregando(usuarios.length === 0 && erro === null);
    }, [usuarios, erro]);

    useLayoutEffect(()=>{
        getUsuarios();
    }, []);

    if(carregando || erro !== null){
        return <Container className={[styles["container"], styles["carregando"]].join(" ")} maxWidth="sm">
            {carregando && <CircularProgress style={{color: "#cfd8dc"}}/>}
            {erro !== null && <Alert severity="warning">{erro}</Alert>}
        </Container>
    }

    return <Container className={styles["container"]} maxWidth="sm">
        <Typography variant="h4" gutterBottom sx={{textAlign: "center"}}>Usuários</Typography>
        <Grid container spacing={2} sx={{marginTop: "15px"}}>
            {usuarios.map(({id, name, username, email}, index)=>{
                return <Grid item xs={6} key={index}>
                    <Card sx={{height: "100%"}}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>{name}</Typography>
                            <Typography variant="body2">
                                ID: <b>{id}</b> <br/>
                                USER NAME: <b>{username}</b> <br/>
                                E-MAIL: <b>{email}</b>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            })}
        </Grid>
    </Container>
}