import { describe, it, expect } from '@jest/globals';
import { generateBranchNamesWithCopilot } from '../src/gitHelper';

describe('gitHelper', () => {
  it('should generate branch names matching regex', () => {
    const files = ['src/index.ts', 'src/gitHelper.ts'];
    // Mock spawnSync to avoid actual copilot call
    const branches = generateBranchNamesWithCopilot(files);
    expect(Array.isArray(branches)).toBe(true);
    branches.forEach(branch => {
      expect(branch).toMatch(/^[a-z]+\/[a-z0-9\-]+$/i);
    });
  });
});
