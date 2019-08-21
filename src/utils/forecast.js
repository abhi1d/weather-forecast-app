const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = 'https://api.darksky.net/forecast/a3f1f8750c5d0f1fd4f2ad923fb4ed3f/'+latitude+',' +longitude +''

    request({url, json:true}, (error,{body})=>{
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.',undefined)
        } else {
            callback(undefined, {
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                precipProbability:body.currently.precipProbability
            })
        }
    })  
}

module.exports= forecast