'use strict';

function configInt(value, min, max, defaultValue) {
  const val = parseInt(value);
  if(!isNaN(val) && val >= min && val <= max) {
    return val;
  }

  return defaultValue;
}

module.exports = class Percent {
  constructor(config) {

    for(let i=0; i<10; ++i) {
      this[`_value${i}`] = configInt(config[`value${i}`], 0, 100, -1);
    }

    this._step          = configInt(config.step, 1, 100, 1);
    this._loopbackValue = 0;
    this.value          = -1;
  }

  _changeValue(val) {
    this.value = val;
    this.value = -1;
  }

  _setX(x, arg) {
    if(arg === 'off') { return; }
    this._changeValue(this[`_value${x}`]);
  }

  setValue(value) {
    this._loopbackValue = value;
  }

  up(arg) {
    if(arg === 'off') { return; }
    let value = this._loopbackValue + this._step;
    if(value > 100) { return; }
    this._changeValue(value);
  }

  down(arg) {
    if(arg === 'off') { return; }
    let value = this._loopbackValue - this._step;
    if(value < 0) { return; }
    this._changeValue(value);
  }

  set0(arg) { this._setX(0, arg); }
  set1(arg) { this._setX(1, arg); }
  set2(arg) { this._setX(2, arg); }
  set3(arg) { this._setX(3, arg); }
  set4(arg) { this._setX(4, arg); }
  set5(arg) { this._setX(5, arg); }
  set6(arg) { this._setX(6, arg); }
  set7(arg) { this._setX(7, arg); }
  set8(arg) { this._setX(8, arg); }
  set9(arg) { this._setX(9, arg); }

  // close(done) { }

  static metadata(builder) {
    const binary          = builder.enum('off', 'on');
    const percent         = builder.range(0, 100);
    const nullablePercent = builder.range(-1, 100);

    builder.usage.vpanel();

    builder.attribute('value', nullablePercent);

    builder.action('setValue', percent);

    builder.action('up', binary);
    builder.action('down', binary);

    builder.action('set0', binary);
    builder.action('set1', binary);
    builder.action('set2', binary);
    builder.action('set3', binary);
    builder.action('set4', binary);
    builder.action('set5', binary);
    builder.action('set6', binary);
    builder.action('set7', binary);
    builder.action('set8', binary);
    builder.action('set9', binary);

    builder.config('step', 'integer');

    builder.config('value0', 'integer');
    builder.config('value1', 'integer');
    builder.config('value2', 'integer');
    builder.config('value3', 'integer');
    builder.config('value4', 'integer');
    builder.config('value5', 'integer');
    builder.config('value6', 'integer');
    builder.config('value7', 'integer');
    builder.config('value8', 'integer');
    builder.config('value9', 'integer');
  }
};
