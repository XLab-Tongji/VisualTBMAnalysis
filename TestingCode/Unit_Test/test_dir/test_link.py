import seldom
from seldom import Steps
import time

class LoginTest(seldom.TestCase):
    """测试页脚链接是否可以跳转"""

    def test_img_link(self):
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
    
    def test_text_link(self):
        self.open("http://localhost:8080/login")
        self.type(xpath="//input[@type='text']",text="yangjing")
        self.type(xpath="//input[@type='password']",text="123abc")
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[3]/div/div/div/input",text="9999")
        self.click(xpath="//button[@type='button']")
        time.sleep(1)
        self.click(xpath="/html/body/div/section/div/div/main/div[2]/div[3]/ul/li[1]/a")
        time.sleep(2)
        self.switch_to_window(2)
        self.screenshots()
        self.assertTitle("同济大学软件学院")

if __name__ == '__main__':
    seldom.main(debug=False)