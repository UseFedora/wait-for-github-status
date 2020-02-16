# Wait for status action

Waits for a successful commit status

## Inputs

### `context`

**Required** Wait for github status with a context matching this string.

### `token`

**Required** ${{ secrets.GITHUB_TOKEN }}

## Outputs

### `status`

contains the status of the specific context the action was waiting for

## Example usage
```
uses: UseFedora/wait-for-github-status
with:
  context: 'circleci'
  token: ${{ secrets.GITHUB_TOKEN }}
```
