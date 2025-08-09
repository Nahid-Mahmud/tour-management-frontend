import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters long",
      })
      .max(100)
      .nonempty(),
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().nonempty({
      message: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function RegisterForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [registerFn, { isLoading: registerLoading }] = useRegisterMutation();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof registerSchema>) => {
    console.log("Form submitted with data:", data);

    const dataToSend = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const result = await registerFn(dataToSend).unwrap();
      if (result.success) {
        toast.success("Registration successful!", {
          description: "Please Verify your account",
        });
        form.reset();
        navigate("/verify");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">Enter your details to create an account</p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your password confirmation.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <Button type="submit" className="w-full cursor-pointer" disabled={registerLoading}>
              {registerLoading ? `Loading...` : `Submit`}
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>

        <Button type="button" variant="outline" className="w-full cursor-pointer">
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
