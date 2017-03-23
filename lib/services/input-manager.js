'use strict';

// adapted from mylife-home-ui/lib/public/app/utils/input-manager.js

const log4js = require('log4js');
const logger = log4js.getLogger('core-plugins-vpanel-selectors.InputManager');

class InputManager {

  constructor() {
    this.config     = {};
    this.lastDown   = null;
    this.eventStack = '';
    this.endWait    = null;
  }

  executeEvents() {
    logger.debug(`InputManager: execute events : '${this.eventStack}'`);

    const fn = this.config[this.eventStack];
    fn && fn();
  }

  down() {
    // no input end for now
    if(this.endWait) {
      clearTimeout(this.endWait);
      this.endWait = null;
    }

    this.lastDown = {
      timestamp: new Date().getTime()
    };
  }

  up() {
    // no input end for now
    if(this.endWait) {
      clearTimeout(this.endWait);
      this.endWait = null;
    }

    // if no down, tchao
    if(!this.lastDown) {
      this.eventStack = '';
      return;
    }

    // Prise en compte de l'event
    const downTs = this.lastDown.timestamp;
    const upTs = new Date().getTime();
    this.lastDown = null;

    // Ajout de l'event
    if(upTs - downTs < 500) {
      this.eventStack += 's';
    } else {
      this.eventStack += 'l';
    }

    // Attente de la fin de saisie
    this.endWait = setTimeout(() => {
      this.executeEvents();

      this.eventStack = '';
      this.endWait = null;
    }, 300);
  }
}

module.exports = InputManager;
