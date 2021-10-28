package entity

import (
	"gorm.io/gorm"
)

type Position struct {
	gorm.Model
	PositionName  string          `json:"positionName"`
	TeacherRecord []TeacherRecord `json:"-" gorm:"foreignKey:PositionID"`
}

type Education struct {
	gorm.Model
	EducationFrom       string          `json:"educationFrom"`
	EducationDepartment string          `json:"educationDepartment"`
	TeacherRecord       []TeacherRecord `json:"-" gorm:"foreignKey:EducationID"`
}

type Theses struct {
	gorm.Model
	ThesesName    string          `json:"thesesName"`
	ThesesType    string          `json:"thesesType"`
	TeacherRecord []TeacherRecord `json:"-" gorm:"foreignKey:ThesesID"`
}

type TeacherRecord struct {
	gorm.Model
	TeacherName  string `json:"teacherName"`
	TeacherEmail string `json:"teacherEmail" gorm:"uniqueIndex"`

	PositionID *uint    `json:"positionID"`
	Position   Position `json:"position"`

	EducationID *uint     `json:"educationID"`
	Education   Education `json:"education"`

	ThesesID *uint  `json:"thesesID"`
	Theses   Theses `json:"theses"`

	DepartmentID *uint      `json:"departmentID"`
	Department   Department `json:"department"`

	Password string `json:"-"`

	StudentRecord []StudentRecord `json:"-" gorm:"foreignKey:AdviserID"`
	ManageCourse  []ManageCourse  `json:"-" gorm:"foreignKey:TeacherID"`
}
