# Hotel Management System

## Description
The Hotel Management System is a full-stack web application developed to manage hotel guest records efficiently.  
The backend is built using Spring Boot and exposes RESTful APIs for performing CRUD operations on guest data.  
The frontend is implemented using HTML, CSS, and JavaScript.  
All data is stored in a MySQL database.

---

## Key Features
- Create, read, update, and delete guest records
- Search guest details using Aadhar number
- Manage check-in and check-out dates
- Room allocation and payment tracking
- RESTful API architecture

---

## Technology Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs

### Frontend
- HTML
- CSS
- JavaScript

### Database
- MySQL

### Tools
- Maven
- IntelliJ IDEA / Eclipse
- Postman (for API testing)
---

## API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /hotel | Fetch all guest records |
| POST | /hotel | Add a new guest |
| GET | /hotel/aadhar/{aadhar} | Get guest by Aadhar |
| PUT | /hotel/update/{aadhar} | Update guest |
| DELETE | /hotel/delete/{aadhar} | Delete guest |

---

## How to Run
1. Clone the repository
2. Create a MySQL database
3. Update database credentials in application.properties
4. Run the Spring Boot application
5. Test APIs using Postman or frontend

---

## Future Enhancements
- JWT authentication and authorization
- Role-based access control
- Input validation
- Improved frontend UI
