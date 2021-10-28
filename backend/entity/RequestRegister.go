package entity

import (
	"time"

	"gorm.io/gorm"
)

type RequestStatus struct {
	gorm.Model
	Name string `json:"name"`

	RequestRegister []RequestRegister `json:"-" gorm:"foreignKey:StatusID"`
}

type RequestType struct {
	gorm.Model
	Name string `json:"name"`

	RequestRegister []RequestRegister `json:"-" gorm:"foreignKey:TypeID"`
}

type RequestRegister struct {
	gorm.Model
	RequestTime time.Time `json:"requestTime"`

	ManageCourseID *uint        `json:"manageCourseID"`
	ManageCourse   ManageCourse `json:"manageCourse"`

	TypeID *uint       `json:"typeID"`
	Type   RequestType `json:"type"`

	StatusID *uint         `json:"statusID"`
	Status   RequestStatus `json:"status"`

	OwnerID *uint         `json:"ownerID"`
	Owner   StudentRecord `json:"owner"`
}
