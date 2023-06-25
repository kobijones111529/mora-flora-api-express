// No changes should be required in this file
import session from "express-session";
import * as warnings from "../constants/warnings.js";
import dotenv from "dotenv";

dotenv.config();

/*
  The cookie session makes it so a user can enters their username and password one time,
  and then we can keep them logged in. We do this by giving them a really long random string
  that the browser will pass back to us with every single request. The long random string is
  something the server can confirm, and then we know that we have the right user.

  You can see this string that gets passed back and forth in the
  `application` ->  `storage` -> `cookies` section of the chrome debugger
*/

const serverSessionSecret = () => {
  if (
    !process.env["SERVER_SESSION_SECRET"] ||
    process.env["SERVER_SESSION_SECRET"].length < 8 ||
    process.env["SERVER_SESSION_SECRET"] === warnings.exampleBadSecret
  ) {
    // Warning if user doesn't have a good secret
    console.log(warnings.badSecret);
  }

  return process.env["SERVER_SESSION_SECRET"];
};

export default session({
  secret: serverSessionSecret() || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // Set to 7 days - 1000ms * 60 seconds * 60 minutes * 24 hours * 7 days
  },
});
