import axios from 'axios'
export const getCurrentCity = () => {
    const localcity = JSON.parse(localStorage.getItem('currentCity'))
    if(!localcity){
        return new Promise((resolve,reject)=>{
        var myCity = new window.BMapGL.LocalCity();
        myCity.get(async (res)=>{
          try {
            const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
            localStorage.setItem('currentCity',JSON.stringify(result.data.body))
            resolve(result.data)
          } catch (error) {
            reject(error)
          }
        }); 
        })
    }
    return Promise.resolve(localcity)
  
}