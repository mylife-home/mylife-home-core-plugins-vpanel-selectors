'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger('core-plugins-vpanel-selectors.InputManager');

const InputManager = require('./services/input-manager');

module.exports = class SmartInput {
  constructor(config) {

    this.value = 'off';

    this._manager = new InputManager();

    // http://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
    // seps are '|'' and ' ', multiple separators act as one
    const triggers = (config.triggers || '').split(/(?:\|| )+/);
    const triggerAction = () => this._trigger();

    logger.debug(`configuring triggers: ${triggers}`);
    for(const trigger of triggers) {
      this._manager.config[trigger] = triggerAction;
    }
  }

  _trigger() {
    this.value = 'on';
    this.value = 'off';
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

    builder.attribute('value', binary);
    builder.action('action', binary);
    builder.config('triggers', 'string'); // ex: 'l ss' or 'l|ss'
  }
};
