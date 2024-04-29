import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function NotInFreeTrial() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    const userId = data.user?.id

  return (
    <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Email verification</CardTitle>
        <CardDescription>
            {`Always check the email to optimize your deliverability ;)`}
        </CardDescription>
      </CardHeader>
        <div className="mx-4 my-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              {`Email verification is only available for Premium users, if you want to have access to it you must move from a classic account to a premium account by paying the difference price between the two which is the price of the verification email from getleads.dev which is $30 when your account will go from classic to premium.`}
            </div>
            <Button type="button" className="w-full">
              <a href={`https://swos.lemonsqueezy.com/buy/0ccbaea5-9a77-4467-8c00-7dc3362b23fb?checkout[custom][nkn]=${userId}&checkout[email]=${data.user?.email}`}>Get premium getleads.dev</a>
            </Button>
          </div>
        </div>
    </Card>
  );
}
