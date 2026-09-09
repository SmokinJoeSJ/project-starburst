import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

/** @param {{base: string, head: string, sameRepository: boolean}} pr */
export function validatePrTarget(pr) {
  if (
    pr.base === 'redesign-2026' &&
    /^feature\/[a-z0-9][a-z0-9-]*$/.test(pr.head)
  )
    return;
  if (pr.base === 'main' && pr.head === 'redesign-2026' && pr.sameRepository)
    return;
  throw new Error(
    'Feature PRs must use feature/<task> and target redesign-2026. Only the same-repository redesign-2026 launch PR may target main; owner launch approval is still required.',
  );
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const file = process.env.GITHUB_EVENT_PATH;
  if (!file) throw new Error('GITHUB_EVENT_PATH is required.');
  const { pull_request: pr } = JSON.parse(readFileSync(file, 'utf8'));
  if (!pr) throw new Error('Expected a pull_request event.');
  validatePrTarget({
    base: pr.base.ref,
    head: pr.head.ref,
    sameRepository: pr.head.repo?.full_name === pr.base.repo.full_name,
  });
  console.log('PR target policy passed.');
}
