const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // `who-to-greet` input defined in action metadata file
    const context = core.getInput('context');
    const token = core.getInput('token');
    const {payload} = github
    const ref = payload.after
    const owner = payload.repository.owner.login
    const repo = payload.repository.name

    console.log({ref, owner, repo, context})
    console.log(`Waiting for ${context}!`);

    const octokit = new github.GitHub(token);
    const {data} = await octokit.repos.getCombinedStatusForRef({
      owner,
      repo,
      ref
    })
    console.log(JSON.stringify(data, undefined, 2))

    core.setOutput('status', 'success');
    // Get the JSON webhook payload for the event that triggered the workflow
    const payloadStr = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payloadStr}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run()
