<template >
   
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

</template>


<script>
export default {
 data () { 
　　return {
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
　  mounted () {
        // this.getID_1();
        // this.getID_2();
        this.getInfo_1();
        this.getInfo_2();
　 },

}
</script>

<style lang="less" scoped>
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

