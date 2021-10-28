import React, {SyntheticEvent, useState} from 'react'
import { Redirect } from 'react-router';
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const Login = (props: {setRedirect: (redirect: boolean) => void}) => {
    props.setRedirect(false)
    const classes = useStyles();

    const [studentCode, setStudentCode] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
            body: JSON.stringify({
                "Student_code": studentCode,
                "Password": password
            })
        });

        const content = await response.json();
        if (content.message === "success") {
            setSuccess(true);
            setError(false);
            setRedirect(true);
            window.location.reload();
        } else {
            setSuccess(false);
            setError(true);
        }

    }

    if (redirect && success) {
        return <Redirect to="/" />;
    }

    return (
        <Container maxWidth="sm">
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled">
                    เข้าสู่ระบบสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" variant="filled">
                    รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง
                </Alert>
            </Snackbar>
            <Box textAlign='center'>
                <form onSubmit={submit}>
                    <Typography variant="h4" align="center" style={{margin: '1rem'}}>   
                        Please sign in  
                    </Typography>
                    <div>
                    <TextField type="text" className="form-control" placeholder="BXXXXXXX" variant="outlined" label="USERNAME"
                        style={{marginBottom: '.5rem'}}
                        onChange={e => setStudentCode(e.target.value)}
                    />
                    </div>
                    <div>
                    <TextField type="password" className="form-control" placeholder="Password" variant="outlined" label="PASSWORD"
                        style={{marginBottom: '.5rem'}}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    <Button variant="contained" color="primary" style={{marginBottom: '.3rem', justifyContent: 'center'}} type="submit">Sign in</Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
