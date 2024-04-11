"use client"
import React from "react";
import {Input} from "@nextui-org/react";

export default function KeywordsInput() {
  return (
    <Input
      type="text"
      label="Keywords"
      placeholder="Sales, SaaS, SEO, Branding..."
      description="Separate keywords with spaces"
      className="max-w-xs mx-4 max-lg:mx-0 max-lg:my-4"
    />
  );
}
