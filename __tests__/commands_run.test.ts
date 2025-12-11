import { describe, it, expect, jest } from '@jest/globals';
import * as gitHelper from '../src/gitHelper';
import * as commitHelper from '../src/commitHelper';
import { runCommand } from '../src/commands/run';

describe('commands/run', () => {
  it('should run workflow when changes exist', async () => {
    jest.spyOn(gitHelper, 'ensureBranch').mockResolvedValue('feature/test');
    jest.spyOn(gitHelper, 'addAll').mockResolvedValue();
    jest.spyOn(gitHelper, 'getStagedFiles').mockResolvedValue(['file1.ts']);
    jest.spyOn(commitHelper, 'commitStagedFiles').mockResolvedValue();
    jest.spyOn(gitHelper, 'pushCurrentBranch').mockResolvedValue();
    await expect(runCommand()).resolves.toBeUndefined();
  });

  it('should exit if no staged files', async () => {
    jest.spyOn(gitHelper, 'ensureBranch').mockResolvedValue('feature/test');
    jest.spyOn(gitHelper, 'addAll').mockResolvedValue();
    jest.spyOn(gitHelper, 'getStagedFiles').mockResolvedValue([]);
    await expect(runCommand()).resolves.toBeUndefined();
  });
});
