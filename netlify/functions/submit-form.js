const { Octokit } = require("@octokit/rest");
const twilio = require('twilio');

// Replace with your own GitHub token, Twilio credentials, and repository details
const GITHUB_TOKEN = "your_github_token";
const REPO_OWNER = "your_github_username";
const REPO_NAME = "user-data-storage";
const TWILIO_ACCOUNT_SID = "your_twilio_account_sid";
const TWILIO_AUTH_TOKEN = "your_twilio_auth_token";
const TWILIO_PHONE_NUMBER = "your_twilio_phone_number";
const YOUR_PHONE_NUMBER = "your_phone_number";

const octokit = new Octokit({ auth: GITHUB_TOKEN });
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { name, appName, mobile } = JSON.parse(event.body);
    const content = `Name: ${name}\nApp Name: ${appName}\nMobile: ${mobile}\n`;

    // Store data in GitHub
    await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: `data/${Date.now()}.txt`,
        message: `New submission from ${name}`,
        content: Buffer.from(content).toString('base64'),
    });

    // Send SMS notification
    await client.messages.create({
        body: `New submission: ${name}, ${appName}, ${mobile}`,
        from: TWILIO_PHONE_NUMBER,
        to: YOUR_PHONE_NUMBER,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully!' }),
    };
};
