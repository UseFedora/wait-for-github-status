# Wait for status action (WIP)

Waits for a successful commit status

## Inputs

### `context`

**Required** Wait for github status with a context matching this string.

## Outputs

### `status`

contains the status of the specific context the action was waiting for

## Example usage

uses: UseFedora/wait-for-github-status
with:
  context: 'circleci'
