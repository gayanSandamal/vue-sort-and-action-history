import axios from 'axios'

export function getPosts(successCallBack, errorCallBack) {
  axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  )
  .then(response => {
    successCallBack(response)
  })
  .catch(error => {
    errorCallBack(error)
  })
}