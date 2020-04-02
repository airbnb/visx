// Default to web implementation if there is no platform extension resolver
if (typeof window !== 'undefined') {
  require('./core.web');
}
