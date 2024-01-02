import { Avatar, AvatarFallback } from "@spec-team/ui";

const salesData = [
  {
    amount: "+$1,999.00",
    avatar: "/avatars/01.png",
    email: "olivia.martin@email.com",
    fallback: "OM",
    name: "Olivia Martin",
  },
  {
    amount: "+$39.00",
    avatar: "/avatars/02.png",
    email: "jackson.lee@email.com",
    fallback: "JL",
    name: "Jackson Lee",
  },
  {
    amount: "+$299.00",
    avatar: "/avatars/03.png",
    email: "isabella.nguyen@email.com",
    fallback: "IN",
    name: "Isabella Nguyen",
  },
  {
    amount: "+$99.00",
    avatar: "/avatars/04.png",
    email: "will@email.com",
    fallback: "WK",
    name: "William Kim",
  },
  {
    amount: "+$39.00",
    avatar: "/avatars/05.png",
    email: "sofia.davis@email.com",
    fallback: "SD",
    name: "Sofia Davis",
  },
];
export const RecentSales = () => (
  <div className="space-y-8">
    {salesData.map((sale) => (
      <div key={sale.name} className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{sale.name}</p>
          <p className="text-muted-foreground text-sm">{sale.email}</p>
        </div>
        <div className="ml-auto font-medium">{sale.amount}</div>
      </div>
    ))}
  </div>
);
