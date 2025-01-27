import { getIps } from "@kristall/get-ips";
import { expect, test } from "@playwright/test";

test("E2E test with multiple browsers", async ({ browser }) => {
	const ips = await getIps();

	const URL = `http:${ips[0].address}:3000`;

	const context = await browser.newContext({});
	const context2 = await browser.newContext({});
	const context3 = await browser.newContext({});

	const page = await context.newPage();
	await page.goto(URL);

	const page2 = await context2.newPage();
	await page2.waitForTimeout(2000);
	await page2.goto(URL);

	const page3 = await context3.newPage();
	await page3.waitForTimeout(2000);
	await page3.goto(URL);

	const title = await page.title();
	expect(title).toContain("Animación Planetas");

	const title2 = await page2.title();
	expect(title2).toContain("Animación Planetas");

	const title3 = await page3.title();
	await page3.waitForTimeout(5000);
	expect(title3).toContain("Animación Planetas");
	const canvas = page3.locator("canvas");
	await canvas.screenshot({ path: "test-results/screenshot.png" });
	await page3.waitForTimeout(2000);
	await page3.screenshot({ path: "test-results/screenshot2.png" });

	await context.close();
	await context2.close();
	// await context3.close();
});
