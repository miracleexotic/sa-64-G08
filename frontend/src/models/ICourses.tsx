// import { TeacherRecordInterface } from "./IStudent";

export interface TAInterface {
	ID   : number
	TaCode : string        
	Name : string        
}

export interface RoomInterface {
	ID          : number
	Number      : number         
	StudentCount: number           
}

export interface CourseInterface {
	ID    : number
	CourseCode  : string       
	Name  : string        
	Credit: number         
}

export interface ManageCourseInterface {
	ID : number
	Group           : number              
	TeachingTime    : number             
	UngraduatedYear : number             
	Trimester       : number             
	ManageCourseTime: Date | null      
	CourseID        : number          
	Course          : CourseInterface            
	RoomID          : number           
	Room            : RoomInterface               
	TaID            : number             
	Ta              : TAInterface       
}


