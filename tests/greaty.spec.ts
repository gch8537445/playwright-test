import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(90000); // 将此测试的超时设为90秒
  await page.goto('https://mobilev2.imtpath.net/?oauth=6&token=06ce919d-e0b9-453e-92e3-525ce964a015#/');

  // 检测是否存在“定位失败请手动输入”并点击
  const locationError = page.getByText('定位失败请手动输入');
  // 等待元素可见
  await locationError.waitFor({ state: 'visible' });
  console.log('定位失败元素已出现');

  // 等待1秒后点击
  await page.waitForTimeout(1000);

  if (await locationError.isVisible()) {
    await locationError.click();
    await page.getByRole('textbox', { name: '城市中文名或拼音' }).click();
    await page.getByRole('textbox', { name: '城市中文名或拼音' }).fill('大连');
    await page.locator('a').filter({ hasText: '大连市' }).click();
    await page.getByRole('textbox', { name: '从哪出发' }).click();
    await page.getByRole('textbox', { name: '从哪出发' }).fill('腾讯大厦');
    await page.getByText('1号门').click();
  }
  else {
    await page.getByText('大连腾讯大厦-1号门').nth(1).click();
  }


  await page.locator('div').filter({ hasText: /^你要去哪儿\?$/ }).nth(1).click();
  await page.getByRole('textbox', { name: '您要去哪' }).click();
  await page.getByRole('textbox', { name: '您要去哪' }).fill('七贤岭');
  await page.getByText('入口').click();
  await page.getByText(/同时呼叫/).click();
  await page.getByRole('button', { name: '确认叫车' }).click();
  await expect(page.getByText('下单限制已失效，不可再次下单，请重新登录！')).toBeVisible();
  //await expect(page.locator('body')).toMatchAriaSnapshot(`- text: 用车时间不在限制范围内`);
});