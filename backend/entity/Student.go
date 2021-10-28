package entity

import (
	"gorm.io/gorm"
)

type Faculty struct {
	gorm.Model
	Name       string       `json:"name"`
	Department []Department `json:"-" gorm:"foreignKey:FacultyID"`
}

type Department struct {
	gorm.Model
	Name string `json:"name"`

	FacultyID *uint   `json:"facultyID"`
	Faculty   Faculty `json:"faculty"`

	TeacherRecord []TeacherRecord `json:"-" gorm:"foreignKey:DepartmentID"`
	StudentRecord []StudentRecord `json:"-" gorm:"foreignKey:DepartmentID"`
}

type StudentRecord struct {
	gorm.Model
	PrefixID *uint  `json:"prefixID"`
	Prefix   Prefix `json:"prefix"`

	Firstname  string `json:"firstname"`
	Lastname   string `json:"lastname"`
	PersonalID string `json:"personalID"`
	Code       string `json:"code" gorm:"uniqueIndex"`
	Password   string `json:"-"`

	DepartmentID *uint      `json:"departmentID"`
	Department   Department `json:"department"`

	AdviserID *uint         `json:"adviserID"`
	Adviser   TeacherRecord `json:"adviser"`

	CreatorID *uint        `json:"creatorID"`
	Creator   StaffAccount `json:"creator"`

	Enrollment []Enrollment `json:"-" gorm:"foreignKey:OwnerID"`

	RequestRegister []RequestRegister `json:"-" gorm:"foreignKey:OwnerID"`
}
