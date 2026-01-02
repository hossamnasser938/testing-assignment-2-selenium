const { Builder, Browser, By } = require("selenium-webdriver");
const assert = require("assert");

const CORRECT_USERNAME = "standard_user";
const CORRECT_PASSWORD = "secret_sauce";
const INCORRECT_PASSWORD = "wrong_pass";

const SAUCE_DEMO_URL = "https://www.saucedemo.com";

async function attemptLogin(driver, username, password) {
  const usernameInput = await driver.findElement(By.id("user-name"));
  const paswordInput = await driver.findElement(By.id("password"));
  const loginButton = await driver.findElement(By.id("login-button"));

  await usernameInput.sendKeys(username);
  await paswordInput.sendKeys(password);
  await loginButton.click();
}

describe("login operations", () => {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().setTimeouts({ implicit: 500 });
  });

  after(async () => await driver.quit());

  it("successful login - correct credentials", async () => {
    await driver.get(SAUCE_DEMO_URL);

    await attemptLogin(driver, CORRECT_USERNAME, CORRECT_PASSWORD);

    const message = await driver.findElement(By.className("app_logo"));
    const value = await message.getText();

    assert.equal(value, "Swag Labs");
  });

  it("failed login - wrong credntials", async () => {
    await driver.get(SAUCE_DEMO_URL);

    await attemptLogin(driver, CORRECT_USERNAME, INCORRECT_PASSWORD);

    const message = await driver.findElement(By.css("h3"));
    const value = await message.getText();

    assert.equal(
      value,
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("successful post login redirection - navigating to cart", async () => {
    await driver.get(SAUCE_DEMO_URL);

    await attemptLogin(driver, CORRECT_USERNAME, CORRECT_PASSWORD);

    const cartIcon = await driver.findElement(By.id("shopping_cart_container"));
    await cartIcon.click();

    const title = await driver.findElement(By.className("title"));
    const value = await title.getText();

    assert.equal(value, "Your Cart");
  });
});
