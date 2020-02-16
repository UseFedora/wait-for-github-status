const core = require('@actions/core');
const github = require('@actions/github');
const poll = require('./poll')

// https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
const TERMINAL_STATES = ['failure', 'error', 'success']
// Get state of the specific status we care about
function isNonTerminalStatus(status) {
  if(!status) {
    console.log("no status for this context found")
    return true
  }
  console.log(`${status.context} - ${status.description} - ${status.state}`)
  if(TERMINAL_STATES.includes(status.state)) {
    console.log("Complete!")
    return false
  }

  else {
    return true
  }
}

async function getContextStatus({token, ref, owner, repo, context}) {
  const octokit = new github.GitHub(token);
  const {data} = await octokit.repos.getCombinedStatusForRef({
    owner,
    repo,
    ref
  })
  return data.statuses.find((contextStatus) => contextStatus.context.includes(context))
}

async function run() {
  try {
    // `who-to-greet` input defined in action metadata file
    const context = core.getInput('context');
    const token = core.getInput('token');
    const {payload} = github.context
    const ref = payload.after
    const owner = payload.repository.owner.login
    const repo = payload.repository.name

    console.log({ref, owner, repo, context})
    console.log(`Waiting for ${context} status to suceed or fail!`);

    const getStatusFn = () => getContextStatus({token, ref, owner, repo, context})
    const terminalStatus = await poll(getStatusFn, isNonTerminalStatus, 5000)
    console.log(JSON.stringify(terminalStatus, undefined, 2))
    core.setOutput('status', terminalStatus.state);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run()
