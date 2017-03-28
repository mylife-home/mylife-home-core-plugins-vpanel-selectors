'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger('core-plugins-vpanel-selectors.InputManager');

const InputManager = require('./services/input-manager');

module.exports = class SmartInput {
  constructor(config) {

    for(let i=0; i<4; ++i) {
      this[`o${i}`] = 'off';
    }

    this._manager = new InputManager();

    // http://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
    // seps are '|'' and ' ', multiple separators act as one
    const readTriggers = (conf) => {
      return (conf || '').split(/(?:\|| )+/);
    }

    const createAction = (i) => {
      return () => this._trigger(i);
    }

    for(let i=0; i<4; ++i) {
      const triggers = (config[`triggers${i}`] || '').split(/(?:\|| )+/);
      if(!triggers.length) { continue; }
      const triggerAction = createAction(i);

      logger.debug(`configuring triggers: ${triggers}`);
      for(const trigger of triggers) {
        this._manager.config[trigger] = triggerAction;
      }
    }
  }

  _trigger(x) {
    const name = `o${x}`;
    this[name] = 'on';
    this[name] = 'off';
  }

  action(arg) {
    switch(arg) {
      case 'on'  : this._manager.down(); break;
      case 'off' : this._manager.up();   break;
    }
  }

  // close(done) { }

  static metadata(builder) {
    const binary = builder.enum('off', 'on');

    builder.usage.vpanel();

    builder.attribute('o0', binary);
    builder.attribute('o1', binary);
    builder.attribute('o2', binary);
    builder.attribute('o3', binary);
    builder.action('action', binary);
    builder.config('triggers0', 'string'); // ex: 'l ss' or 'l|ss'
    builder.config('triggers1', 'string'); // ex: 'l ss' or 'l|ss'
    builder.config('triggers2', 'string'); // ex: 'l ss' or 'l|ss'
    builder.config('triggers3', 'string'); // ex: 'l ss' or 'l|ss'
  }
};
