package controller

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/miracleexotic/backend/entity"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

// POST : /api/login
func StudentLogin(c *gin.Context) {
	var data map[string]string

	if err := c.ShouldBind(&data); err != nil {
		log.Fatal(err)
	}

	var student entity.StudentRecord

	row := entity.DB().Model(&entity.StudentRecord{}).Where("code = ?", data["Student_code"]).First(&student)

	if row.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "user not found"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(student.Password), []byte(data["Password"])); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "incorrect password"})
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(student.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // 1 day
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "could not login"})
		return
	}

	c.SetCookie("jwt", token, 24*60*60, "", "", false, true)

	c.JSON(200, gin.H{
		"message":      "success",
		"Student_code": student.Code,
	})
}

// GET : /api/login
func GetStudentLogin(c *gin.Context) {
	cookie, _ := c.Cookie("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthenticated"})
		return
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var studentRecord entity.StudentRecord
	entity.DB().Model(&entity.StudentRecord{}).Joins("Prefix").Where("`student_records`.`id` = ?", claims.Issuer).First(&studentRecord)

	c.JSON(200, studentRecord)
}

// POST : /api/logout
func StudentLogout(c *gin.Context) {
	c.SetCookie("jwt", "", -1, "", "", false, true)

	c.JSON(200, gin.H{"message": "success"})
}
