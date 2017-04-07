/**
 * @author mrdoob / http://mrdoob.com
 * @author Jesús Leganés Combarro "Piranna" <piranna@gmail.com>
 * @author Peter Tseng
 *
 * Not implemented: capture, once, and passive options
 */
/* eslint-env browser */

export default function EventTarget() {
  const listeners = {};

  this.addEventListener = (type, listener) => {
    if (!listener) return;

    if (listeners[type] === undefined) listeners[type] = [];
    const listenersForType = listeners[type];

    for (let i = 0; i < listenersForType.length; i += 1) {
      if (listenersForType[i] === listener) return;
    }

    listenersForType.push(listener);
  };

  this.dispatchEvent = (event) => {
    const type = event.type;
    if (type === null || type === '') {
      throw new Error('UNSPECIFIED_EVENT_TYPE_ERR');
    }

    const listenersForType = listeners[type] || [];

    const eventHandlerProperty = this[`on${type}`];
    if (typeof eventHandlerProperty === 'function') {
      listenersForType.push(eventHandlerProperty);
    }

    Object.defineProperties(event, {
      currentTarget: { value: this },
      // isTrusted: {value: true, enumerable: true}, // Does not work in Chrome
      eventPhase: { value: Event.NONE },
      srcElement: { value: this },
      target: { value: this },
    });
    let stopImmediatePropagation = false;
    event.stopImmediatePropagation = () => {
      stopImmediatePropagation = true;
    };

    for (let i = 0; i < listenersForType.length; i += 1) {
      if (stopImmediatePropagation) break;
      listenersForType[i].call(this, event);
    }

    return !event.defaultPrevented;
  };

  this.removeEventListener = (type, listener) => {
    if (!listener) return;

    const listenersForType = listeners[type];
    if (listenersForType === undefined) return;

    for (let i = 0; i < listenersForType.length; i += 1) {
      if (listenersForType[i] === listener) {
        listenersForType.splice(i, 1);
        break;
      }
    }

    if (listenersForType.length === 0) delete listeners[type];
  };
}
