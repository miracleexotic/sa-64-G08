import { CourseInterface, ManageCourseInterface } from "./ICourses";
import { StudentRecordInterface } from "./IStudent";

export interface RequestTypeInterface {
	ID   : number   
	name : string 
}

export interface RequestStatusInterface {
	ID   : number   
	name : string 
}

export interface RequestRegisterInterface {
	ID          	: number 
	manageCourseID  : number
	manageCourse	: ManageCourseInterface
	typeID      	: number
	type        	: RequestTypeInterface
	statusID    	: number
	status      	: RequestStatusInterface
	ownerID     	: number
	owner       	: StudentRecordInterface
	requestTime 	: Date | null
}
