import { ApolloServer, gql } from "apollo-server";

// In-memory database
let books = [
  { id: "1", title: "Book 1", author: "Author 1" },
  { id: "2", title: "Book 2", author: "Author 2" },
];

// Define GraphQL schema
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (_: any, { title, author }: any) => {
      const newBook = { id: String(books.length + 1), title, author };
      books.push(newBook);
      return newBook;
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
