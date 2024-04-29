import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Upgrade() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect("/login")
    } 
    const userId = data.user?.id

  return (
    <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Free trial ended</CardTitle>
        <CardDescription>
            You no longer have free searches.
        </CardDescription>
      </CardHeader>
        <div className="mx-4 my-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              {`Hey, thanks for trying getleads.dev. The free trial only allows 2 searches, to do more searches and take full advantage of the current features of getleads.dev please purchase it.`}
            </div>
            <Button type="button" variant={"outline"} className="w-full">
              <a href={`https://swos.lemonsqueezy.com/buy/b46b64ec-9c60-4e5f-968a-1b7ec399e3b0?checkout[custom][nkn]=${userId}&checkout[email]=${data.user?.email}&checkout[custom][userType]=classic`}>Get classic getleads.dev</a>
            </Button>
            <Button type="button" className="w-full">
              <a href={`https://swos.lemonsqueezy.com/buy/66a631bf-ef10-443f-9de3-d40ed38f358b?checkout[custom][nkn]=${userId}&checkout[email]=${data.user?.email}&checkout[custom][userType]=premium`}>Get premium getleads.dev</a>
            </Button>
            <a href="/#pricing" className="mt-4 text-center" style={{textDecoration: "underline"}}>What is the difference between the two?</a>
          </div>
        </div>
    </Card>
  );
}
