"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { ArrowLeft, Mail, Shield } from "lucide-react";
import { Link } from "react-router";

export default function Verify() {
  const [otp, setOtp] = useState("");

  const [isResending, setIsResending] = useState(false);

  const [timer, setTimer] = useState(180);

  const handleSubmit = async () => {};

  const handleResend = async () => {
    setIsResending(true);

    // Simulate resend API call
    setTimeout(() => {
      setIsResending(false);
      setTimer(5);
      //   alert("New OTP code sent!");
    }, 1000);
  };

  useEffect(() => {
    // Only start timer if timer > 0
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]); // Add timer as dependency

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link to={"/login"} className="mb-6  flex items-center bg-white w-fit p-3 rounded-sm font-semibold shadow-md ">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Verify your account</CardTitle>
              <CardDescription className="text-base mt-2">
                We've sent a 6-digit verification code to
                <br />
                <span className="font-medium text-foreground">john@example.com</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-center block">Enter verification code</label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                  }}
                  pattern="^[0-9]*$"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  -
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Verify Code
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-muted-foreground">{"Didn't receive the code?" + " " + timer + ` seconds`}</div>
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={isResending || !!timer}
              className="w-full bg-transparent"
            >
              <Mail className="w-4 h-4 mr-2" />
              {isResending ? "Sending..." : `Resend code `}
            </Button>
            <p className="text-xs text-muted-foreground">Code expires in 5 minutes</p>
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
