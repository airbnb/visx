const Enzyme = require('enzyme');
const Adapteer = require('enzyme-adapter-react-16');

Enzyme.configure({
  adapter: new Adapter(),
});
