import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {flexGrow: 1},   
    menuButton: {marginRight: theme.spacing(2)},   
    title: {flexGrow: 1},   
    navlink: {color: "white",textDecoration: "none"},
}));

function Nav() {
    const classes = useStyles(); 

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    let menu;
    if (localStorage.getItem("token") != null) {
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
              justify="space-between"
              container 
            >
              <Grid item>   
                {localStorage.getItem("token") != null ? (
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
                  {localStorage.getItem("token") != null ? (
                    <Grid item style={{marginRight: '.3rem', marginTop: '.3rem'}}>
                      <AccountCircleIcon />
                    </Grid>
                              ) : ""}
                    <Grid item style={{marginRight: '1rem', marginTop: '.3rem'}}> 
                      {localStorage.getItem("token") != null ? (localStorage.getItem("studentCode") + " " + localStorage.getItem("prefix") + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname")): ""}
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
