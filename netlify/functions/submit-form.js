const { Octokit } = require("@octokit/rest");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

exports.handler = async function (event, context) {
  const { name, appName, mobile } = JSON.parse(event.body);

  try {
    await octokit.issues.create({
      owner: "CompeteX001",
      repo: "gwr-development",
      title: `New Submission: ${name}`,
      body: `Name: ${name}\nApp Name: ${appName}\nMobile Number: ${mobile}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to submit form." }),
    };
  }
};
