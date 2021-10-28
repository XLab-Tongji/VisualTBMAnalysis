<template>
  <dv-border-box-8>
    <div class="table-wrapper">
     <div class="text">掘进优化输入参数</div>
      <el-container>
        <el-table
          :show-header="false"
          :data="analyseInfo1"
          :cell-style="cellStyle"
          style="width: 100%"
          size="mini"
        >
          <el-table-column prop="Name" label="参数名称" width="150">
          </el-table-column>
          <el-table-column prop="Value" label="取值" width="150">
          </el-table-column>
          <el-table-column prop="Unit" label="单位" width="160">
          </el-table-column>
        </el-table>
      </el-container>
    </div>
  </dv-border-box-8>
</template>

<script>
export default {
  data() {
    return {
      recordID1: "0",
      recordID2: "0",
      modelName1: "掘进参数优化模型",
      modelName2: "泥水仓压力优化模型",
      analyseInfo1: [],
      analyseInfo2: [],
    };
  },

  methods: {
    // 和并列
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (rowIndex % 4 === 0) {
    //       return {
    //         rowspan: 4,
    //         colspan: 1,
    //       };
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0,
    //       };
    //     }
    //   }
    // },

    async getID1() {
      let queryID = {
        where: `(([AnalysisObject]='S1245') and ([AnalysisModel]='${this.modelName1}'))`,
      };
      const { data: res } = await this.$http.post(
        "/api/universal/Structure/TunnelingAnalysisRecord/where?prj=shushui&dataset=3871633455494201344&increase=false&pagesize=1&pageindex=1",
        queryID
      );

      if (res.data == null) {
        console.log("获取掘进参数优化模型ID失败！");
      } else {
        console.log("掘进参数优化模型分析记录:");
        console.log(res.data);
        this.recordID1 = res.data[0]["ID"];
        console.log("掘进参数优化模型ID:");
        console.log(this.recordID1);
      }
    },

    async getInfo1() {
      await this.getID1();
      //console.log(this.recordID1)
      let queryInfo = {
        where: `([FK_TunnelingAnalysisRecord]=${this.recordID1})`,
      };
      const { data: res } = await this.$http.post(
        "/api/universal/Structure/TunnelingAnalysisInfo/where?prj=shushui&dataset=3871633545889841152",
        queryInfo
      );

      if (res.data == null) {
        console.log("获取掘进参数优化模型分析记录数据失败！");
      } else {
        console.log("掘进参数优化模型分析记录数据:");
        console.log(res.data);
      }

      var queryData = res.data.filter(function (fp) {
        return fp.Type === "输入";
      });
      this.analyseInfo1 = queryData;
      console.log("筛选后：");
      console.log(queryData);
    },

    cellStyle(row, column, rowIndex, columnIndex) {
      return "color:#96dee8";
    },
  },
  mounted() {
    this.getInfo1();
    // this.getInfo2();
  },
};
</script>

<style lang="less" scoped>
.text{
    color: #96dee8;
    //font-weight: bold;
    font-size: 30px;
     padding-top: 5px;
    margin-bottom: 0px;
    font-family: 'zcool_title';
    text-align: center;
}

.dv-border-box-8 {
  width: 40%;
  height: 240px;
}

.table-wrapper /deep/ .el-table--fit {
  padding-top: 3px;
  padding-left: 20px;
  padding-right: 20px;
}

.table-wrapper /deep/ .el-table,
.el-table__expanded-cell {
  background-color: #ffffff00;
}

.table-wrapper /deep/ .el-table tr {
  background-color: #10192418 !important;
}
.table-wrapper /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: #0d1a2c18;
}
</style>

<style>
.el-container .el-table td,
.el-container .el-table th.is-leaf,
.el-container .el-table--border,
.el-container .el-table--group {
  border: none;
  cursor: pointer;
}
.el-container .el-table::before {
  height: 0;
}
</style>