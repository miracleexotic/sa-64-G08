import { TeacherRecordInterface } from "./IStudent";

export interface TAInterface {
	ID   : number
	code : string        
	name : string        
}

export interface RoomInterface {
	ID          : number
	number      : number         
	studentCount: number           
}

export interface CourseInterface {
	ID    : number
	code  : string       
	name  : string        
	credit: number         
}

export interface ManageCourseInterface {
	ID : number
	group           : number              
	teachingTime    : number             
	ungraduatedYear : number             
	trimester       : number             
	manageCourseTime: Date | null      
	courseID        : number          
	course          : CourseInterface            
	roomID          : number           
	room            : RoomInterface             
	teacherID       : number             
	teacher         : TeacherRecordInterface    
	taID            : number             
	ta              : TAInterface       
}


