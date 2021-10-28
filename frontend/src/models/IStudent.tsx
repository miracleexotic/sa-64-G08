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

export interface TeacherRecordInterface {
	ID           : number
	teacherName : string          
	teacherEmail: string          
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
	code        : string 
	departmentID: number           
	department  : DepartmentInterface      
	adviserID   : number          
	adviser     : TeacherRecordInterface
	
	// TODO : check creator?
	// TODO : can del teacher?
}