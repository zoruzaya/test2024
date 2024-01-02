import { ForgotPasswordForm } from "./_components/forgotPasswordForm";

const Login = () => (
  <div className="flex flex-1 ">
    <div className="flex flex-1 flex-wrap place-content-around">
      <div className="border-primary m-4 flex flex-1 flex-col justify-center rounded-3xl border px-16 py-32">
        <div className=" flex flex-col space-y-8 text-center">
          <h1 className=" text-primary flex-1  text-2xl font-bold tracking-tight">
            パスワード再設定
          </h1>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  </div>
);
export default Login;
