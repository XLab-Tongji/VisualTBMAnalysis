<template>
<el-container  direction="vertical" >
    <div align="center">  <img src="@/assets/image/title.png" class="title_img" style="width:800px;" /></div>
  
        <dv-decoration-5 class="headline" dur=3  :color="['#3fb1e3', '#96dee8']" style="width:800px;height:80px;margin:0 auto" />
<el-container>

    <el-container  style="width:60%; height:100%" direction="vertical" >
            <dv-decoration-11 style="width:100%;height:150px;"><h1 class="text">当前掘进环号：S1245 <br> 当前掘进状态：掘进/拼装
                </h1></dv-decoration-11>        
       
            
        <dv-border-box-8 class="card_1" dur=6 style="width:100%; height:450px; margin-top:20px;">
        <el-carousel indicator-position="outside" height="400px" style="width:90%;">
            <el-carousel-item>
            <img src='@/assets/image/bg1.jpg' style="height: 100%; width:100%;">
            </el-carousel-item>
            <el-carousel-item>
            <img src='@/assets/image/bg2.png' style="height: 100%; width:100%">
            </el-carousel-item>  
            <el-carousel-item>
            <img src='@/assets/image/bg3.png' style="height: 100%; width:100%">
            </el-carousel-item>  
            <el-carousel-item>
            <img src='@/assets/image/bg4.png' style="height: 100%; width:100%">
            </el-carousel-item>  
        </el-carousel>  
        </dv-border-box-8>


    </el-container>

    <el-container style="width:40%;height:100%">
        <dv-border-box-11 title="总推力变化情况" 
        style="font-family: 'zcool_title';font-size: 25px;"  
        :color="['#3f7c8b', '#96dee8']" >
            <div style="width:500px;height:500px" ref="chart"></div>
        </dv-border-box-11>
        
    </el-container>
</el-container>
</el-container>
</template>

<script>
export default {
 data () { 
　　return {
        query:{
            where:"([t]>='2021-09-22 23:50:00' and [t]<='2021-09-22 23:59:00')"
        },        
        all_data:[],
        time_point:['test1','test2','test3','test4','test5','test6','test7'],
        push_force:[24680,24650,24620,24680,24700,24680,24720],
        };
　},
　methods: {
　　initCharts () {
　　let myChart = this.$echarts.init(this.$refs.chart,'walden');
　　//console.log(this.$refs.chart)
　　// 绘制图表
　　myChart.setOption({
    //图表开始
         tooltip: {
            trigger: 'axis',
            position: function (pt) {
            return [pt[0], '10%'];
            }
        },
          toolbox: {
            feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: this.time_point,
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            scale: true,
            // min:24000,
            // max:40000,
           
            boundaryGap: [0, '100%']
        },
          dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 20
            },
            {
                start: 0,
                end: 20
            }
        ],
        series: [
            {
            data: this.push_force,
            //smooth: true,
            symbol: 'none',
            areaStyle: {},
            type: 'line',
            }
        ]
        //结束
    　　});
　　},
    async getData () {
        const { data: res } =await this.$http.
        post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952', 
        this.query)
        //console.log(res.data)
        this.all_data=res.data

        var i;
        if(res.data == null){
            console.log("获取数据失败！")
        }else{
            this.push_force=[]
            this.time_point=[]
            for(i=0;i<this.all_data.length;i++){
                this.push_force.push(this.all_data[i][100005]-'0')
                this.time_point.push(this.all_data[i]['t'])
            }
            // console.log("获取数据如下：")
            // console.log(this.push_force)
            // console.log(this.time_point)
        }
        
        this.initCharts(); 
        },
　  },
　  mounted () {
    this.getData(); 
　 },

}
</script>

<style lang="less" scoped>
.dv-border-box-11{
    padding-top: 90px;
    padding-left: 30px;
    height:525px;
}
.title_img{
    position: relative;
    // left:300px;
    top: 30px;
    //margin-top: 30px;
}
.headline{
    position: relative;
    transform: translate(0%,10%);
}
.title{
    color:#ffffff;
    font-size: 40px;
    font-family:'zcool_title'; 
    -webkit-text-stroke-color: rgb(255, 255, 255); 
    //-webkit-text-stroke-width: 0.5px; 
}
.el-container{
    margin:10px;
}
.el-carousel{
    position: relative;
    top:20px;
    left:35px;
}
.card_1{
    margin: 10px;
    margin-right: 30px;
    //background-color:rgba(252, 252, 252, 0.5)

}
.card_2{
    margin: 10px;
    background-color:rgba(252, 252, 252, 0.5)
}
.card_3{
    margin: 10px;
    background-color:rgba(252, 252, 252, 0.5)

}
.text{
    color: #96dee8;
    color: #bbecf3;
    //font-weight: bold;
    font-family: 'zcool_title';
    font-size: 25px;
    
}
</style>