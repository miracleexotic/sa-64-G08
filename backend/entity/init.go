package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

var State = map[string]bool{
	"Staff":           false,
	"Teacher":         false,
	"Student":         false,
	"ManageCourse":    false,
	"Enrollment":      false,
	"Bill":            false,
	"RequestRegister": false,
}

// Prefix data
var male = Prefix{
	Value: "นาย",
}
var female = Prefix{
	Value: "นางสาว",
}

// Staff data
var password_admin, _ = bcrypt.GenerateFromPassword([]byte("admin"), 14)
var admin01 = StaffAccount{
	PrefixID:  &male.ID,
	Firstname: "กอเอ้ย",
	Lastname:  "กอไก่",
	Code:      "admin01",
	Password:  string(password_admin),
}
var admin02 = StaffAccount{
	PrefixID:  &female.ID,
	Firstname: "ขอไข่",
	Lastname:  "ในเล้า",
	Code:      "admin02",
	Password:  string(password_admin),
}

func Init_Staff() {
	// Migrate database
	db.AutoMigrate(
		&Prefix{},
		&StaffAccount{},
	)

	// Prefix
	db.Model(&Prefix{}).Create(&male)
	db.Model(&Prefix{}).Create(&female)

	// StaffAccount
	db.Model(&StaffAccount{}).Create(&admin01)
	db.Model(&StaffAccount{}).Create(&admin02)

	State["Staff"] = true
}

// Faculty data
var faculty_engineer = Faculty{
	Name: "วิศวกรรม",
}

// Department data
var department_cpe = Department{
	Name:      "วิศวกรรมคอมพิวเตอร์",
	FacultyID: &faculty_engineer.ID,
}

// Position data
var pos01 = Position{
	PositionName: "ศาสตราจารย์",
}
var pos02 = Position{
	PositionName: "รองศาสตราจารย์",
}

// Education data
var eduSUT = Education{
	EducationFrom:       "SUT",
	EducationDepartment: "CPE",
}
var eduCU = Education{
	EducationFrom:       "CU",
	EducationDepartment: "CPE",
}

// Theses data
var Theses01 = Theses{
	ThesesName: "วิจัย01",
	ThesesType: "ประเภทที่ 1",
}
var Theses02 = Theses{
	ThesesName: "วิจัย02",
	ThesesType: "ประเภทที่ 2",
}

// TeacherRecord data
var password_teacher, _ = bcrypt.GenerateFromPassword([]byte("123456"), 14)
var teacher_AA = TeacherRecord{
	TeacherName:  "AA",
	TeacherEmail: "AA@g.sut.ac.th",
	PositionID:   &pos01.ID,
	EducationID:  &eduSUT.ID,
	ThesesID:     &Theses01.ID,
	DepartmentID: &department_cpe.ID,
	Password:     string(password_teacher),
}
var teacher_BB = TeacherRecord{
	TeacherName:  "BB",
	TeacherEmail: "BB@g.sut.ac.th",
	PositionID:   &pos02.ID,
	EducationID:  &eduCU.ID,
	ThesesID:     &Theses02.ID,
	DepartmentID: &department_cpe.ID,
	Password:     string(password_teacher),
}

func Init_Teacher() {
	// Migrate database
	db.AutoMigrate(
		&Faculty{},
		&Department{},
		&Position{},
		&Education{},
		&Theses{},
		&TeacherRecord{},
	)

	// Faculty data
	db.Model(&Faculty{}).Create(&faculty_engineer)

	// Department data
	db.Model(&Department{}).Create(&department_cpe)

	// Position
	db.Model(&Position{}).Create(&pos01)
	db.Model(&Position{}).Create(&pos02)

	// Education
	db.Model(&Education{}).Create(&eduSUT)
	db.Model(&Education{}).Create(&eduCU)

	// Theses
	db.Model(&Theses{}).Create(&Theses01)
	db.Model(&Theses{}).Create(&Theses02)

	// TeacherRecord
	db.Model(&TeacherRecord{}).Create(&teacher_AA)
	db.Model(&TeacherRecord{}).Create(&teacher_BB)

	State["Teacher"] = true
}

// StudentRecord data
var password_B6225605, _ = bcrypt.GenerateFromPassword([]byte("B6225605"), 14)
var student_B6225605 = StudentRecord{
	PrefixID:     &male.ID,
	Firstname:    "ณัฐวัตร",
	Lastname:     "บุญโสดากร",
	PersonalID:   "1329900991856",
	Code:         "B6225605",
	Password:     string(password_B6225605),
	DepartmentID: &department_cpe.ID,
	AdviserID:    &teacher_AA.ID,
	CreatorID:    &admin01.ID,
}
var password_B6200000, _ = bcrypt.GenerateFromPassword([]byte("B6200000"), 14)
var student_B6200000 = StudentRecord{
	PrefixID:     &female.ID,
	Firstname:    "ชื่อจริง",
	Lastname:     "นามสกุล",
	PersonalID:   "0000000000000",
	Code:         "B6200000",
	Password:     string(password_B6200000),
	DepartmentID: &department_cpe.ID,
	AdviserID:    &teacher_BB.ID,
	CreatorID:    &admin02.ID,
}

func Init_Student() {
	// Migrate database
	db.AutoMigrate(
		&StudentRecord{},
	)

	// StaffAccount
	if !State["Staff"] {
		Init_Staff()
	}

	// TeacherRecord
	if !State["Teacher"] {
		Init_Teacher()
	}

	// StudentRecord
	db.Model(&StudentRecord{}).Create(&student_B6225605)
	db.Model(&StudentRecord{}).Create(&student_B6200000)

	State["Student"] = true
}

// TA data
var ta_ta01 = TA{
	Code: "TA01",
	Name: "AAaa",
}
var ta_ta02 = TA{
	Code: "TA02",
	Name: "BBbb",
}

// Room data
var room_01 = Room{
	Number:       1,
	StudentCount: 300,
}
var room_02 = Room{
	Number:       2,
	StudentCount: 1500,
}

// Course data
var course_sa = Course{
	Code:   "523331",
	Name:   "SYSTEM ANALYSIS AND DESIGN",
	Credit: 4,
}
var course_hh = Course{
	Code:   "IST20 1503",
	Name:   "HOLISTIC HEALTH",
	Credit: 2,
}

// ManageCourse data
var manage_sa = ManageCourse{
	Group:            1,
	TeachingTime:     2,
	UngraduatedYear:  2,
	Trimester:        1,
	ManageCourseTime: time.Date(2021, 1, 1, 6, 0, 0, 0, time.UTC),
	CourseID:         &course_sa.ID,
	RoomID:           &room_01.ID,
	TeacherID:        &teacher_AA.ID,
	TaID:             &ta_ta01.ID,
}
var manage_hh = ManageCourse{
	Group:            1,
	TeachingTime:     2,
	UngraduatedYear:  2,
	Trimester:        1,
	ManageCourseTime: time.Date(2021, 1, 2, 6, 0, 0, 0, time.UTC),
	CourseID:         &course_hh.ID,
	RoomID:           &room_02.ID,
	TeacherID:        &teacher_BB.ID,
	TaID:             &ta_ta02.ID,
}

func Init_ManageCourse() {
	// Migrate database
	db.AutoMigrate(
		&TA{},
		&Room{},
		&Course{},
		&ManageCourse{},
	)

	// TeacherRecord
	if !State["Teacher"] {
		Init_Teacher()
	}

	// TA
	db.Model(&TA{}).Create(&ta_ta01)
	db.Model(&TA{}).Create(&ta_ta02)

	// Room
	db.Model(&Room{}).Create(&room_01)
	db.Model(&Room{}).Create(&room_02)

	// Course
	db.Model(&Course{}).Create(&course_sa)
	db.Model(&Course{}).Create(&course_hh)

	// ManageCourse
	db.Model(&ManageCourse{}).Create(&manage_sa)
	db.Model(&ManageCourse{}).Create(&manage_hh)

	State["ManageCourse"] = true
}

// CourseType data
var courseType_TH = CourseType{
	Name: "TH",
}
var courseType_ENG = CourseType{
	Name: "ENG",
}

// Enrollment data
var enroll_01 = Enrollment{
	EnrollDateTime:  time.Date(2021, 1, 2, 6, 0, 0, 0, time.UTC),
	EnrollYear:      3,
	EnrollTrimester: 1,
	TotalCredit:     course_sa.Credit + course_hh.Credit,
	OwnerID:         &student_B6225605.ID,
}
var enroll_02 = Enrollment{
	EnrollDateTime:  time.Date(2021, 1, 5, 6, 0, 0, 0, time.UTC),
	EnrollYear:      3,
	EnrollTrimester: 1,
	TotalCredit:     course_sa.Credit,
	OwnerID:         &student_B6200000.ID,
}

// EnrollmentItem data
var enroll_01_item_01 = EnrollmentItem{
	EnrollmentID:   &enroll_01.ID,
	ManageCourseID: &manage_sa.ID,
	CourseTypeID:   &courseType_TH.ID,
}
var enroll_01_item_02 = EnrollmentItem{
	EnrollmentID:   &enroll_01.ID,
	ManageCourseID: &manage_hh.ID,
	CourseTypeID:   &courseType_TH.ID,
}
var enroll_02_item_01 = EnrollmentItem{
	EnrollmentID:   &enroll_02.ID,
	ManageCourseID: &manage_sa.ID,
	CourseTypeID:   &courseType_TH.ID,
}

func Init_Enrollment() {
	// Migrate database
	db.AutoMigrate(
		&CourseType{},
		&Enrollment{},
		&EnrollmentItem{},
	)

	// StudentRecord
	if !State["Student"] {
		Init_Student()
	}

	// ManageCourse
	if !State["ManageCourse"] {
		Init_ManageCourse()
	}

	// CourseType
	db.Model(&CourseType{}).Create(&courseType_TH)
	db.Model(&CourseType{}).Create(&courseType_ENG)

	// Enrollment
	db.Model(&Enrollment{}).Create(&enroll_01)
	db.Model(&Enrollment{}).Create(&enroll_02)

	// EnrollmentItem
	db.Model(&EnrollmentItem{}).Create(&enroll_01_item_01)
	db.Model(&EnrollmentItem{}).Create(&enroll_01_item_02)
	db.Model(&EnrollmentItem{}).Create(&enroll_02_item_01)

	State["Enrollment"] = true
}

// Place data
var place01 = Place{
	Name: "p01",
}
var place02 = Place{
	Name: "p02",
}

// PaymentType data
var paymentType_01 = PaymentType{
	Name: "ตัดผ่านบัญชี",
}
var paymentType_02 = PaymentType{
	Name: "ทุน",
}
var paymentType_03 = PaymentType{
	Name: "โอนผ่านเลขบัญชี",
}

// Bill data
var bill_B6225605 = Bill{
	BillTime:      time.Date(2021, 1, 2, 6, 0, 0, 0, time.UTC),
	TotalPrice:    enroll_01.TotalCredit * 800,
	EnrollmentID:  &enroll_01.ID,
	PlaceID:       &place01.ID,
	PaymentTypeID: &paymentType_03.ID,
}
var bill_B6200000 = Bill{
	BillTime:      time.Date(2021, 1, 2, 6, 0, 0, 0, time.UTC),
	TotalPrice:    enroll_02.TotalCredit * 800,
	EnrollmentID:  &enroll_02.ID,
	PlaceID:       &place02.ID,
	PaymentTypeID: &paymentType_01.ID,
}

func Init_Bill() {
	// Migrate database
	db.AutoMigrate(
		&Place{},
		&PaymentType{},
		&Bill{},
	)

	// Enrollment
	if !State["Enrollment"] {
		Init_Enrollment()
	}

	// Place
	db.Model(&Place{}).Create(&place01)
	db.Model(&Place{}).Create(&place02)

	// PaymentType
	db.Model(&PaymentType{}).Create(&paymentType_01)
	db.Model(&PaymentType{}).Create(&paymentType_02)
	db.Model(&PaymentType{}).Create(&paymentType_03)

	// Bill
	db.Model(&Bill{}).Create(&bill_B6225605)
	db.Model(&Bill{}).Create(&bill_B6200000)

	State["Bill"] = true
}

// RequestStatus data
var status_wait = RequestStatus{
	Name: "รอดำเนินการ",
}
var status_approve = RequestStatus{
	Name: "อนุมัติ",
}
var status_non_approve = RequestStatus{
	Name: "ไม่อนุมัติ",
}

// RequestType data
var type_inc = RequestType{
	Name: "เพิ่มรายวิชา",
}
var type_dec = RequestType{
	Name: "ลดรายวิชา",
}

// RequestRegister data
var req_B6225605_01 = RequestRegister{
	ManageCourseID: &manage_sa.ID,
	TypeID:         &type_inc.ID,
	StatusID:       &status_approve.ID,
	OwnerID:        &student_B6225605.ID,
	RequestTime:    time.Date(2021, 1, 2, 10, 0, 0, 0, time.UTC),
}
var req_B6225605_02 = RequestRegister{
	ManageCourseID: &manage_hh.ID,
	TypeID:         &type_inc.ID,
	StatusID:       &status_wait.ID,
	OwnerID:        &student_B6225605.ID,
	RequestTime:    time.Date(2021, 1, 3, 9, 0, 0, 0, time.UTC),
}
var req_B6200000_01 = RequestRegister{
	ManageCourseID: &manage_hh.ID,
	TypeID:         &type_inc.ID,
	StatusID:       &status_wait.ID,
	OwnerID:        &student_B6200000.ID,
	RequestTime:    time.Date(2021, 1, 3, 11, 0, 0, 0, time.UTC),
}

func Init_RequestRegister() {
	// Migrate database
	db.AutoMigrate(
		&RequestStatus{},
		&RequestType{},
		&RequestRegister{},
	)

	// StudentRecord
	if !State["Student"] {
		Init_Student()
	}

	// ManageCourse
	if !State["ManageCourse"] {
		Init_ManageCourse()
	}

	// RequestStatus
	db.Model(&RequestStatus{}).Create(&status_wait)
	db.Model(&RequestStatus{}).Create(&status_approve)
	db.Model(&RequestStatus{}).Create(&status_non_approve)

	// RequestType
	db.Model(&RequestType{}).Create(&type_inc)
	db.Model(&RequestType{}).Create(&type_dec)

	// RequestRegister
	db.Model(&RequestRegister{}).Create(&req_B6225605_01)
	db.Model(&RequestRegister{}).Create(&req_B6225605_02)
	db.Model(&RequestRegister{}).Create(&req_B6200000_01)

	State["RequestRegister"] = true
}
