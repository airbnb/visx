describe('@visx/theme', () => {
  it('loads scaffolded root and react entries', async () => {
    await expect(import('../src')).resolves.toBeDefined();
    await expect(import('../src/react')).resolves.toBeDefined();
  });
});
