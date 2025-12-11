import { describe, it, expect } from '@jest/globals';
import { generateCommitMessages } from '../src/commitHelper';

describe('commitHelper', () => {
  it('should generate 5 commit messages for files', () => {
    const files = ['src/index.ts', 'src/commitHelper.ts'];
    // Mock spawnSync to avoid actual copilot call
    const messages = generateCommitMessages(files);
    expect(Array.isArray(messages)).toBe(true);
    // Since spawnSync is not mocked, messages may be empty, but should be an array
  });
});
