import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUs() {

  return (
    <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">About Us</CardTitle>
        <CardDescription>
            Learn more about the founder of getleads.dev
        </CardDescription>
      </CardHeader>
        <div className="mx-4 my-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              {`Hey, I'm the founder of getleads.dev, I'm an indie hacker who started as a simple front-end developer a few years ago, I've always loved application development and I discovered a few months ago that some developers (big up to Pieter levels and Marc lou) created SaaS by working alone on development and managed to earn a lot of money with it, so I was filled with motivation and decided that I too could finally achieve my dream and do what I started web development which was to be free. Don't hesitate to contact me on X for any questions and come follow me there to follow my journey ;)`}
            </div>
            <Button type="button" className="w-full">
              <a href="https://twitter.com/sow4code">X of the founder</a>
            </Button>
          </div>
        </div>
    </Card>
  );
}
