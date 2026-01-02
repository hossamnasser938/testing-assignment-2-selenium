const { Builder, Browser, By } = require("selenium-webdriver");
const assert = require("assert");
const {
  loadLoginTestData,
} = require("./load-login-test-data/loadLoginTestData");

const SAUCE_DEMO_URL = "https://www.saucedemo.com";

const credentials = loadLoginTestData(
  "./test/load-login-test-data/login_credentials.csv"
);

const validLoginCredentials = credentials.find(
  (row) => row.expectedResult === "success"
);
const { username: validUsername, password: validPassword } =
  validLoginCredentials;

const invalidLoginCredentials = credentials.find(
  (row) => row.expectedResult === "failure"
);
const { username: invalidUsername, password: invalidPassword } =
  invalidLoginCredentials;

async function attemptLogin(driver, username, password) {
  const usernameInput = await driver.findElement(By.id("user-name"));
  const paswordInput = await driver.findElement(By.id("password"));
  const loginButton = await driver.findElement(By.id("login-button"));

  await usernameInput.sendKeys(username);
  await paswordInput.sendKeys(password);
  await loginButton.click();
}

async function assertSuccessfulLogin(driver) {
  const message = await driver.findElement(By.className("app_logo"));
  const value = await message.getText();

  assert.equal(value, "Swag Labs");
}

async function assertFailedLogin(driver) {
  const message = await driver.findElement(By.css("h3"));
  const value = await message.getText();

  assert.equal(
    value,
    "Epic sadface: Username and password do not match any user in this service"
  );
}

async function attemptNavigatingToCart(driver) {
  const cartIcon = await driver.findElement(By.id("shopping_cart_container"));
  await cartIcon.click();
}

async function assertSuccessfulNavigationToCart(driver) {
  const title = await driver.findElement(By.className("title"));
  const value = await title.getText();

  assert.equal(value, "Your Cart");
}

const BROWSERS = [Browser.CHROME, Browser.FIREFOX, Browser.EDGE];

for (const browser of BROWSERS) {
  describe(`login operations on browser: ${browser}`, () => {
    let driver;

    before(async function () {
      driver = await new Builder().forBrowser(browser).build();
      await driver.manage().setTimeouts({ implicit: 500 });
    });

    after(async () => await driver.quit());

    it("successful login - correct credentials", async () => {
      await driver.get(SAUCE_DEMO_URL);

      await attemptLogin(driver, validUsername, validPassword);

      await assertSuccessfulLogin(driver);
    });

    it("failed login - wrong credntials", async () => {
      await driver.get(SAUCE_DEMO_URL);

      await attemptLogin(driver, invalidUsername, invalidPassword);

      await assertFailedLogin(driver);
    });

    it("successful post login redirection - navigating to cart", async () => {
      await driver.get(SAUCE_DEMO_URL);

      await attemptLogin(driver, validUsername, validPassword);

      await attemptNavigatingToCart(driver);

      await assertSuccessfulNavigationToCart(driver);
    });
  });
}
