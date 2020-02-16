/* eslint-disable import/no-extraneous-dependencies */
import { danger, fail } from 'danger';
import {
  checkForInvalidLocks,
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
} from '@airbnb/config-danger';

checkForConventionalPrefix();
checkForConventionalSquashCommit();
checkForInvalidLocks();
checkForJs();

function checkForJs() {
  const hasJS = danger.git.created_files.some(
    file =>
      (file.includes('src/') || file.includes('test/')) &&
      (file.endsWith('.js') || file.endsWith('.jsx')),
  );

  if (hasJS) {
    fail('JavaScript detected. All new source files must be TypeScript.');
  }
}
