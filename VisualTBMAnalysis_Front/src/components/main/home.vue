<template>
<el-container style="height:100%;">
<div class="bg">
<div style="margin:10px;">

    <el-breadcrumb separator="|" style="margin-bottom:30px;margin-left:15px;">
    <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/data' }">数据概况</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/analysis' }">机器学习分析</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/login' }">退出</el-breadcrumb-item>
</el-breadcrumb>

    <!--路由占位符-->
    <router-view></router-view>

</div></div>
</el-container>
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
.el-breadcrumb  /deep/  .el-breadcrumb__inner 
      {
        color: #96dee8 !important;				//你想要设置的字体颜色
        font-size: 20px;
    }

</style>
