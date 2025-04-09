# Employee Management System

A GraphQL-based Employee Management System built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Signup/Login)
- Employee crud Operations
- Search Employees by Department and Designation
- JWT-based Authentication
- Error Handling


. Create a .env file in the root directory and add your configuration:
```
PORT=7000
MONGODB_URI=mongodb+srv://101423471:mypassword@labtest.yysig.mongodb.net/comp3133_101423471_assigment1?retryWrites=true&w=majority&appName=assignment1
JWT_SECRET=your_jwt_secret_key
```

## GraphQL API Examples

### User Authentication

1. Signup
```graphql
mutation {
  signup(input: {
    username: "test",
    email: "test@example.com",
    password: "password"
  }) {
    token
    user {
      id
      username
      email
    }
  }
}
```

2. Login
```graphql
query {
  login(email: "test@example.com", password: "password") {
    token
    user {
      id
      username
      email
    }
  }
}
```

### Employee Operations

1. Add Employee
```graphql
mutation {
  addEmployee(input: {
    first_name: "Fernando",
    last_name: "Chavez",
    email: "fer@example.com",
    gender: "Male",
    designation: "Software Engineer",
    salary: 5000,
    date_of_joining: "2024-02-13",
    department: "Engineering",
    employee_photo: "fer.png"
  }) {
    id
    first_name
    last_name
    email
  }
}
```

2. Get All Employees
```graphql
query {
  getAllEmployees {
    id
    first_name
    last_name
    email
    designation
    department
    salary
  }
}
```

3. Search Employees
```graphql
query {
  searchEmployeesByDepartment(department: "Engineering") {
    id
    first_name
    last_name
    designation
  }
}
```

## Testing

1. The API can be tested using the GraphQL Playground available at `http://localhost:7000/graphql`
2. For authentication, add the JWT token:

  Authorization chosen in Postman : "Bearer your_token_here"

