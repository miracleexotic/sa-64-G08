import { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
    root: {
        flexGrow: 1,
        margin: '3rem',
        alignItems: 'center'
    },
  })
);

const Home = () => {
    const classes = useStyles();

    const [islogin, setIsLogin] = useState(false)
    const [name, setName] = useState("")

    const getStudent = async () => {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
        });
        
        const content = await response.json()
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

    return (
        <div>
            <Container className={classes.container} maxWidth="md">
                <h1 style={{ textAlign: "center" }}>ระบบยื่นคำร้องเพิ่มถอนรายวิชา</h1>
                <h4>Requirements</h4>
                <p>
                    ระบบลงทะเบียนเรียนของมหาวิทยาลัย 
                    เป็นระบบที่ให้นักศึกษาในมหาวิทยาลัยสามารถ login เข้าสู่ระบบเพื่อลงทะเบียนในรายวิชาที่ต้องการเรียนได้ 
                    โดยระบบลงทะเบียนเรียนของมหาวิทยาลัยสามารถบันทึกรายวิชาต่างๆ ทั้งที่เปิดสอนและไม่เปิดสอนในเทอมนั้นๆเอาไว้ได้ 
                    รวมทั้งข้อมูลของนักศึกษาและคณาจารย์ เพื่อให้นักศึกษาแต่ละคนสามารถตรวจสอบรายวิชาที่ต้องการลงทะเบียนได้ 
                    โดยหลังจากลงทะเบียนเสร็จแล้ว นักศึกษาแต่ละคนจะมีรายการภาระค่าใช้จ่ายสำหรับนักศึกษาคนนั้น และนอกจากนี้ 
                    นักศึกษาแต่ละคนจะยังสามารถสร้างรายการเพิ่มถอนรายวิชาของตนเองได้ และนักศึกษาแต่ละคนยังสามารถติดตามผลขอเพิ่มถอนได้
                </p>
            </Container>
        </div>
    )
}

export default Home
