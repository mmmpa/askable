import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import * as Promise from 'bluebird'
const request = require('superagent');
import {EventEmitter} from 'events';

window.React = React;
window.ReactDOM = ReactDOM;
window._ = _;
window.EventEmitter = EventEmitter;
window.Promise = Promise;
window.request = request;

