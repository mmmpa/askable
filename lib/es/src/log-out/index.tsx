declare const request;

import {Api, strike} from './lib/services/strike-api'

class LogOut {
  static start(doms) {
    _.each(doms, (dom)=> {
      dom.addEventListener('click', (e)=> {
        e.preventDefault();
        strike(Api.LogOut, {})
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