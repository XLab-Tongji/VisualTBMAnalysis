<template>

<dv-border-box-9  >
    
    <!-- top -->
    <real-time />

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

  <select-time/>


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
</dv-border-box-9>

</template>

<script>
import realTime from "./realTime.vue";
import selectTime from "./selectTime.vue";

export default {
  components: {
    realTime,
    selectTime,
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