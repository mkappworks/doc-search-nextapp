import { redirect } from "next/navigation";

export default function DashBoardPage() {
  //TODO: if not signed in, redirect to sign in page
  redirect("/dashboard/docs");
}
