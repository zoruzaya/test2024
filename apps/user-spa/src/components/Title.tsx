import { cn } from "@/lib/utils";

export const Title = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <h1
    className={cn([" text-primary text-center text-2xl font-bold", className])}
  >
    {text}
  </h1>
);
