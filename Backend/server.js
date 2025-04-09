const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const auth = require('./middleware/auth');
require('dotenv').config();



const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
            typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
        const user = auth.getUser(token);
            return { user };
        },
        formatError: (error) => {
            return {
                message: error.message
            };
        }
    });

await server.start();
    server.applyMiddleware({ app });

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        console.log(`GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();

