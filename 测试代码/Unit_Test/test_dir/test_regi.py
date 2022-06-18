import seldom
import time
from seldom import file_data


class RegisterTest(seldom.TestCase):
    """注册功能测试用例"""

    def test_regi_pos(self):
        """
        正向测试用例
        """
        self.open("http://localhost:8080/register")
        self.type(xpath="//input[@type='text']",text="test", clear=True)
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[2]/div/div/input",text="admin@163.com", clear=True)
        self.click(xpath="//*[@id='app']/div/div[5]/div/form/div[3]/div/button")
        time.sleep(1)
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[3]/div/div/input",text="000000", clear=True)
        self.type(xpath="//input[@type='password']",text="123abc", clear=True)
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[5]/div/div/input",text="123abc", clear=True)
        self.click(xpath="//div[@id='app']/div/div[5]/div/form/div[6]/div/button[2]/span")
        self.screenshots()
        time.sleep(1)
        self.assertUrl("http://localhost:8080/login")
    
    @file_data(file="regi_neg.xlsx", sheet="Sheet1",line=2)
    def test_regi_neg(self, username, email,password,repassword):
        """
        反向测试用例(15种无效情况)
        """
        self.open("http://localhost:8080/register")
        self.type(xpath="//input[@type='text']",text=username, clear=True)
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[2]/div/div/input",text=email, clear=True)
        self.click(xpath="//*[@id='app']/div/div[5]/div/form/div[3]/div/button")
        time.sleep(1)
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[3]/div/div/input",text="000000", clear=True)
        self.type(xpath="//input[@type='password']",text=password, clear=True)
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[5]/div/div/input",text=repassword, clear=True)
        self.click(xpath="//div[@id='app']/div/div[5]/div/form/div[6]/div/button[2]/span")
        self.screenshots()
        time.sleep(1)
        self.assertUrl("http://localhost:8080/register")
    

if __name__ == '__main__':
    seldom.main(debug=True)
