// Cribbed from https://dev.to/jakubkoci/polling-with-async-await-25p4
async function poll(fn, fnCondition, ms) {
  let result = await fn();
  while (fnCondition(result)) {
    await wait(ms);
    result = await fn();
  }
  return result;
}

function wait(ms = 1000) {
  return new Promise(resolve => {
    console.log(`waiting ${ms} ms...`);
    setTimeout(resolve, ms);
  });
}

module.exports = poll
