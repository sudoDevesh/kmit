import { describe, it, expect, jest } from '@jest/globals';
import * as gitHelper from '../src/gitHelper';
import { checkCommand } from '../src/commands/check';

describe('commands/check', () => {
  it('should handle main/master branch', async () => {
    jest.spyOn(gitHelper, 'getCurrentBranch').mockResolvedValue('main');
    jest.spyOn(gitHelper, 'getStagedFiles').mockResolvedValue(['file1.ts']);
    jest.spyOn(gitHelper, 'suggestBranchName').mockResolvedValue('feat/new-feature');
    jest.spyOn(gitHelper, 'createOrCheckoutBranch').mockResolvedValue();
    await expect(checkCommand()).resolves.toBeUndefined();
  });
});
