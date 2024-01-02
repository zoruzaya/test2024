export const Navbar = ({ companyName }: { companyName: string }) => (
  <div className=" flex h-12 items-center self-center rounded-none px-4">
    <div className="text-primary font-bold">{companyName}</div>
  </div>
);
