function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** A class for holding data entries */
var DataRegistry = /*#__PURE__*/function () {
  function DataRegistry() {
    _defineProperty(this, "registry", {});

    _defineProperty(this, "registryKeys", []);
  }

  var _proto = DataRegistry.prototype;

  /** Add one or more entries to the registry. */
  _proto.registerData = function registerData(entryOrEntries) {
    var _this = this;

    var entries = Array.isArray(entryOrEntries) ? entryOrEntries : [entryOrEntries];
    entries.forEach(function (currEntry) {
      if (currEntry.key in _this.registry && _this.registry[currEntry.key] != null) {
        console.debug('Overriding data registry key', currEntry.key);
      }

      _this.registry[currEntry.key] = currEntry;
      _this.registryKeys = Object.keys(_this.registry);
    });
  }
  /** Remove one or more entries to the registry. */
  ;

  _proto.unregisterData = function unregisterData(keyOrKeys) {
    var _this2 = this;

    var keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
    keys.forEach(function (currKey) {
      delete _this2.registry[currKey];
      _this2.registryKeys = Object.keys(_this2.registry);
    });
  }
  /** Returns all data registry entries. This value is not constant between calls. */
  ;

  _proto.entries = function entries() {
    return Object.values(this.registry);
  }
  /** Returns a specific entity from the registry, if it exists. */
  ;

  _proto.get = function get(key) {
    return this.registry[key];
  }
  /**
   * Returns the current registry keys.
   * This value is constant between calls if the keys themselves have not changed.
   */
  ;

  _proto.keys = function keys() {
    return this.registryKeys;
  };

  return DataRegistry;
}();

export { DataRegistry as default };