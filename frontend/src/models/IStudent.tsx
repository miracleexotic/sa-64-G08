export interface FacultyInterface {
	ID  : number
	name: string       
}

export interface DepartmentInterface {
	ID       :   number
	name     : string          
	facultyID: number           
	faculty  : FacultyInterface         
}

export interface PrefixInterface {
	ID	  : number
	value : string
}

export interface StudentRecordInterface {
	ID          : number 
	prefixID	: number
	prefix      : PrefixInterface
	firstname   : string
	lastname    : string
	personalID  : string 
	studentCode : string 
	departmentID: number           
	department  : DepartmentInterface      
}