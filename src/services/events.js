var Events = {
  pool: [],
  findEvent: function (eventName) {
    for (var i = this.pool.length - 1; i >= 0; i--) {
      if (this.pool[i].name === eventName) {
        return this.pool[i];
      }
    }
    return false;
  },
  uniqueCallback: function (event, callback) {
    var hasAdded = false;

    for (var i = 0; i < event.funcs.length; i++) {
      if (callback.toString() === event.funcs[i].toString()) {
        event.funcs[i] = callback;
        hasAdded = true;
        break;
      }
    }

    if (!hasAdded) {
      event.funcs.push(callback);
    }
  },
  removeEvent: function (eventName) {
    for (var i = this.pool.length - 1; i >= 0; i--) {
      if (this.pool[i].name === eventName) {
        this.pool.splice(i, 1);
        break;
      }
    }
  },
  listen: function (eventName, callback) {
    var event = this.findEvent(eventName);

    if (event) {
      this.uniqueCallback(event, callback);
    } else {
      event = {
        name: eventName,
        funcs: [callback],
        isOnce: false
      };
      this.pool.push(event);
    }
  },
  trigger: function (eventName, data) {
    var event = this.findEvent(eventName);
    if (event) {
      event.funcs.forEach(function (cb) {
        cb(data);
      });
      if (event.isOnce) {
        this.removeEvent(eventName);
      }
    }
  }
};

export default Events;
