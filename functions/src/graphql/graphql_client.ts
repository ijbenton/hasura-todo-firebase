import { GraphQLClient } from "graphql-request";
import * as functions from "firebase-functions";

const url  = functions.config().config.hasura_api_url;
const secret = functions.config().config.hasura_admin_secret;


export const client = new GraphQLClient(url, {
  headers: { "x-hasura-admin-secret": secret },
});
