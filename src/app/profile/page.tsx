import { redirect } from "next/navigation";

// /profile redirects to the current user's profile
export default function ProfileRedirect() {
  redirect("/profile/1");
}
