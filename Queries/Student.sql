CREATE TABLE STUDENT_ENTRY (
  Id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Surname VARCHAR(50) NOT NULL,
  Current_Edu VARCHAR(100) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  Aadhaar_Number CHAR(12) NOT NULL,
  Age TINYINT UNSIGNED NOT NULL,
  Reference VARCHAR(50),
  Mobile_Number VARCHAR(15) NOT NULL,
  Date_Of_Birth DATE NOT NULL,
  Course VARCHAR(100) NOT NULL,
  Gender ENUM('Male','Female') NOT NULL
);

truncate student_entry;
use TS;
INSERT INTO student_entry
(Name, Surname, Current_Edu, Address, Aadhaar_Number, Age, Reference, Mobile_Number, Date_Of_Birth, Course, Gender)
VALUES
-- Computer Fundamentals
('Ayaan', 'Khan', '10th', 'Bhiwandi', '472938561204', 16, 'Banner', '9876543201', '2008-03-12', 'Computer Fundamentals', 'Male'),
('Riya', 'Patel', '11th', 'Thane', '593847261095', 17, 'Friend', '8765432190', '2007-07-22', 'Computer Fundamentals', 'Female'),

-- Computer Champs
('Imran', 'Ansari', '10th', 'Bhiwandi', '516492837104', 16, 'Banner', '9345612780', '2008-02-14', 'Computer Champs', 'Male'),
('Pooja', 'Yadav', '11th', 'Thane', '690283745612', 17, 'Instagram', '8123456798', '2007-06-30', 'Computer Champs', 'Female'),
('Rahul', 'Mishra', '12th', 'Kalyan', '738294615027', 18, 'Friend', '9012345678', '2006-12-01', 'Computer Champs', 'Male'),
-- Advanced Excel
('Hashir', 'Ansari', '12th', 'Bhiwandi', '638291047526', 16, 'Banner', '9890123456', '2008-05-21', 'Advanced Excel', 'Male'),
('Aditi', 'Deshmukh', 'Graduation', 'Dombivli', '716382950417', 21, 'Instagram', '8765901234', '2003-09-14', 'Advanced Excel', 'Female'),

-- Tally Prime + GST
('Noman', 'Shaikh', '12th', 'Bhiwandi', '824917503682', 18, 'Banner', '9988123456', '2006-06-06', 'Tally Prime + GST', 'Male'),
('Aman', 'Singh', '11th', 'Bhiwandi', '915472803649', 17, 'Banner', '9321456780', '2007-12-20', 'Tally Prime + GST', 'Male');


truncate table student_entry;
use TS;
SELECT * FROM student_entry;
desc student_entry;

select *  FROM STUDENT_ENTRY WHERE ID = 4;

INSERT INTO STUDENT_ENTRY
(Name, Surname, Current_Edu, Address, Aadhaar_Number, Age, Reference, Mobile_Number, Date_Of_Birth, Course, Gender)
VALUES
('Rahul', 'Sharma', 'Graduation', 'Delhi', '123456789012', 22, 'Friend', '9876543210', '2002-05-14', 'Computer Fundamentals', 'Male'),

('Priya', 'Verma', 'Post Graduation', 'Mumbai', '234567890123', 24, 'Online', '9123456789', '2000-11-20', 'Advanced Excel', 'Female'),

('Amit', 'Kumar', 'Diploma', 'Patna', '345678901234', 21, 'Relative', '9012345678', '2003-03-08', 'Tally with GST', 'Male');


ALTER TABLE STUDENT_ENTRY CHANGE Current_Edu Education VARCHAR(100);

