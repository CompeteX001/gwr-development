const { Octokit } = require("@octokit/rest");
const twilio = require('twilio');

// Replace with your own GitHub token, Twilio credentials, and repository details
const GITHUB_TOKEN = "your_github_token";
const TWILIO_ACCOUNT_SID = "your_twilio_account_sid";
const TWILIO_AUTH_TOKEN = "your_twilio_auth_token";
const TWILIO_PHONE_NUMBER = "your_twilio_phone_number";
const RECIPIENT_PHONE_NUMBER = "recipient_phone_number";

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

exports.handler = async function (event, context) {
  const { name, appName } = JSON.parse(event.body);

  // Create a new issue in the GitHub repository
  await octokit.issues.create({
    owner: "YourUsername",
    repo: "gwr-development",
    title: `New Submission: ${name}`,
    body: `Name: ${name}\nApp Name: ${appName}`,
  });

  // Send an SMS notification using Twilio
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  await client.messages.create({
    body: `New submission from ${name} for the app ${appName}.`,
    from: TWILIO_PHONE_NUMBER,
    to: RECIPIENT_PHONE_NUMBER,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Form submitted successfully!" }),
  };
};
