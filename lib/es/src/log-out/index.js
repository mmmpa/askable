import API from '../lib/services/strike-api'

class LogOut {
  static start (doms) {
    doms.forEach((dom)=> {
      dom.addEventListener('click', (e) => {
        e.preventDefault()
        API
          .logOut({})
          .then(() => {
            location.reload()
          })
          .catch(({ errors }) => {
            console.log(errors)
          })
      })
    })
  }
}

window.LogOut = LogOut
