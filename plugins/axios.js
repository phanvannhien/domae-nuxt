export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {

        console.log('Making request to ' + config.url)
        if (store.state.authToken) {
            config.headers.common['Authorization'] = store.state.authToken
        }
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      // if (code === 404) {
      //   redirect('/404')
      // }
      
    })


  }