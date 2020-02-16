const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    // `who-to-greet` input defined in action metadata file
    const context = core.getInput("context");
    const token = new github.GitHub(myToken);

    const ref = github.context.payload.after
    const owner = github.context.repository.owner.login
    const repo = github.context.repository.name

    console.log({ref, owner, repo, context})
    console.log(`Waiting for ${context}!`);

    const octokit = new github.GitHub(token);
    const {data} = await octokit.repos.getCombinedStatusForRef({
      owner,
      repo,
      ref
    })
    console.log(JSON.stringify(data, undefined, 2))

    core.setOutput("status", "success");
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}
