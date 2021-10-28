package entity

import (
	"time"

	"gorm.io/gorm"
)

type Enrollment struct {
	gorm.Model
	EnrollDateTime  time.Time `json:"enrollDateTime"`
	EnrollYear      uint      `json:"enrollYear"`
	EnrollTrimester uint      `json:"enrollTrimester"`
	TotalCredit     uint      `json:"totalCredit"`

	OwnerID *uint         `json:"ownerID"`
	Owner   StudentRecord `json:"owner"`

	EnrollmentItem []EnrollmentItem `json:"-" gorm:"foreignKey:EnrollmentID"`
}

type CourseType struct {
	gorm.Model
	Name string `json:"name"`

	EnrollmentItem []EnrollmentItem `json:"-" gorm:"foreignKey:CourseTypeID"`
}

type EnrollmentItem struct {
	gorm.Model

	EnrollmentID *uint      `json:"enrollmentID"`
	Enrollment   Enrollment `json:"enrollment"`

	ManageCourseID *uint        `json:"manageCourseID"`
	ManageCourse   ManageCourse `json:"manageCourse"`

	CourseTypeID *uint      `json:"courseTypeID"`
	CourseType   CourseType `json:"courseType"`
}
