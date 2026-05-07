import axios from 'axios';
import { apiKey } from '../constants';

const forecastEndPoint = param => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}=${param.cityName}&days=${param.days}&aqi=no&alerts=no`
const locationEndPoint = param => `https://api.weatherapi.com/v1/search.json?key=${apiKey}=${param.cityName}`

const apiCall = async (endpoint) => {
    const options ={
        method: 'GET',
        url: endpoint
    }
    try{
        const response =await axios.request(options);
        return response.data;
    }catch(err){
        console.log("error: ",err);
        return null;
    }
} 


export const fetchWeatherForecast = param =>{
    return apiCall(forecastEndPoint(param));
}

export const fetchLocation = param =>{
    return apiCall(locationEndPoint(param));
}