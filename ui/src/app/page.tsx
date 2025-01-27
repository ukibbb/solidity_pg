"use client";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card , CardFooter } from "@/components/ui/card";

export default function Home() {
  const handleFun = () => {};

  const handleExit = () => {
  };

  return (
    <div className="flex justify-center items-center h-screen w-8/12">
      <Card className="shadow-lg flex justify-center items-center">
        <Alert>
          <AlertTitle>Disclaimer!</AlertTitle>
          <AlertDescription>
            Please be aware that gambling, in any form, carries significant
            risks and should be undertaken responsibly. It is not a way to
            secure financial stability or gain wealth and should always be
            considered as a form of entertainment with potential losses.

            But if you are looking for transparency, decentralization, security,
            and fairness underlines a robust and trustworthy blockchain betting
            platform, appealing to users who value privacy, fairness, and
            security in their online betting experiences.
          </AlertDescription>
        </Alert>
        <CardFooter>
          <Button onClick={handleFun}>{"Let's have fun!"}</Button>
          <Button onClick={handleExit}>Exit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
