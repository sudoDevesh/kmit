module.exports = {
  prompt: jest.fn(() => Promise.resolve({ selection: 'mock', custom: 'mock' })),
};