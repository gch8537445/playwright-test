import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mobilev2.imtpath.net/?oauth=6&token=06ce919d-e0b9-453e-92e3-525ce964a015#/');
  //await page.getByText('定位失败请手动输入').click();
  //await page.getByRole('textbox', { name: '城市中文名或拼音' }).click();
  //await page.getByRole('textbox', { name: '城市中文名或拼音' }).fill('大连');
  //await page.locator('a').filter({ hasText: '大连市' }).click();
  await page.getByText('大连腾讯大厦-1号门').nth(1).click();
  await page.getByText('常用地址1大连腾讯大厦').click();
  await page.locator('div').filter({ hasText: /^你要去哪儿\?$/ }).nth(1).click();
  await page.getByText('七贤岭森林公园').click();
  await page.getByText('同时呼叫 (预估1-5元)').click();
  await page.getByRole('button', { name: '确认叫车' }).click();
  await expect(page.locator('body')).toMatchAriaSnapshot(`- text: 用车时间不在限制范围内`);
});