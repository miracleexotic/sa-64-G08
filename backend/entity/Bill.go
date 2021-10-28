package entity

import (
	"time"

	"gorm.io/gorm"
)

type Place struct {
	gorm.Model
	Name string `json:"name"`

	Bill []Bill `json:"-" gorm:"foreignKey:PlaceID"`
}

type PaymentType struct {
	gorm.Model
	Name string `json:"name"`

	Bill []Bill `json:"-" gorm:"foreignKey:PaymentTypeID"`
}

type Bill struct {
	gorm.Model
	BillTime   time.Time `json:"billTime"`
	TotalPrice uint      `json:"totalPrice"`

	EnrollmentID *uint      `json:"enrollmentID"`
	Enrollment   Enrollment `json:"enrollment"`

	PlaceID *uint `json:"placeID"`
	Place   Place `json:"place"`

	PaymentTypeID *uint       `json:"paymentTypeID"`
	PaymentType   PaymentType `json:"paymentType"`
}
