import { redirect } from "next/navigation";

// Zomato Ltd rebranded to Eternal Ltd — keep the old URL working.
export default function ZomatoRedirect() {
  redirect("/companies/eternal");
}
