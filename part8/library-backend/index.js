const { PubSub, ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { MONGODB_URI } = require('./utils/config.js')
const { JWT_SECRET } = require('./utils/config.js')
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
const pubsub = new PubSub()

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String
    bookCount: Int
    born: Int
    books: [Book!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String):[Book!]!
    allAuthors: [Author!]!
    me: User
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  } 
`

const resolvers = {
  Query: {
    bookCount: async () => {
      let books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      let authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      let query = {}
      if (args.genre) query.genres = { $in: [args.genre] }
      let books = await Book.find(query).populate('author')
      return books
    },
    allAuthors: async (root, args) => {
      let authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    genres: async () => {
      let books = await Book.find({})
      return books.reduce((a, c) => [...a].concat(c.genres), []).filter((value, index, self) => self.indexOf(value) === index)
    }
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if (await Book.exists({ title: args.title })) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }
      try {
        let author = await Author.findOneAndUpdate({ name: args.author }, { name: args.author }, { new: true, upsert: true, runValidators: true })
        const book = new Book({ ...args, author: author })
        await book.save()
        author.books.push(book)
        await author.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        console.log(error)
        throw new UserInputError('Invalid arguments when adding book!', {
          invalidArgs: args,
        })
      }
    },
    editAuthor: (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})