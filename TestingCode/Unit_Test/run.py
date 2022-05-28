import seldom

if __name__ == '__main__':
    """login and register test case"""
     
    seldom.main(
        path="./test_dir",
        browser="gc",
        debug=False,  # debug 开关 True/False
        title="2022年春季学期软件测试——珠三角水资源配置数据分析及其可视化",
        tester="1854025杨晶 1953978李文妍",
        description="单元测试"
    )