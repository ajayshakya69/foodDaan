import axios from 'axios';

export const publicAxios= axios.create({
  baseURL:'http://localhost:4000/api'
})

export const privateAxios= axios.create({
  baseURL:'http://localhost:4000/api'
})



