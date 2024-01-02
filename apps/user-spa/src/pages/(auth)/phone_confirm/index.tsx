import { PhoneConfirmForm } from "./_components/PhoneConfirmForm";

const PhoneConfirm = () => {
  console.log("asdfasdf");
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-wrap place-content-around  ">
        <div className="border-primary m-4 flex flex-1 flex-col justify-center rounded-3xl border px-16 py-32">
          <div className="flex flex-col space-y-2 text-center ">
            <h1 className=" text-primary  text-2xl font-bold tracking-tight">
              電話番号認証
            </h1>

            <PhoneConfirmForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhoneConfirm;
