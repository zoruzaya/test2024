import { expect, test } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("メール").click();
  await page.getByPlaceholder("メール").fill("matart15@gmail.com");
  await page.getByPlaceholder("パスワード").click();
  await page.getByPlaceholder("パスワード").fill("Ab123456");
  await page.getByRole("button", { name: "ログイン" }).click();
});
test("login-fail", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByRole("button", { name: "ログイン" }).click();
  await page.getByText("メールアドレスの形式で入力してください").click();
  await page.getByText("8文字以上で入力してください").click();
});

test("forgot-password-wrong-input", async ({ page }) => {
  await page.goto("http://localhost:3000/forgot-password");
  await page.getByPlaceholder("メール").click();
  await page.getByPlaceholder("メール").fill("asdf@asdf");
  await page.getByRole("button", { name: "送信" }).click();
  await expect(
    await page.getByText("メールアドレスの形式で入力してください"),
  ).toBeVisible();
});
