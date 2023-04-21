import React from 'react';
import { createRoot } from 'react-dom/client';
import Example from './Example';
import './sandbox-styles.css';
var root = createRoot(document.getElementById('root'));
root.render(<Example />);
