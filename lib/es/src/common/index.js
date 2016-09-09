import { Promise } from 'bluebird'
const request = require('superagent');
import { EventEmitter } from 'events';
import { Component, h, render, cloneElement } from 'preact';
import API from '../lib/services/strike-api'

window.React = { Component, cloneElement, createElement: h}
window.ReactDOM = { render }
window.EventEmitter = EventEmitter;
window.Promise = Promise;
window.request = request;
window.h = h
window.API = API

window.toArray = n => Array.prototype.slice.call(n)

