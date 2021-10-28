package entity

import (
	"gorm.io/gorm"
)

type Prefix struct {
	gorm.Model
	Value         string          `json:"value"`
	StaffAccount  []StaffAccount  `json:"-" gorm:"foreignKey:PrefixID"`
	StudentRecord []StudentRecord `json:"-" gorm:"foreignKey:PrefixID"`
}

type StaffAccount struct {
	gorm.Model
	PrefixID      *uint           `json:"prefixID"`
	Prefix        Prefix          `json:"prefix"`
	Firstname     string          `json:"firstname"`
	Lastname      string          `json:"lastname"`
	Code          string          `json:"code" gorm:"uniqueIndex"`
	Password      string          `json:"-"`
	StudentRecord []StudentRecord `json:"-" gorm:"foreignKey:CreatorID"`
}
