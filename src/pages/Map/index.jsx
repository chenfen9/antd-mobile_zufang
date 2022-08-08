import React,{useEffect,useState} from 'react'
import style from './index.module.less'
import NavAbout from '../../components/NavAbout'
import axios from 'axios'
export default function Map(){
    const [areaInfo,setAreaInfo] = useState([])
    useEffect(()=>{
          // 创建地图实例
        var map = new window.BMapGL.Map("container");
        var myGeo = new window.BMapGL.Geocoder();  
        const cityInfo = JSON.parse(localStorage.getItem('currentCity'))    
        // 将地址解析结果显示在地图上，并调整地图视野  
        myGeo.getPoint(cityInfo.label,async (point)=>{      
            if (point){      
                map.centerAndZoom(point,11); 
                map.addControl(new window.BMapGL.ScaleControl());    
                map.addControl(new window.BMapGL.ZoomControl())
               const result = await axios.get(`http://localhost:8080/area/map?id=${cityInfo.value}`)
               console.log(result)
               if(result.status === 200){
                      setAreaInfo(result.data.body)
               }
                areaInfo.forEach(area=>{
                       
                        const {label:areaName,value,count,coord} = area
                        const areaPoint = new window.BMapGL.Point(coord.longitude,coord.latitude) // 指定文本标注所在的地理位置
                        var opts = {
                            position: areaPoint,
                            offset:new window.BMapGL.Size(-35,-35)
                        };
                        // 创建文本标注对象
                        var label = new window.BMapGL.Label('', opts);
                        // 自定义文本标注样式
                        label.setContent(`<div class="${style.bubble}"><p>${areaName}</p><p>${count}套</p></div>`)
                        label.setStyle({
                           cursor:'pointer',
                           border:'1px solid #eee',
                           borderRadius:'50%',
                           padding:'0px',
                           whitespace:'nowrap',
                           fontSize:'14px',
                           color:'rgb(255,255,255)',
                           textAlign:'center'
                        });
                        label.addEventListener('click',async ()=>{
                           const res = await axios.get(`http://localhost:8080/area?id=${value}`)
                           map.centerAndZoom(areaPoint,13);
                           map.clearOverlays();
                        })
                        map.addOverlay(label);
                    
                })
            }      
        },cityInfo.label);
    },[])
    return (
        <div className={style.map}>
            <NavAbout title='地图找房'/> 
            {/* 创建地图容器 */}
            <div id="container" className={style.container}></div>
        </div>
    )
}