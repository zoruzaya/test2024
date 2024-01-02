import { UserAuthForm } from "./_components/user-auth-form";

const Login = () => (
  <div className="flex flex-1">
    <div className="flex flex-1 flex-wrap place-content-around  ">
      <div className="m-4 flex flex-1 flex-col justify-center  border border-slate-400 p-4">
        <div className="flex flex-col space-y-8 text-center ">
          <h1 className=" text-primary  text-2xl font-bold tracking-tight">
            サインイン
          </h1>
          <p className="text-muted-foreground text-sm">
            アカウントをお持ちでない場合は
            <br />
            お問い合わせしてください。
          </p>
          <UserAuthForm />
        </div>
        <a
          href="/forgot-password"
          className=" text-primary py-2 text-right text-xs underline underline-offset-4"
        >
          パスワードを忘れた方はこちらへ
        </a>
        <p className=" text-muted-foreground py-4 text-center text-sm">
          「ログイン」、「アカウント登録」することで
          <br />
          <a
            href="/terms"
            className="text-primary underline underline-offset-4"
          >
            サービス利用規約
          </a>
          、
          <a
            href="/privacy"
            className="text-primary underline underline-offset-4"
          >
            個人情報保護ポリシー
          </a>
          <br />
          に同意します。
        </p>
      </div>
    </div>
  </div>
);
export default Login;
