import React, { useEffect, useState, SyntheticEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

import moment from 'moment';
import { ManageCourseInterface } from "../models/ICourses";
import { RequestStatusInterface, RequestTypeInterface } from "../models/IRequest";
import { StudentRecordInterface, DepartmentInterface, TeacherRecordInterface, FacultyInterface, PrefixInterface } from "../models/IStudent";
import { RequestRegisterInterface } from "../models/IRequest";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: '3rem',
      alignItems: 'center'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {marginTop: theme.spacing(2)},
    table: { minWidth: 650},
    tableSpace: {marginTop: 20},
  }),
);

function RequestFollow() {
    const classes = useStyles(); 
    const [name, setName] = useState<StudentRecordInterface>()

    const getStudent = async () => {
      const reponse = await fetch("http://localhost:8080/api/login", {
          method: "GET",
          headers: {"Content-Type" : "application/json"},
          credentials: "include",
      });
      
      const content = await reponse.json()
      if (content.message) {
        var prefix: PrefixInterface = {ID: 0, value: ""}
        var faculty: FacultyInterface = {ID: 0, name: ""}
        var department: DepartmentInterface = {ID: 0, name: "", facultyID: 0, faculty: faculty}
        var teacher: TeacherRecordInterface = {ID: 0, teacherName: "", teacherEmail: ""}
        setName({...name, ID: 0, 
            prefixID: 0,
            prefix: prefix,  
            firstname: "", 
            lastname: "", 
            code: "", 
            personalID: "", 
            departmentID: 0, 
            department: department, 
            adviserID: 0, 
            adviser: teacher})
      } else {
        setName(content)
      }
      
    }

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
        window.location.reload()
    };

    const [requestRegister, setRequestRegister] = useState<RequestRegisterInterface[]>([]);

    const getRequest = async () => {
        const reponse = await fetch("http://localhost:8080/api/requestregisters", {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
        });
        
        const content = await reponse.json()
        console.log(content)
        setRequestRegister(content)
    }

    const sleep = (milliseconds: any) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const handleCancel = async (id: number) => {
        let url = "http://localhost:8080/api/requestregister?id="+id
        const reponse = await fetch(url, {
          method: "DELETE",
          headers: {"Content-Type" : "application/json"},
          credentials: "include",
        });

        const content = await reponse.json()
        if (content.message) {
            setSuccess(false);
            setError(true);
        } else {
            setSuccess(true);
            setError(false);
            await sleep(1000)
            window.location.reload()
        }
    }

    useEffect(() => {
        getStudent()
        getRequest()
    }, [])

    return (
        <div>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" variant="filled">
                  การยกเลิกสำเร็จ
              </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" variant="filled">
                  การยกเลิกไม่สำเร็จ
              </Alert>
            </Snackbar>
            <Container className={classes.container} maxWidth="md">
            <TableContainer component={Paper} className={classes.tableSpace}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell align="center" width="5%">
                        ลำดับ
                    </TableCell>
                    <TableCell align="right" width="10%">
                        รหัสรายวิชา
                    </TableCell>
                    <TableCell align="left" width="20%">
                        ชื่อรายวิชา
                    </TableCell>
                    <TableCell align="center" width="10%">
                        ประเภท
                    </TableCell>
                    <TableCell align="center" width="10%">
                        สถานะ
                    </TableCell>
                    <TableCell align="center" width="5%">
                        วันที่และเวลา
                    </TableCell>
                    <TableCell align="center" width="5%">
                        ยกเลิก
                    </TableCell >
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requestRegister.map((request: RequestRegisterInterface, index) => (
                    <TableRow key={request.manageCourseID}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="right">{request.manageCourse.course.code}</TableCell>
                        <TableCell align="left">{request.manageCourse.course.name}</TableCell>
                        <TableCell align="center">{request.type.name}</TableCell>
                        <TableCell align="center">{request.status.name}</TableCell>
                        <TableCell align="center">{moment(request.requestTime).format("DD/MM/YYYY HH:mm A")}</TableCell>
                        <TableCell align="center">
                            { request.status.ID !== 1 ?
                            (<Button variant="contained" color="secondary" size="small" disabled>
                                ยกเลิก
                            </Button>) :
                            (<Button variant="contained" color="secondary" size="small"
                                onClick={() => handleCancel(request.ID)}
                            >
                                ยกเลิก
                            </Button>) 
                            }
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody> 
                </Table> 
            </TableContainer>
            </Container>
        </div>
    );
}

export default RequestFollow;
