<template>
  <dv-border-box-8>
    <div class="table-wrapper">
      <div class="text">优化建议结果</div>
      <el-container>
        <el-table
          :show-header="false"
          :data="analyseInfo2"
          :cell-style="cellStyle"
          style="width: 100%"
          size="mini"
        >
          <el-table-column prop="Name" label="参数名称" width="160">
          </el-table-column>
          <el-table-column prop="Value" label="取值" width="130">
          </el-table-column>
          <el-table-column prop="Unit" label="单位" width="120">
          </el-table-column>
        </el-table>
      </el-container>
    </div>
  </dv-border-box-8>
</template>

<script>
export default {
  props: ["FK_SRingNo"],
  data() {
    return {
      recordID1: "",
      recordID2: "",
      modelName1: "掘进参数优化模型",
      modelName2: "泥水仓压力优化模型",
      analyseInfo1: [],
      analyseInfo2: [],
      currentFK_SRingNo: this.FK_SRingNo,
    };
  },

  watch: {
    FK_SRingNo: {
      handler(newValue) {
        if (newValue) {
          console.log(newValue);
          this.currentFK_SRingNo = newValue;
          this.getInfo2();
        }
      },
    },
  },

  methods: {
    async getID2() {
      console.log("现在");
      console.log(this.currentFK_SRingNo);
      let queryID = {
        where: `(([AnalysisObject]='S1245') and ([AnalysisModel]='${this.modelName2}') and ([FK_SRingNo]=${this.currentFK_SRingNo}))`,
      };
      const { data: res } = await this.$http.post(
        "/api/universal/Structure/TunnelingAnalysisRecord/where?prj=shushui&dataset=3871633455494201344&increase=false&pagesize=1&pageindex=1",
        queryID
      );

      if (res.data == null) {
        console.log("获取泥水仓压力优化模型ID失败！");
        console.log(res.data);
      } else {
        console.log("泥水仓压力优化模型分析记录:");
        console.log(res.data);
        this.recordID2 = res.data[0]["ID"];
        console.log("泥水仓压力优化模型ID:");
        console.log(this.recordID2);
      }
    },

    async getInfo2() {
      this.analyseInfo2 = [];
      this.recordID2 = "";
      await this.getID2();
      if (this.recordID2 == null) {
      } else {
        let queryInfo = {
          where: `([FK_TunnelingAnalysisRecord]=${this.recordID2})`,
        };
        const { data: res } = await this.$http.post(
          "/api/universal/Structure/TunnelingAnalysisInfo/where?prj=shushui&dataset=3871633545889841152",
          queryInfo
        );

        if (res.data == null) {
          console.log("获取泥水仓压力优化模型分析记录数据失败！");
        } else {
          console.log("泥水仓压力优化模型分析记录数据:");
          console.log(res.data);
        var queryData = res.data.filter(function (fp) {
          return fp.Type === "输出" || fp.Type === "预测值";
        });
        this.analyseInfo2 = queryData;
        console.log("筛选后：");
        console.log(queryData);
        for (var i = queryData.length - 1; i >= 0; i--) {
          const newValue = parseFloat(queryData[i].Value).toFixed(4);
          this.analyseInfo2[i].Value = newValue;
        }
        }
      }
    },

    cellStyle(row, column, rowIndex, columnIndex) {
      return "color:#96dee8";
    },
  },
  mounted() {
    this.getInfo2();
  },
};
</script>

<style lang="less" scoped>
.text {
  color: #96dee8;
  //font-weight: bold;
  font-size: 30px;
  padding-top: 5px;
  // padding-bottom: 25px;
  margin-bottom: 0px;
  font-family: "zcool_title";
  text-align: center;
}

.dv-border-box-8 {
  width: 39%;
  height: 200px;
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