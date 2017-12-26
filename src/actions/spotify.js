import axios from 'axios';
import {SET_TOKEN} from "./actionTypes";
import querystring  from 'querystring';

export const setToken = (action,token) =>
  ({type : SET_TOKEN, token});

export const login = (clientId = clientId,clientSecret = clientSecret) => {
  const data = querystring.stringify({ grant_type: 'client_credentials'});
  return axios({url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    data ,
    headers : {
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: clientId,
      password: clientSecret
    }})
  .then((res,a)=>{
    console.log(res.headers)
  })
  .catch(function(err){
    console.log('Fetch Error :-S', err,err.data);
  });

};
