declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Api, strikeApi, ILogIn} from './lib/services/strike-api'

class LogOut {
  static start(doms) {
    _.each(doms, (dom)=> {
      dom.addEventListener('click', (e)=> {
        e.preventDefault();
        strikeApi(Api.LogOut, {})
          .then(()=> {
            location.reload();
          })
          .catch(({errors})=> {
            console.log(errors)
          });
      });
    });
  }
}

window.LogOut = LogOut;