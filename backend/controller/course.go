package controller

import (
	"github.com/miracleexotic/backend/entity"

	"github.com/gin-gonic/gin"
)

// GET : /api/course/list
// GET : /api/course/list?id=1
func ListCourse(c *gin.Context) {
	id := c.DefaultQuery("id", "")

	if id == "" {
		var dataCourse []entity.ManageCourse
		entity.DB().Model(&entity.ManageCourse{}).
			Joins("Teacher").
			Joins("Ta").
			Joins("Room").
			Joins("Course").
			Find(&dataCourse)

		c.JSON(200, dataCourse)
		return
	} else {
		var dataCourse entity.ManageCourse
		entity.DB().Model(&entity.ManageCourse{}).
			Joins("Teacher").
			Joins("Ta").
			Joins("Room").
			Joins("Course").
			Find(&dataCourse, entity.DB().Where("id = ?", id))

		c.JSON(200, dataCourse)
		return
	}
}

// GET : /api/requestregister/type
// GET : /api/requestregister/type?id=1
func ListRequestType(c *gin.Context) {
	id := c.DefaultQuery("id", "")

	if id == "" {
		var dataType []entity.RequestType
		entity.DB().Model(&entity.RequestType{}).Find(&dataType)

		c.JSON(200, dataType)
		return
	} else {
		var dataType entity.RequestType
		entity.DB().Model(&entity.RequestType{}).Find(&dataType, entity.DB().Where("id = ?", id))

		c.JSON(200, dataType)
		return
	}

}

// GET : /api/requestregister/status
// GET : /api/requestregister/status?id=1
func ListRequestStatus(c *gin.Context) {
	id := c.DefaultQuery("id", "")

	if id == "" {
		var dataStatus []entity.RequestStatus
		entity.DB().Model(&entity.RequestStatus{}).Find(&dataStatus)

		c.JSON(200, dataStatus)
		return
	} else {
		var dataStatus entity.RequestStatus
		entity.DB().Model(&entity.RequestStatus{}).Find(&dataStatus, entity.DB().Where("id = ?", id))

		c.JSON(200, dataStatus)
		return
	}

}
