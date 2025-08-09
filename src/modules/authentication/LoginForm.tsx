import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [loginFn, { isLoading: loginLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);
    try {
      const res = await loginFn({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res.success) {
        toast.success("Login successful");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message || "Login failed");
      if (error.data.message === "User is not verified") {
        navigate("/verify", {
          state: data.email,
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-5xl font-thin">Ruhi</h2>
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email and password below to login to your account
        </p>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type={showPassword ? "text" : "password"} {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">This is your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`bg-transparent text-black hover:bg-transparent shadow-none absolute right-0 top-[1.4rem] cursor-pointer`}
              >
                {showPassword ? <LucideEye /> : <LucideEyeClosed />}
              </Button>
            </div>
            <Button disabled={loginLoading} type="submit" className="w-full cursor-pointer">
              {loginLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
