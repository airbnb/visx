import React from 'react';
import { render } from '@testing-library/react';
import useDataRegistry from '../../src/hooks/useDataRegistry';

describe('useDataRegistry', () => {
  it('should be defined', () => {
    expect(useDataRegistry).toBeDefined();
  });

  it('should provide a DataRegistry', () => {
    expect.assertions(1);

    const RegistryConsumer = () => {
      const registry = useDataRegistry();
      expect(registry).toBeDefined();

      return null;
    };

    render(<RegistryConsumer />);
  });
});
