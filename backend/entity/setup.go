package entity

import (
	"encoding/json"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db = database

	// init database
	Init_RequestRegister()

	//
	// === Query
	//

	var target StudentRecord
	db.Model(&StudentRecord{}).Find(&target, db.Where("code = ?", "B6225605"))

	var RequestRegisters []RequestRegister
	db.Model(&RequestRegister{}).
		Joins("ManageCourse").
		Joins("Type").
		Joins("Status").
		Joins("Owner").
		Find(&RequestRegisters, db.Where("owner_id = ?", target.ID))
	for i, v := range RequestRegisters {
		db.Model(&TeacherRecord{}).Where("id = ?", v.ManageCourse.TeacherID).Scan(&RequestRegisters[i].ManageCourse.Teacher)
		db.Model(&TA{}).Where("id = ?", v.ManageCourse.TaID).Scan(&RequestRegisters[i].ManageCourse.Ta)
		db.Model(&Room{}).Where("id = ?", v.ManageCourse.RoomID).Scan(&RequestRegisters[i].ManageCourse.Room)
		db.Model(&Course{}).Where("id = ?", v.ManageCourse.CourseID).Scan(&RequestRegisters[i].ManageCourse.Course)
	}

	for _, v := range RequestRegisters {
		fmt.Println("Code : ", v.ManageCourse.Course.Code)
		fmt.Println("Name : ", v.ManageCourse.Course.Name)
		fmt.Println("Type : ", v.Type.Name)
		fmt.Println("Status : ", v.Status.Name)
		fmt.Println("Datetime : ", v.RequestTime)
		fmt.Println("====")
	}

	data, err := json.MarshalIndent(RequestRegisters, "", "    ")
	if err != nil {
		panic("fail")
	}
	fmt.Println(string(data))
}
