<template >
    <el-container style="height:100%; width:100%; ">

    <dv-border-box-4 style="height:390px; width:25%;" :color="['#3fb1e3', '#96dee8']">
        <span class="text">泥水仓压力控制参数优化</span>
        <el-container direction="vertical">
            <div align="center">
            <dv-decoration-9 style="width:150px;height:150px;margin-top:30px" :color="['#3fb1e3', '#96dee8']">
                <span class="text" style="font-size:20px;color:#ffffff">4.0<br>bar</span>
            </dv-decoration-9></div>

        <span class="parm" >进浆流量: 1980 m3/h
                    <br>出浆流量: 1990 m3/h
                    <br>气垫仓压力: 2. 1 Bar
                </span>
        </el-container>
    </dv-border-box-4>
    
    <dv-border-box-10 style="height:100%; width:32%;margin-right:10px;margin-left:10px;">
        <div class="text">推进速度变化情况</div>
         <div style="width:450px;height:350px" ref="chart1" class="chart"></div>
    </dv-border-box-10>

    <dv-border-box-10 style="height:100%; width:33%;">
                <div class="text">刀盘转速变化情况</div>
         <div style="width:450px;height:350px" ref="chart2" class="chart"></div>
    </dv-border-box-10>

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
        v_push:[80,50,20,80,70,80,20],//推进速度
        v_rotate:[80,50,20,80,70,80,20]//刀盘转速
        };
　},
　methods: {
　　initCharts () {
　　let myChart1 = this.$echarts.init(this.$refs.chart1,'walden');
    let myChart2 = this.$echarts.init(this.$refs.chart2,'walden');
　　//console.log(this.$refs.chart)
　　// 绘制图表
　　　myChart1.setOption({
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
            // min:0,
            // max:100,
           
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
            data: this.v_push,
            //smooth: true,
            symbol: 'none',
            areaStyle: {},
            type: 'line',
            }
        ]
        //结束
    　　});
　　　myChart2.setOption({
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
            // min:0,
            // max:100,
           
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
            data: this.v_rotate,
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
            this.v_push=[]
            this.v_rotate=[]
            this.time_point=[]
            for(i=0;i<this.all_data.length;i++){
                this.v_push.push(this.all_data[i][100002]-'0')
                this.v_rotate.push(this.all_data[i][100003]-'0')
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
    //this.initCharts(); 
　 },

}
</script>

<style lang="less" scoped>
.dv-border-box-4{
    margin-top: 10px;
    margin-left: 20px;
    padding: 30px;
}
.dv-border-box-10{
    position: relative;
    top:13px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 10px;
}
.chart{
    position: relative;
    left: 10px;
}
.card_1{
    margin: 15px;
    background-color:rgba(252, 252, 252, 0.5);
    margin-right:30px;
    position: relative;
    right:5px;
}
.title{
    color:#ffffff;
    font-size: 40px;
    font-family:'zcool_title'; 
    -webkit-text-stroke-color: rgb(255, 255, 255); 
    //-webkit-text-stroke-width: 0.5px; 
}
.text{
    color: #96dee8;
    //font-weight: bold;
    font-size: 30px;
    margin-bottom: 10px;
    font-family: 'zcool_title';
    text-align: center;
}
.parm{
    width:500px;
    color: #96dee8;
    //font-weight: bold;
    font-size: 30px;
    font-family: 'zcool_title';
    position: relative;
    margin-top:20px;
    margin-bottom: 20px;
}
</style>

