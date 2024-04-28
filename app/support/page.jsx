import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Support () {
  return (
    <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Support</CardTitle>
        <CardDescription>
        If you have any problem, do not hesitate to contact us at this email address:
        </CardDescription>
      </CardHeader>
        <div className="mx-4 my-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <h1 className="text-2xl font-bold">support@swos.be</h1>
            </div>
          </div>
        </div>
    </Card>
  );
}
