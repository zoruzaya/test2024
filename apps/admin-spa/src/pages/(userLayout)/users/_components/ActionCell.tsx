import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@spec-team/ui";

export const ActionCell = ({ id }: { id: string }) => (
  <div className="flex flex-row">
    <Button variant="link" size="icon">
      <a href={`/users/${id}/edit`}>
        <Pencil2Icon className="h-4 w-4" />
      </a>
    </Button>
  </div>
);
