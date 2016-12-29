import API from '../lib/services/strike-api';

export default class LogOut {
  static start (doms) {
    doms.forEach((dom) => {
      dom.addEventListener('click', (e) => {
        e.preventDefault();
        API
          .logOut({})
          .then(() => {
            location.reload();
          })
          .catch(() => null);
      });
    });
  }
}

window.LogOut = LogOut;
