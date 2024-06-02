import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton({
  isLoading,
  loadingText,
  children,
  onClick,
}: {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      className="flex items-center gap-1"
      onClick={onClick}
      disabled={isLoading}
      type="submit"
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}
