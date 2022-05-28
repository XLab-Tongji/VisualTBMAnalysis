import seldom
from seldom import Steps
import time


class RegisterTest(seldom.TestCase):
    """login test case"""

    def test_case(self):
        """a simple test case """
        self.open("http://localhost:8080/register")
        self.type(xpath="//input[@type='text']",text="yang")
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[2]/div/div/input",text="1685757000@qq.com")
        self.click(xpath="//*[@id='app']/div/div[5]/div/form/div[3]/div/button")
        time.sleep(1)
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[3]/div/div/input",text="000000")
        self.type(xpath="//input[@type='password']",text="123abc")
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[5]/div/div/input",text="123abc")
        self.click(xpath="//div[@id='app']/div/div[5]/div/form/div[6]/div/button[2]/span")
        self.assertUrl("http://localhost:8080/login")

if __name__ == '__main__':
    seldom.main(debug=True)