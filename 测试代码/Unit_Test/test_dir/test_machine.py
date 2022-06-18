import seldom
import time

class MachineTest(seldom.TestCase):
    """测试机器学习分析展示界面是否可以正常工作"""

    def test_img_link(self):
        """同济大学官网跳转测试"""
        self.open("http://localhost:8080/login")
        self.type(xpath="//input[@type='text']",text="yangjing")
        self.type(xpath="//input[@type='password']",text="123abc")
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[3]/div/div/div/input",text="9999")
        self.click(xpath="//button[@type='button']")
        time.sleep(1)
        self.click(xpath="//div[@id='app']/section/div/div/main/div[2]/div[2]/a/img")
        time.sleep(2)
        self.switch_to_window(1)
        self.screenshots()
        self.assertTitle("同济大学")

if __name__ == '__main__':
    seldom.main(debug=False)