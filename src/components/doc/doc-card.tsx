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
import { Eye } from "lucide-react";
import Link from "next/link";

export function DocCard({ doc }: { doc: Doc<"docs"> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{doc.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="flex items-center gap-2"
          variant={"secondary"}
        >
          <Link href={`/docs/${doc._id}`}>
            <Eye className="w-4 h-4" /> View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
