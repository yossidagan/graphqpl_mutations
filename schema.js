const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: CustomerType,
    args: {
      id: { type: GraphQLString }
    },
    resolve(parent, args) {}
  },
  customers: {
    type: new GraphQLList(CustomerType),
    resolve(parent, args) {}
  }
})

module.exports = new GraphQLSchema({})
