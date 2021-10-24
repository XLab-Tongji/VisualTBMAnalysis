<template>
<dv-border-box-9  >
  <el-container  direction="vertical" >
    <div align="center" style="margin-top:60px;margin-bottom:10px">  <img src="@/assets/image/title1.png"  style="width:600px;" /></div>
  <div align="center" style="margin-bottom:10px">  <img src="@/assets/image/title2.png"  style="width:400px;" /></div>
  
        <dv-decoration-5 class="headline" dur=3  :color="['#3fb1e3', '#96dee8']" style="width:1200px;height:150px;margin:0 auto" />
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

</el-container>
</el-container>

   
</dv-border-box-9>
</template>

<script>
export default{
    
 }
</script>


<style lang="less" scoped>
.dv-border-box-9{
    width:100%;
    height: 100%;
}
.text{
    color: #96dee8;
    color: #bbecf3;
    //font-weight: bold;
    font-family: 'zcool_title';
    font-size: 25px;
}
.el-carousel{
    position: relative;
    top:20px;
    left:35px;
}

</style>
