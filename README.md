# GWR Development

This repository contains the source code for the GWR Development website. The website includes a form for submitting user information, which is then stored as issues in this GitHub repository.

## Files

- `index.html`: The main HTML file with the form.
- `app.js`: JavaScript to handle form submission.
- `netlify/functions/submit-form.js`: Netlify function to create GitHub issues from form submissions.
- `.github/workflows/deploy-netlify.yml`: GitHub Actions workflow to deploy the Netlify function.

## Setup

1. **Add GitHub Secrets**:
   - `GITHUB_TOKEN`: Your GitHub personal access token.
   - `NETLIFY_AUTH_TOKEN`: Your Netlify authentication token.
   - `NETLIFY_SITE_ID`: Your Netlify site ID.

2. **Deploy**:
   - Commit and push your changes to the `main` branch.
   - The GitHub Actions workflow will automatically deploy the Netlify function.

## Usage

1. Open the website and fill out the form.
2. Click the submit button.
3. The form data will be stored as an issue in this GitHub repository.
