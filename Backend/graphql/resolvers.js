const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const { UserInputError, AuthenticationError } = require('apollo-server-express');


const resolvers = {
    Query: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new UserInputError('User not found');
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new AuthenticationError('Invalid password');
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            return {
            token,
                user
            };
        },

        getAllEmployees: async (_, __, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }
            return await Employee.find();
        },

        getEmployeeById: async (_, { id }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new UserInputError('Employee not found');
            }
            return employee;
        },

        searchEmployeesByDepartment: async (_, { department }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }
            return await Employee.find({ department });
        },

        searchEmployeesByDesignation: async (_, { designation }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }
            return await Employee.find({ designation });
        },
    },

    Mutation: {
        signup: async (_, { input: { username, email, password } }) => {
            const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
            });
            if (existingUser) {
                throw new UserInputError('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                username,
            email,
                password: hashedPassword
            });
        await user.save();

            const token = jwt.sign(
            { userId: user.id },
                process.env.JWT_SECRET,
            { expiresIn: '1d' }
            );

            return {
                token,
                user
            };
        },

        addEmployee: async (_, { input }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }
            const existingEmployee = await Employee.findOne({ email: input.email });
            if (existingEmployee) {
                throw new UserInputError('Employee with this email already exists');
            }
            const employee = new Employee({
                ...input,
                date_of_joining: new Date(input.date_of_joining)
            });
            return await employee.save();
        },



        updateEmployee: async (_, { id, input }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }

            const employee = await Employee.findById(id);
            if (!employee) {
                throw new UserInputError('Employee not found');
            }
            if (input.email && input.email !== employee.email) {
                const existingEmployee = await Employee.findOne({ email: input.email });
                if (existingEmployee) {
                    throw new UserInputError('Email already in use');
                }
            }
            return await Employee.findByIdAndUpdate(
                id,
                { ...input, updated_at: new Date() },
                { new: true, runValidators: true }
            );
        },

        deleteEmployee: async (_, { id }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }
            const result = await Employee.findByIdAndDelete(id);
            if (!result) {
                throw new UserInputError('Employee not found');
            }



            return true;
        },
    },
};



module.exports = resolvers;