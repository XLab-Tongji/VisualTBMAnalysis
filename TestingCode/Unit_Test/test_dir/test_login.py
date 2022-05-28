import seldom
from seldom import Steps


class LoginTest(seldom.TestCase):
    """login test case"""

    def test_case(self):
        """a simple test case """
        self.open("http://localhost:8080/login")
        self.type(xpath="//input[@type='text']",text="admin")
        self.type(xpath="//input[@type='password']",text="123abc")
        self.type(xpath="//div[@id='app']/div/div[5]/div/form/div[3]/div/div/div/input",text="9999")
        self.click(xpath="//button[@type='button']")
        self.assertUrl("http://localhost:8080/intro")

if __name__ == '__main__':
    seldom.main(debug=True)