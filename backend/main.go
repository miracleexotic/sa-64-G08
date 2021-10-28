package main

import (
	"github.com/miracleexotic/backend/controller"
	"github.com/miracleexotic/backend/entity"

	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()

	// User Routes
	r.POST("/api/login", controller.StudentLogin)
	r.GET("/api/login", controller.GetStudentLogin)
	r.POST("/api/logout", controller.StudentLogout)

	r.GET("/api/course/list", controller.ListCourse)

	r.GET("/api/requestregister/type", controller.ListRequestType)
	r.GET("/api/requestregister/status", controller.ListRequestStatus)
	r.POST("/api/requestregister", controller.CreateRequestRegister)
	r.GET("/api/requestregisters", controller.ListRequestRegister)
	r.DELETE("/api/requestregister", controller.DeleteRequestRegister)

	// Run the server
	r.Run()

}
