BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "request_statuses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "request_types" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "theses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"theses_name"	text,
	"theses_type"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "faculties" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "departments" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"faculty_id"	integer,
	CONSTRAINT "fk_faculties_department" FOREIGN KEY("faculty_id") REFERENCES "faculties"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "positions" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"position_name"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "educations" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"education_from"	text,
	"education_department"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "teacher_records" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"teacher_name"	text,
	"teacher_email"	text,
	"position_id"	integer,
	"education_id"	integer,
	"theses_id"	integer,
	"department_id"	integer,
	"password"	text,
	CONSTRAINT "fk_theses_teacher_record" FOREIGN KEY("theses_id") REFERENCES "theses"("id"),
	CONSTRAINT "fk_departments_teacher_record" FOREIGN KEY("department_id") REFERENCES "departments"("id"),
	CONSTRAINT "fk_positions_teacher_record" FOREIGN KEY("position_id") REFERENCES "positions"("id"),
	CONSTRAINT "fk_educations_teacher_record" FOREIGN KEY("education_id") REFERENCES "educations"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "prefixes" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"value"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "staff_accounts" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"prefix_id"	integer,
	"firstname"	text,
	"lastname"	text,
	"code"	text,
	"password"	text,
	CONSTRAINT "fk_prefixes_staff_account" FOREIGN KEY("prefix_id") REFERENCES "prefixes"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "student_records" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"prefix_id"	integer,
	"firstname"	text,
	"lastname"	text,
	"personal_id"	text,
	"code"	text,
	"password"	text,
	"department_id"	integer,
	"adviser_id"	integer,
	"creator_id"	integer,
	CONSTRAINT "fk_staff_accounts_student_record" FOREIGN KEY("creator_id") REFERENCES "staff_accounts"("id"),
	CONSTRAINT "fk_departments_student_record" FOREIGN KEY("department_id") REFERENCES "departments"("id"),
	CONSTRAINT "fk_prefixes_student_record" FOREIGN KEY("prefix_id") REFERENCES "prefixes"("id"),
	CONSTRAINT "fk_teacher_records_student_record" FOREIGN KEY("adviser_id") REFERENCES "teacher_records"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "rooms" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"number"	integer,
	"student_count"	integer,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "ta" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"code"	text,
	"name"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "courses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"code"	text,
	"name"	text,
	"credit"	integer,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "manage_courses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"group"	integer,
	"teaching_time"	integer,
	"ungraduated_year"	integer,
	"trimester"	integer,
	"manage_course_time"	datetime,
	"course_id"	integer,
	"room_id"	integer,
	"teacher_id"	integer,
	"ta_id"	integer,
	CONSTRAINT "fk_ta_manage_course" FOREIGN KEY("ta_id") REFERENCES "ta"("id"),
	CONSTRAINT "fk_rooms_manage_course" FOREIGN KEY("room_id") REFERENCES "rooms"("id"),
	CONSTRAINT "fk_courses_manage_course" FOREIGN KEY("course_id") REFERENCES "courses"("id"),
	CONSTRAINT "fk_teacher_records_manage_course" FOREIGN KEY("teacher_id") REFERENCES "teacher_records"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "request_registers" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"request_time"	datetime,
	"manage_course_id"	integer,
	"type_id"	integer,
	"status_id"	integer,
	"owner_id"	integer,
	CONSTRAINT "fk_manage_courses_request_register" FOREIGN KEY("manage_course_id") REFERENCES "manage_courses"("id"),
	CONSTRAINT "fk_student_records_request_register" FOREIGN KEY("owner_id") REFERENCES "student_records"("id"),
	CONSTRAINT "fk_request_types_request_register" FOREIGN KEY("type_id") REFERENCES "request_types"("id"),
	CONSTRAINT "fk_request_statuses_request_register" FOREIGN KEY("status_id") REFERENCES "request_statuses"("id"),
	PRIMARY KEY("id")
);
CREATE INDEX IF NOT EXISTS "idx_request_statuses_deleted_at" ON "request_statuses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_request_types_deleted_at" ON "request_types" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_theses_deleted_at" ON "theses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_faculties_deleted_at" ON "faculties" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_departments_deleted_at" ON "departments" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_positions_deleted_at" ON "positions" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_educations_deleted_at" ON "educations" (
	"deleted_at"
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_teacher_records_teacher_email" ON "teacher_records" (
	"teacher_email"
);
CREATE INDEX IF NOT EXISTS "idx_teacher_records_deleted_at" ON "teacher_records" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_prefixes_deleted_at" ON "prefixes" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_staff_accounts_deleted_at" ON "staff_accounts" (
	"deleted_at"
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_staff_accounts_code" ON "staff_accounts" (
	"code"
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_student_records_code" ON "student_records" (
	"code"
);
CREATE INDEX IF NOT EXISTS "idx_student_records_deleted_at" ON "student_records" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_rooms_deleted_at" ON "rooms" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_ta_deleted_at" ON "ta" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_courses_deleted_at" ON "courses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_manage_courses_deleted_at" ON "manage_courses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_request_registers_deleted_at" ON "request_registers" (
	"deleted_at"
);
COMMIT;
