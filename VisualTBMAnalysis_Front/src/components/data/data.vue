<template>

<dv-border-box-9  >
    
    <!-- top -->
    <el-container  direction="vertical" >
  
<el-container>

    <el-container  style="width:60%; height:100%" direction="vertical" >
            <dv-decoration-11 style="width:100%;height:150px;"><h1 class="text">当前掘进环号：{{this.cur_loop}} <br> 当前掘进状态：{{this.cur_state}}
                </h1></dv-decoration-11>   

        <el-date-picker
        v-model="value"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>

        <el-button @click="submitTime" style="width:100px">筛选</el-button>

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

    <div class="d-flex jc-center" >
        <div class="title">
            <dv-decoration-6
            class="dv-dec-6"
            :reverse="true"
            :color="['#3fb1e3', '#96dee8']"
            style="margin=20px"
            />
        </div>
    </div>

  <!-- <middle /> -->
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

  <dv-decoration-10 style="width:96%;height:5px;margin:5px;position:relative;left:10px" />

    <!-- <bottom /> -->
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
         <div style="width:450px;height:350px" ref="chart3" class="chart"></div>
    </dv-border-box-10>

    <dv-border-box-10 style="height:100%; width:33%;">
                <div class="text">刀盘转速变化情况</div>
         <div style="width:450px;height:350px" ref="chart4" class="chart"></div>
    </dv-border-box-10>

  </el-container>

    <div class="d-flex jc-center" >
        <div class="title">
            <dv-decoration-6
            class="dv-dec-6"
            :reverse="true"
            :color="['#3fb1e3', '#96dee8']"
            style="margin=20px"
            />
        </div>
    </div>

    <!-- <bottom2 /> -->
    <div class="table-wrapper">
    <el-container>
    <el-table
      :data="analyseInfo_1"
      :cell-style="cellStyle"
      style="width: 100%">
      <el-table-column
        prop="Name"
        label="参数名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Value"
        label="取值"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Unit"
        label="单位">
      </el-table-column>
    </el-table>


    <el-table
      :data="analyseInfo_2"
      :cell-style="cellStyle"
      style="width: 100%">
      <el-table-column
        prop="Name"
        label="参数名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Value"
        label="取值"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Unit"
        label="单位">
      </el-table-column>
    </el-table>
      </el-container>
</div>

</dv-border-box-9>

</template>

<script>
export default{
 data () { 
　　return {
        all_data:[],
        time_point:['test1','test2','test3','test4','test5','test6','test7'],
        push_force:[24680,24650,24620,24680,24700,24680,24720],
        cur_loop:0,
        cur_state:'',
        value: [new Date(2021, 9, 22, 23, 50), new Date(2021, 9, 22, 23, 59)],
        time:['2021-09-17 23:56:00','2021-09-17 23:59:00'],

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
        let myChart1 = this.$echarts.init(this.$refs.chart1,'walden');
        let myChart2 = this.$echarts.init(this.$refs.chart2,'walden');
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
    　
    let myChart3 = this.$echarts.init(this.$refs.chart3,'walden');
    let myChart4 = this.$echarts.init(this.$refs.chart4,'walden');
　　//console.log(this.$refs.chart)
　　// 绘制图表
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
        console.log(res.data)
        this.all_data=res.data

        var i;
        if(res.data == null){
            console.log("获取数据失败！")
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
                this.time_point.push(this.all_data[i]['t'])
                this.v_push.push(this.all_data[i][100002]-'0')
                this.v_rotate.push(this.all_data[i][100003]-'0')
            }
            console.log("getData执行")
            
            // console.log(this.time_point)
        }

        //获取当前环号
        this.cur_loop=this.all_data[i-1][100001]-"0"
        //获取当前掘进状态
        if(this.all_data[i-1][100007]>0){
            this.cur_state='拼装'
        }else{
            this.cur_state='掘进'
        }
        
        this.initCharts(); 
    },
    submitTime(){
        var i=0;
        for(i=0;i<2;i++){
            var year = this.value[i].getFullYear(); //获取完整的年份(4位,1970-????)
        var month = this.value[i].getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var day = this.value[i].getDate(); //获取当前日(1-31)
        var hour = this.value[i].getHours(); 
        var minute = this.value[i].getMinutes(); 
        var second = this.value[i].getSeconds(); 
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        
        this.time[i] =  year + "-" + month + "-" + day + " " + hour+":"+minute+":"+second
        console.log(this.time[i]); 
        }
        this.getData();
    },
    async getID_1 () {
        let queryID={
            where:`(([AnalysisObject]='S1245') and ([AnalysisModel]='${this.modelName_1}'))`
        };
        const { data: res } =await this.$http.
        post('/api/universal/Structure/TunnelingAnalysisRecord/where?prj=shushui&dataset=3871633455494201344&increase=false&pagesize=1&pageindex=1', 
        queryID)

        if(res.data == null){
            console.log("获取掘进参数优化模型ID失败！")
        }else{       
            this.recordID_1=res.data[0]['ID'];
            console.log("掘进参数优化模型ID:")
            console.log(this.recordID_1)
        }
    },
    async getInfo_1 () {
        await this.getID_1()
        //console.log(this.recordID_1)
        let queryInfo={
            where:`([FK_TunnelingAnalysisRecord]=${this.recordID_1})`
        };
        const { data: res } =await this.$http.
        post('/api/universal/Structure/TunnelingAnalysisInfo/where?prj=shushui&dataset=3871633545889841152', 
        queryInfo)

        if(res.data == null){
            console.log("获取掘进参数优化模型分析记录数据失败！")
        }else{ 
            console.log("掘进参数优化模型分析记录数据:")
            this.analyseInfo_1=res.data
            console.log(this.analyseInfo_1)
        }
    },
    async getID_2 () {
        let queryID={
            where:`(([AnalysisObject]='S1245') and ([AnalysisModel]='${this.modelName_2}'))`
        };
        const { data: res } =await this.$http.
        post('/api/universal/Structure/TunnelingAnalysisRecord/where?prj=shushui&dataset=3871633455494201344&increase=false&pagesize=1&pageindex=1', 
        queryID)

        if(res.data == null){
            console.log("获取掘进参数优化模型ID失败！")
        }else{       
            this.recordID_2=res.data[0]['ID'];
            console.log("掘进参数优化模型ID:")
            console.log(this.recordID_1)
        }
    },
    async getInfo_2 () { 
        await this.getID_2()

        let queryInfo={
            where:`([FK_TunnelingAnalysisRecord]=${this.recordID_2})`
        };
        const { data: res } =await this.$http.
        post('/api/universal/Structure/TunnelingAnalysisInfo/where?prj=shushui&dataset=3871633545889841152', 
        queryInfo)

        if(res.data == null){
            console.log("获取泥水仓压力优化模型分析记录数据失败！")
        }else{ 
            console.log("泥水仓压力优化模型分析记录数据:")
            this.analyseInfo_2=res.data
            console.log(this.analyseInfo_2)
        }
    },
    cellStyle(row,column,rowIndex,columnIndex){
          return 'color:#96dee8'
    }
},
created () {
        this.timer = setInterval(() => {
            this.getData()
        }, 60000) // 1min  
    },
mounted () {
        this.getData(); 
        this.getInfo_1();
        this.getInfo_2();
        
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
