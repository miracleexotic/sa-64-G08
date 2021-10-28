package entity

import (
	"time"

	"gorm.io/gorm"
)

type TA struct {
	gorm.Model
	Code         string         `json:"code"`
	Name         string         `json:"name"`
	ManageCourse []ManageCourse `json:"-" gorm:"foreignKey:TaID"`
}

type Room struct {
	gorm.Model
	Number       uint           `json:"number"`
	StudentCount uint           `json:"studentCount"`
	ManageCourse []ManageCourse `json:"-" gorm:"foreignKey:RoomID"`
}

type Course struct {
	gorm.Model
	Code         string         `json:"code"`
	Name         string         `json:"name"`
	Credit       uint           `json:"credit"`
	ManageCourse []ManageCourse `json:"-" gorm:"foreignKey:CourseID"`
}

type ManageCourse struct {
	gorm.Model
	Group            uint      `json:"group"`
	TeachingTime     uint      `json:"teacherTime"`
	UngraduatedYear  uint      `json:"ungraduatedYear"`
	Trimester        uint      `json:"trimester"`
	ManageCourseTime time.Time `json:"ManageCourseTime"`

	CourseID *uint  `json:"courseID"`
	Course   Course `json:"course"`

	RoomID *uint `json:"roomID"`
	Room   Room  `json:"room"`

	TeacherID *uint         `json:"teacherID"`
	Teacher   TeacherRecord `json:"teacher"`

	TaID *uint `json:"taID"`
	Ta   TA    `json:"ta"`

	EnrollmentItem []EnrollmentItem `json:"-" gorm:"foreignKey:ManageCourseID"`

	RequestRegister []RequestRegister `json:"-" gorm:"foreignKey:ManageCourseID"`
}
