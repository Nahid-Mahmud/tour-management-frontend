import TimerDisplay from "@/components/TimerDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { ArrowLeft, Mail, Shield } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

function VerifyComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);

  console.log(location.state);

  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [sendOtpFn, { isLoading: optSendingLoading }] = useSendOtpMutation();
  const [verifyOtpFn, { isLoading: otpVerifyingLoading }] = useVerifyOtpMutation();

  const handleSubmit = async () => {
    try {
      const res = await verifyOtpFn({
        email: location.state,
        otp: otp,
      }).unwrap();

      if (res.success) {
        toast.success("Account verified successfully.");
        navigate("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleTimerEnd = useCallback(() => {
    setCanResend(true);
  }, []);

  const handleResend = useCallback(async () => {
    setIsResending(true);
    setCanResend(false);

    // Simulate resend API call
    setTimeout(() => {
      setIsResending(false);
      setResetTrigger((prev) => prev + 1); // Trigger timer reset
    }, 1000);
  }, []);

  // ! enable in production
  // useEffect(() => {
  //   if (!location.state) {
  //     navigate("/");
  //   }
  // }, [location.state, navigate]);

  // if (!location.state) return null;

  const handleSentOtp = async () => {
    console.log(location.state);
    try {
      const res = await sendOtpFn({ email: location.state }).unwrap();
      console.log(res);

      if (res.success) {
        toast.success("Otp sent. Please check your email.");
        setOtpSent(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <>
      {!otpSent ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
                  <CardDescription className="text-base mt-2">
                    A verification mail will be sent to {location.state}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  className="w-full cursor-pointer disabled:cursor-not-allowed"
                  disabled={optSendingLoading}
                  onClick={handleSentOtp}
                >
                  {optSendingLoading ? "Sending..." : `Send OTP to Email`}
                </Button>
              </CardContent>
              <CardFooter className="text-center">
                <p className="text-xs text-muted-foreground">
                  An OTP will be sent to your registered email for verification.
                </p>
              </CardFooter>
            </Card>
            <p className="text-center text-xs text-muted-foreground mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Back button */}
            <Link
              to={"/login"}
              className="mb-6  flex items-center bg-white w-fit p-3 rounded-sm font-semibold shadow-md "
            >
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
                    <span className="font-medium text-foreground">{location.state}</span>
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

                <Button onClick={handleSubmit} className="w-full cursor-pointer">
                  {otpVerifyingLoading ? "Verifying..." : `Verify Code`}
                </Button>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 text-center">
                <TimerDisplay onTimerEnd={handleTimerEnd} initialTime={180} resetTrigger={resetTrigger} />
                <Button
                  variant="outline"
                  onClick={handleResend}
                  disabled={isResending || !canResend}
                  className="w-full bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {isResending ? "Sending..." : `Resend code `}
                </Button>
                <p className="text-xs text-muted-foreground">Code expires in 2 minutes</p>
              </CardFooter>
            </Card>

            <p className="text-center text-xs text-muted-foreground mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Wrap the component with React.memo to prevent unnecessary re-renders
// Only re-render when props actually change
export default memo(VerifyComponent);
