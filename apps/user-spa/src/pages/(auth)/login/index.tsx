import { LoginForm } from "./_components/loginForm";

const Login = () => (
  <div className="flex flex-1">
    <div className="flex flex-1 flex-wrap place-content-around  ">
      <div className="border-primary m-4 flex flex-1 flex-col justify-center rounded-3xl border px-16 py-32">
        <div className="flex flex-col space-y-2 text-center ">
          <h1 className=" text-primary  text-2xl font-bold tracking-tight">
            Log In
          </h1>

          <LoginForm />
          <div>OR</div>
          <a
            href="/signup"
            className=" h-8 rounded bg-red-600 text-white"
            type="submit"
          >
            会員登録
          </a>
        </div>
      </div>
    </div>
  </div>
);
export default Login;
