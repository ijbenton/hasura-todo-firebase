import * as functions from "firebase-functions";

import { client } from "./graphql/graphql_client";
import { addUser } from "./graphql/mutations";

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.onSignUp = functions.auth.user().onCreate(async (user) => {
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    },
  };

  try {
    await admin.auth().setCustomUserClaims(user.uid, customClaims);
    const metadataRef = admin.database().ref("/metadata/" + user.uid);

    if (user && user.uid) {
      await client.request(addUser, {
        id: user.uid,
        email: user.email,
        name: user.email?.substring(0, user.email.indexOf("@")),
      });
    }

    return metadataRef.set({ refreshTime: new Date().getTime() });
  } catch (error) {
    console.error({ error });
  }
});
