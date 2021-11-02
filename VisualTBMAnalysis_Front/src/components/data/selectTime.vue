<template>
    <div>
    <!-- top -->
    <el-container  direction="vertical" >
  
<el-container>

    <el-container  style="width:30%; height:100%" direction="vertical" >

        <div class="text">请选择时间范围后点击搜索</div>
        <el-container>
        <el-date-picker
        popper-class="mydatestyle"
        v-model="value"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>
        <el-button icon="el-icon-search" circle @click="submitTime" style="margin-left:25px"></el-button>
        </el-container>

      <dv-border-box-12 style="height:420px; width:100%;">
        <div class="text" style="margin-top:5px">贯入度变化情况</div>
         <div style="width:450px;height:360px" ref="degree_chart" class="chart"></div>
    </dv-border-box-12>

    </el-container>

   <el-container style="width:50%;height:100%">
                <dv-border-box-11 title="总推力变化情况" 
                style="font-family: 'zcool_title';font-size: 25px;height:480px"  
                :color="['#3f7c8b', '#96dee8']" >
                    <div style="width:680px;height:450px" ref="push_force_chart"></div>
                </dv-border-box-11>
                
        </el-container>
    </el-container>

</el-container>

 <dv-decoration-10 style="width:96%;height:5px;margin:5px;position:relative;left:10px" />

  <el-container style="height:100%; width:100%; ">    
    

    <dv-border-box-10 style="height:100%; width:31%;margin-left:8px;">
                <div class="text">扭矩变化情况</div>
         <div style="width:390px;height:350px" ref="torsion_chart" class="chart"></div>
    </dv-border-box-10>

    <dv-border-box-10 style="height:100%; width:31%;margin-right:20px;margin-left:20px;">
        <div class="text">推进速度变化情况</div>
         <div style="width:390px;height:350px" ref="v_push_chart" class="chart"></div>
    </dv-border-box-10>

    <dv-border-box-10 style="height:100%; width:31%;">
                <div class="text">刀盘转速变化情况</div>
         <div style="width:390px;height:350px" ref="v_rotate_chart" class="chart"></div>
    </dv-border-box-10>


  </el-container>
  

  <dv-decoration-10 style="width:96%;height:5px;margin:5px;position:relative;left:10px" />



    </div>
</template>

<script>
export default{
 data () { 
　　return {
        all_data:[],
        time_point:['test1','test2','test3','test4','test5','test6','test7'],
        push_force:[24680,24650,24620,24680,24700,24680,24720],
        value: [new Date(2021, 9, 22, 23, 50), new Date(2021, 9, 22, 23, 59)],
        time:['2021-09-22 23:55:00','2021-09-22 23:59:00'],

        v_push:[80,50,20,80,70,80,20],//推进速度
        v_rotate:[80,50,20,80,70,80,20],//刀盘转速
        torsion:[80,50,20,80,70,80,20],
        degree:[80,50,20,80,70,80,20],

        recordID_1:'0',
        recordID_2:'0',
        modelName_1:'掘进参数优化模型',
        modelName_2:'泥水仓压力优化模型',

        analyseInfo_1:[],
        analyseInfo_2:[],
         options: [{
          value: '掘进参数优化模型',
          label: '掘进参数优化模型'
        }, {
          value: '泥水仓压力优化模型',
          label: '泥水仓压力优化模型'
        }],

    };
},
methods: {
　　initCharts () {
        let myChart0 = this.$echarts.init(this.$refs.push_force_chart,'walden');
        let myChart1 = this.$echarts.init(this.$refs.degree_chart,'walden');
        let myChart2 = this.$echarts.init(this.$refs.torsion_chart,'walden');
        let myChart3 = this.$echarts.init(this.$refs.v_push_chart,'walden');
        let myChart4 = this.$echarts.init(this.$refs.v_rotate_chart,'walden');
    　　myChart0.setOption({
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
                    end: 60
                },
                {
                    start: 20,
                    end: 100
                }
            ],
            series: [
                {
                data: this.push_force,
                //smooth: true,
                symbol: 'none',
                //areaStyle: {},
                type: 'line',
                }
            ]
            //结束
        　　});
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
　　　  myChart3.setOption({
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
            //areaStyle: {},
            type: 'line',
            }
        ]
        //结束
    　　});
　　　  myChart4.setOption({
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
            //areaStyle: {},
            type: 'line',
            }
        ]
        //结束
    　　});
    },

    async getData () {
        let query={
            where:`([t]>='${this.time[0]}' and [t]<='${this.time[1]}')`
        };
            const { data: res } =await this.$http.
            post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952', 
            query)
        this.all_data=res.data

        var i;
        if(res.data.length == 0 || res.data == null){
            console.log("时间筛选获取数据为空或失败！")
        }else{
            this.push_force=[]
            this.time_point=[]
            this.torsion=[]
            this.degree=[]
            this.time_point=[]
            this.v_push=[]
            this.v_rotate=[]
            
            for(i=0;i<this.all_data.length;i++){
                this.push_force.push(this.all_data[i][100005]-'0')
                this.time_point.push(this.all_data[i]['t'])
                this.torsion.push(this.all_data[i][100004]-'0')
                this.degree.push(this.all_data[i][100395]-'0')
                this.v_push.push(this.all_data[i][100002]-'0')
                this.v_rotate.push(this.all_data[i][100003]-'0')
            }
        }
       
        this.initCharts();
          
    },
    submitTime(){
        var i=0;
        for(i=0;i<2;i++){
            var year = this.value[i].getFullYear();
            var month = this.value[i].getMonth() + 1 < 10 ? "0"+ this.value[i].getMonth() + 1 : this.value[i].getMonth() + 1 ; 
            var day = this.value[i].getDate() < 10 ? "0" + this.value[i].getDate() : this.value[i].getDate(); 
            var hour = this.value[i].getHours()< 10 ? "0" + this.value[i].getHours() : this.value[i].getHours(); 
            var minute = this.value[i].getMinutes()< 10 ? "0" + this.value[i].getMinutes() : this.value[i].getMinutes(); 
            var second = this.value[i].getSeconds()< 10 ? "0" + this.value[i].getSeconds() : this.value[i].getSeconds(); 

            this.time[i] =  year + "-" + month + "-" + day + " " + hour+":"+minute+":"+second
            console.log(this.time[i]); 
        }
        this.getData();
    },
},
created () {
        // this.timer = setInterval(() => {
        //     this.getData()
        // }, 60000) // 1min  
    },
mounted () {
        this.getData(); 
        
　 },
}
</script>


<style lang="less" scoped>

.dv-border-box-9{
    width:100%;
    height: 100%;
}
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
.table-wrapper /deep/ .el-table--fit{
        padding: 20px;
}
 .table-wrapper /deep/  .el-table, .el-table__expanded-cell {
    background-color: #ffffff00;
}

 .table-wrapper /deep/ .el-table tr {
    background-color: #10192418!important;
}
 .table-wrapper /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: #0d1a2c18;;
}

.el-table{
    margin:30px;
}
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
.text1{
    color: #96dee8;
    //font-weight: bold;
    font-size: 30px;
    margin-bottom: 30px;
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
