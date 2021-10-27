<template >
    <el-container style="height:100%; width:100%; ">

    <dv-border-box-13 style="height:390px; width:25%;" :color="['#3fb1e3', '#96dee8']">
        <span class="text">掘进压力参数优化</span>
        <el-container direction="vertical">
            <div align="center">
            <dv-decoration-9 style="width:150px;height:150px;margin-top:20px" :color="['#3fb1e3', '#96dee8']">
                <span class="text" style="font-size:20px;color:#ffffff">4.2<br>mm/min</span>
            </dv-decoration-9></div>

        <span class="parm" >贯入度: 12222 mm/r<br>
                        刀盘扭矩: 22000 kN. m<br>
                        总推进力: 12222 kN<br>
                        刀盘转速: 2. 4 r/min
                </span>
        </el-container>
    </dv-border-box-13>

        
    <dv-border-box-12 style="height:100%; width:33%;">
        <div class="text">贯入度变化情况</div>
         <div style="width:450px;height:350px" ref="chart1" class="chart"></div>
    </dv-border-box-12>

    <dv-border-box-12 style="height:100%; width:34%;">
                <div class="text">扭矩变化情况</div>
         <div style="width:450px;height:350px" ref="chart2" class="chart"></div>
    </dv-border-box-12>


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
        torsion:[80,50,20,80,70,80,20],
        degree:[80,50,20,80,70,80,20]
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
            data: this.degree,
            //smooth: true,
            symbol: 'none',
            //areaStyle: {},
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
            data: this.torsion,
            //smooth: true,
            symbol: 'none',
            //areaStyle: {},
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
            this.torsion=[]
            this.degree=[]
            this.time_point=[]
            for(i=0;i<this.all_data.length;i++){
                this.torsion.push(this.all_data[i][100004]-'0')
                this.degree.push(this.all_data[i][100395]-'0')
                this.time_point.push(this.all_data[i]['t'])
            }
            // console.log("获取数据如下：")
            // console.log(this.torsion)
            //console.log(this.time_point)
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
.dv-border-box-13{
    margin:10px;
    margin-left: 30px;
    padding: 20px;
}
.dv-border-box-12{
    position: relative;
    top:13px;
    padding-top: 15px;
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

