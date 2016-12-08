event-target-mixin.js
========

#### W3C EventTarget mixin for custom objects ####

## Usage ##

```javascript
import EventTarget from 'event-target-mixin';

// Applying EventTarget to custom object
let Car = () => {
  EventTarget.call(this);
  this.start = () => {
    this.dispatchEvent(new Event('started'));
  };
};

// Using events
let car = new Car();
car.addEventListener('started', (event) => { // setting onStarted should work too
  if (event.type === 'started')
    alert('vroom vroom!');
});
car.start();
```

## Build ##
```shell
$ npm install
$ npm run build
```

## License ##

#### MIT ####

forked from [ShareIt-project/EventTarget.js](https://github.com/ShareIt-project/EventTarget.js)
and [mrdoob/eventdispatcher.js](https://github.com/mrdoob/eventdispatcher.js)

see LICENSE file

## Links ##

[W3C DOM4 specification](https://www.w3.org/TR/dom/#interface-eventtarget)  
[DOM Living Standard specification](https://dom.spec.whatwg.org/#interface-eventtarget)
