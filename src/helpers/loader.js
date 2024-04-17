  export default class Loader{
    constructor(){

    }
    show(){
      const appLoading = document.getElementById('spinner-app')
      if (appLoading) {
        appLoading.style.display = 'flex'
      }
    }

    hide(){
      setTimeout(() => {
        const appLoading = document.getElementById('spinner-app')
        if (appLoading) {
          appLoading.style.display = 'none'
        }

      },200);
    }
  }