import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
  } from 'graphql';

export default new GraphQLObjectType({
  name: 'Test',
  description: 'A test',
  fields: () => ({
    campaign: {
      type: GraphQLString
    },
    links: {
      type: new GraphQLObjectType({
        name: 'links',
        fields: () => ({
          search: {
            type: new GraphQLObjectType({
              name: 'search',
              fields: () => ({
                context: {
                  type: new GraphQLObjectType({
                    name: 'context',
                    fields: () => ({
                      allAvailableDates: {
                        type: GraphQLString
                      },
                      availability: {
                        type: GraphQLString
                      },
                      campaign: {
                        type: GraphQLString
                      },
                      connectorCode: {
                        type: GraphQLString
                      },
                      context: {
                        type: GraphQLString
                      },
                      depAirport: {
                        type: GraphQLString
                      },
                      end: {
                        type: GraphQLString
                      },
                      flexible: {
                        type: GraphQLString
                      },
                      goingTo: {
                        type: GraphQLString
                      },
                      language: {
                        type: GraphQLString
                      },
                      occupation: {
                        type: GraphQLString
                      },
                      origin: {
                        type: GraphQLString
                      },
                      resortCategory: {
                        type: GraphQLString
                      },
                      resortCode: {
                        type: GraphQLString
                      },
                      routingInfo: {
                        type: new GraphQLList(GraphQLString)
                      },
                      sbDepAirport: {
                        type: GraphQLString
                      },
                      sort: {
                        type: GraphQLString
                      },
                      start: {
                        type: GraphQLString
                      },
                      type: {
                        type: GraphQLString
                      },
                      value: {
                        type: GraphQLString
                      },
                      when: {
                        type: GraphQLString
                      }
                    })
                  })
                }
              })
            })
          },
          href: {
            type: GraphQLString
          }
        })
      })
    },
    sort: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});