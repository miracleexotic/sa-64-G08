import React, {SyntheticEvent, useState} from 'react'
import { Redirect } from 'react-router';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

const Login = () => {

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

        const response = await fetch("http://localhost:8080/student/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "userCode": studentCode,
                "password": password
            })
        });

        const content = await response.json();
        if (content.data) {
            setRedirect(true);
            setSuccess(true);
            setError(false);
            console.log(content.data.student);
            localStorage.setItem("token", content.data.token);
            localStorage.setItem("id", content.data.student.ID);
            localStorage.setItem("prefix", content.data.student.Prefix.Value);
		    localStorage.setItem("firstname", content.data.student.FirstName);
		    localStorage.setItem("lastname", content.data.student.LastName);
		    localStorage.setItem("studentCode", content.data.student.StudentCode);
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
