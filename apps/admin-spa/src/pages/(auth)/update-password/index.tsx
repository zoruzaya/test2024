import { UserAuthForm } from "./_components/user-auth-form";

const ResetPasswordPage = () => (
  <div className="flex flex-1 ">
    <div className="flex flex-1 flex-wrap place-content-around">
      <div className="m-4  flex  flex-1 flex-col  justify-center space-y-6 border border-slate-400 p-4">
        <div className=" flex flex-col space-y-8 text-center">
          <h1 className=" text-primary flex-1  text-2xl font-bold tracking-tight">
            サインイン
          </h1>
          <p className="text-muted-foreground text-sm">
            アカウントをお持ちでない場合は
            <br />
            お問い合わせしてください。
          </p>
          <UserAuthForm />
        </div>
      </div>
    </div>
  </div>
);
export default ResetPasswordPage;
