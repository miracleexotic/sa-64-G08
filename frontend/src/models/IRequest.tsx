import { ManageCourseInterface } from "./ICourses";
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
	requestTypeID   : number
	requestType     : RequestTypeInterface
	requestStatusID : number
	requestStatus   : RequestStatusInterface
	ownerID     	: number
	owner       	: StudentRecordInterface
	requestTime 	: Date | null
}
