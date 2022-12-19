console.warn = console.error = function mockedConsole(message) {
  throw new Error(message);
};
