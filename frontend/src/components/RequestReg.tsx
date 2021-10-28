import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

import { ManageCourseInterface } from "../models/ICourses";
import { RequestStatusInterface, RequestTypeInterface } from "../models/IRequest";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { StudentRecordInterface, DepartmentInterface, TeacherRecordInterface, FacultyInterface, PrefixInterface } from "../models/IStudent";

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
  }),
);

function RequestRegister() {
    const classes = useStyles(); 
    const [name, setName] = useState<StudentRecordInterface>()

    const getStudent = async () => {
      const reponse = await fetch("http://localhost:8080/api/login", {
          method: "GET",
          headers: {"Content-Type" : "application/json"},
          credentials: "include",
      });
      
      const content = await reponse.json()
      console.log(content)
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
        console.log(content.ID)
        setName(content)
      }
      
    }

    const [courses, setCourse] = useState<ManageCourseInterface[]>([]);
    const [requestTypes, setRequestType] = useState<RequestTypeInterface[]>([]);
    const [requestStatuses, setRequestStatus] = useState<RequestStatusInterface[]>([]);

    const getCourse = async (id?: number) => {
        const reponse = await fetch("http://localhost:8080/api/course/list", {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
        });
        
        const content = await reponse.json()
        setCourse(content)
    }

    const getRequestType = async (id?: number) => {
        const reponse = await fetch("http://localhost:8080/api/requestregister/type", {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
        });
        
        const content = await reponse.json()
        setRequestType(content)
    }

    const getRequestStatus = async (id?: number) => {
        const reponse = await fetch("http://localhost:8080/api/requestregister/status", {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
        });
        
        const content = await reponse.json()
        setRequestStatus(content)
    }

    const [courseSelect, setCourseSelect] = useState<number>()
    const [requestTypeSelect, setRequestTypeSelect] = useState<number>()
    const [requestStatusSelect, setRequestStatusSelect] = useState<number>(1)

    const handleCourseChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        console.log(e.target.value)
        setCourseSelect(e.target.value as number)
        getCourse(courseSelect)
    }
    const handleCourseTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        console.log(e.target.value)
        setRequestTypeSelect(e.target.value as number)
        getRequestType(requestTypeSelect)
    }
    const handleCourseStatusChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        console.log(e.target.value as string)
        setRequestStatusSelect(e.target.value as number)
        getRequestStatus(requestStatusSelect)
    }

    const [selectedDate, setSelectedDate] = useState<Date | null>(
        new Date(Date.now()),
    );
    
    const handleDateChange = (date: Date | null) => {
        console.log(date)
        setSelectedDate(date);
    };

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const submit = async () => {
        if (name?.ID === 0) {
            setSuccess(false);
            setError(true);
            return
        }
        
        let body: any 
        body = JSON.stringify({
            "manageCourseID":    courseSelect, // 1
            "typeID":      requestTypeSelect, // 3
            "statusID":    requestStatusSelect, // 4
            "requestTime": selectedDate,
        })
        console.log(body)

        const response = await fetch("http://localhost:8080/api/requestregister", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
            body: body
        });

        const content = await response.json();
        console.log(content)
        if (content.error) {
            setSuccess(false);
            setError(true);
        } else {
            setSuccess(true);
            setError(false);
        }
        
    }

    useEffect(() => {
        getStudent()
        getCourse(courseSelect)
        getRequestType(requestTypeSelect)
        getRequestStatus()
        getRequestStatus(requestStatusSelect)
        
    }, [])

    return (
        <div className={classes.root}>
          <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled">
                บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
           <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled">
                บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>
          <Grid container spacing={1} >
            <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" align='right' style={{marginTop: '.5rem'}}>
                            รหัสรายวิชา
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='left'>
                            <TextField size='small' variant="outlined" id="select" label="รหัสรายวิชา" value={courseSelect} select style={{width: 200}} 
                                onChange={handleCourseChange}
                            >
                                {courses.map((course: ManageCourseInterface, index) => (
                                    <MenuItem key={index} value={course.ID}>{course.course.code}</MenuItem>
                                ))}
                            </TextField>
                        </Typography>
                    </Grid>
                </React.Fragment>
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" align='right' style={{marginTop: '.5rem'}}>
                            ประเภทใบคำร้อง
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='left'>
                            <TextField size='small' variant="outlined" id="select" label="ประเภท" value={requestTypeSelect} select style={{width: 200}} 
                                onChange={handleCourseTypeChange}
                            >
                                {requestTypes.map((type: RequestTypeInterface, index) => (
                                    <MenuItem key={index} value={type.ID}>{type.name}</MenuItem>
                                ))}
                            </TextField>
                        </Typography>
                    </Grid>
                </React.Fragment>
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" align='right' style={{marginTop: '1.1rem'}}>
                            สถานะ
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='left'>
                            <TextField id="select" label="สถานะ" value={1} disabled select style={{width: 200}} 
                                onChange={handleCourseStatusChange}
                            >
                                {requestStatuses.map((status: RequestStatusInterface, index) => (
                                    <MenuItem key={index} value={status.ID}>{status.name}</MenuItem>
                                ))}
                            </TextField>
                        </Typography>
                    </Grid>
                </React.Fragment>
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" align='right' style={{marginTop: '2rem'}}>
                            วันที่และเวลา
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='left'>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  label="Date picker"
                                  format="dd/MM/yyyy"
                                  value={selectedDate}
                                  onChange={handleDateChange}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                />
                                <div></div>
                                <KeyboardTimePicker
                                  margin="normal"
                                  id="time-picker"
                                  label="Time picker"
                                  format="HH:mm"
                                  value={selectedDate}
                                  onChange={handleDateChange}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                  }}
                                />
                            </MuiPickersUtilsProvider>
                        </Typography>
                    </Grid>
                </React.Fragment>
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='left'>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={submit}
                            >
                                Submit
                            </Button>
                        </Typography>
                    </Grid>
                </React.Fragment>
            </Grid>
          </Grid>
        </div>
    );
}

export default RequestRegister;
