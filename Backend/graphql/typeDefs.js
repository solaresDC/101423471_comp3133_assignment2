const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        created_at: String
        updated_at: String
    }

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String
        updated_at: String
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        login(email: String!, password: String!): AuthPayload!
        getAllEmployees: [Employee!]!
        getEmployeeById(id: ID!): Employee
        searchEmployeesByDepartment(department: String!): [Employee!]!
        searchEmployeesByDesignation(designation: String!): [Employee!]!
    }

    input SignupInput {
        username: String!
        email: String!
        password: String!
    }

    input EmployeeInput {
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }

    input UpdateEmployeeInput {
        first_name: String
        last_name: String
        email: String
        gender: String
        designation: String
        salary: Float
        department: String
        employee_photo: String
    }

    type Mutation {
        signup(input: SignupInput!): AuthPayload!
        addEmployee(input: EmployeeInput!): Employee!
        updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!
        deleteEmployee(id: ID!): Boolean!
    }
`;

module.exports = typeDefs;