import seldom
import time

class LoginTest(seldom.TestCase):
    """登录功能测试用例"""

    def test_login_pos(self):
        """正向测试用例"""
        self.open("http://localhost:8080/login")
        self.type(xpath="//input[@type='text']",text="yangjing")
        self.type(xpath="//input[@type='password']",text="123abc")
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[3]/div/div/div/input",text="9999")
        self.click(xpath="//button[@type='button']")
        time.sleep(1)
        self.screenshots()
        self.assertUrl("http://localhost:8080/intro")
    
    def test_login_neg(self):
        """反向测试用例（用户名与密码不匹配）"""
        self.open("http://localhost:8080/login")
        self.type(xpath="//input[@type='text']",text="liwenyan")
        self.type(xpath="//input[@type='password']",text="123456abc")
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[3]/div/div/div/input",text="9999")
        self.click(xpath="//button[@type='button']")
        time.sleep(1)
        self.screenshots()
        self.assertUrl("http://localhost:8080/login")

if __name__ == '__main__':
    seldom.main(debug=True)