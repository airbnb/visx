function mockedConsole(...args) {
  throw new Error(args);
}

console.warn = mockedConsole;
console.error = mockedConsole;
