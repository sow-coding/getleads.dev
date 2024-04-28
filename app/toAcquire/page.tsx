import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ToAcquire() {

  return (
    <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">To Acquire</CardTitle>
        <CardDescription>
            Do you want to acquire getleads.dev?
        </CardDescription>
      </CardHeader>
        <div className="mx-4 my-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              {`I am open to the acquisition and buyout proposal for getleads.dev, do not hesitate to contact me at: saikou@getleads.dev to discuss it.`}
            </div>
          </div>
        </div>
    </Card>
  );
}
