const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
        launches: [Launch]!
        launch(id: ID!): Launch
        me: User
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse
        login(email: String): User
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
        token: String
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

`;

module.exports = typeDefs;
