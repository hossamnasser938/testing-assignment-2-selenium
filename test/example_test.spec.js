const { Builder, Browser, By } = require("selenium-webdriver");
const assert = require("assert");

describe("example test", () => {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().setTimeouts({ implicit: 500 });
  });

  after(async () => await driver.quit());

  it("selenium.dev prints message 'Received!'", async () => {
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");

    let textBox = await driver.findElement(By.name("my-text"));
    let submitButton = await driver.findElement(By.css("button"));

    await textBox.sendKeys("Selenium");
    await submitButton.click();

    let message = await driver.findElement(By.id("message"));
    let value = await message.getText();

    assert.equal(value, "Received!");
  });
});
