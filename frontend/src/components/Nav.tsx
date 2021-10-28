import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {flexGrow: 1},   
    menuButton: {marginRight: theme.spacing(2)},   
    title: {flexGrow: 1},   
    navlink: {color: "white",textDecoration: "none"},
}));

function Nav(props: {redirect: boolean, setRedirect: (redirect: boolean) => void}) {
    const classes = useStyles(); 
    const [islogin, setIsLogin] = useState(false)
    const [name, setName] = useState("")

    const getStudent = async () => {
      const reponse = await fetch("http://localhost:8080/api/login", {
          method: "GET",
          headers: {"Content-Type" : "application/json"},
          credentials: "include",
      });
      
      const content = await reponse.json()
      console.log(content)
      if (content.message) {
        setIsLogin(false)
      } else {
        setIsLogin(true)
        setName(content.code + " " + content.prefix.value + content.firstname + " " + content.lastname)
      }
      
    }

    useEffect(() => {
      getStudent()
    }, [])

    const logout = async () => {
        await fetch("http://localhost:8080/api/logout", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
        });
        
        props.setRedirect(true)
        setName("")
        window.location.reload()
    }

    if (props.redirect) {
      return (  
          <Redirect to="/login" />
      );
    }

    let menu;
    if (islogin) {
      menu = (
        <Button
          style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}
          variant="outlined"
          color="inherit" 
          size="small"
          onClick={() => {logout()}}
        >
            Logout
        </Button>
      )
    } else {
      menu = (
        <Button
          href="/login"
          color="inherit" 
          variant="outlined"
          size="small"
          style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}
        >
          Login
        </Button>
      )
    }
  
    return (   
      <div className={classes.root}>   
        <AppBar position="static">   
          <Toolbar> 
            <Link className={classes.navlink} to="/">   
              <Typography variant="h6" className={classes.title}>   
                Home  
              </Typography>   
            </Link> 
            <Grid
              justify="space-between" // Add it here :)
              container 
            >
              <Grid item>   
                {islogin ? (
                  <div style={{display: 'flex'}}>
                    <Link className={classes.navlink} to="/create">
                      <Typography variant="subtitle2" style={{marginLeft: '1.5rem', marginTop: '.3rem'}}>   
                        ลงทะเบียนเพิ่มลด  
                      </Typography>
                    </Link>
                    <Link className={classes.navlink} to="/follow">
                      <Typography variant="subtitle2" style={{marginLeft: '1.5rem', marginTop: '.3rem'}}>   
                        ติดตามผลขอเพิ่มถอน  
                      </Typography>
                    </Link>
                  </div>
                            ) : ""}   
              </Grid>   
              <Grid item style={{display: 'flex'}}>
                  {islogin ? (
                    <Grid item style={{marginRight: '.3rem', marginTop: '.3rem'}}>
                      <AccountCircleIcon />
                    </Grid>
                              ) : ""}
                    <Grid item style={{marginRight: '1rem', marginTop: '.3rem'}}> 
                      {name}
                    </Grid>
                  <Grid item> 
                    {menu}
                  </Grid>
              </Grid>
            </Grid>
          </Toolbar>  
        </AppBar>   
      </div>   
    );   
}

export default Nav
