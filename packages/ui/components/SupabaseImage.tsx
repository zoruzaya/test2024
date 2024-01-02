/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const SupabaseImage = ({
  supabase,
  bucketName,
  path,
  className,
}: {
  supabase: any;
  bucketName: string;
  path: string | null;
  className?: string;
}) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  useEffect(() => {
    const getSignedUrl = async () => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(path, 60);
      if (error) throw error;
      setSignedUrl(data.signedUrl);
    };
    getSignedUrl().catch(() => {});
  }, [bucketName, path, supabase]);
  return signedUrl ? (
    <img className={cn(["w-full", className])} alt="image" src={signedUrl} />
  ) : null;
};
