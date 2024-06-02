import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";

export function DocCard({ doc }: { doc: Doc<"docs"> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{doc.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {!doc.description ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            doc.description
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="flex items-center gap-2"
          variant={"secondary"}
        >
          <Link href={`/dashboard/docs/${doc._id}`}>
            <Eye className="h-4 w-4" /> View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
