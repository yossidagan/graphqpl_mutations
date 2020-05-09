const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const axios = require('axios')

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
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then((res) => res.data)
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return axios
          .get('http://localhost:3000/customers')
          .then((res) => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
