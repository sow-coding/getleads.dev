import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {

  return (
    <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Contact</CardTitle>
        <CardDescription>
            Need to contact getleads.dev?
        </CardDescription>
      </CardHeader>
        <div className="mx-4 my-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              {`Please contact us via the following email address: saikou@getleads.dev,`}
              <br />
              <p className="font-bold">
              That said, if it is for a support question, please only contact us at support@swos.be
              </p>
            </div>
          </div>
        </div>
    </Card>
  );
}
