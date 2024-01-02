import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@spec-team/ui";

import { RecentSales } from "./_components/recent-sales";

const AdminTop = () => (
  <Card className="col-span-3">
    <CardHeader>
      <CardTitle>Sales</CardTitle>
      <CardDescription>月間目標を達成 - 70% </CardDescription>
    </CardHeader>
    <CardContent>
      <RecentSales />
    </CardContent>
  </Card>
);
export default AdminTop;
