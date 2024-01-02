import { UserAuthForm } from "./_components/signupForm";

const Login = () => (
  <div className="flex flex-1">
    <div className="flex flex-1 flex-wrap place-content-around  ">
      <div className="border-primary m-4 flex flex-1 flex-col justify-center rounded-3xl border px-16 py-32">
        <div className="flex flex-col space-y-2 text-center ">
          <h1 className=" text-primary  text-2xl font-bold tracking-tight">
            会員登録
          </h1>
          <UserAuthForm />
          <div>OR</div>
          <a
            href="/login"
            className=" bg-primary h-8 rounded text-white"
            type="submit"
          >
            ログイン
          </a>
        </div>
      </div>
    </div>
  </div>
);
export default Login;
