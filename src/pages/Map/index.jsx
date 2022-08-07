import React from 'react'
import './index.less'
// export default function Map(){
//   return (
//       <div className="map">Map</div>
//   )
// }
export default class Map extends React.Component{
    componentDidMount(){
        // 创建地图实例
        var map = new window.BMapGL.Map("container");
        // 设置中心点坐标
        var point = new window.BMapGL.Point(116.404, 39.915);
        // 初始化地图，同时设置展示级别
        map.centerAndZoom(point, 15); 
    }
    render(){
        return (
            <div className="map">
                {/* 创建地图容器 */}
                <div id="container"></div>
            </div>
        )
    }
}