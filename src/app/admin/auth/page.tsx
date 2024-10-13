"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICreateAdminInput } from "@/features/managers/type";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/managers/rules";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLoginForm() {
  const router = useRouter();

  const form = useForm<ICreateAdminInput>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = form;

  const onLogin = async (data: ICreateAdminInput) => {
    console.log("🚀 ~ onLogin ~ data:", data);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        console.log("🚀 ~ onLogin ~ res?.error:", res?.error);
        toast.error(
          `Cannot login, ${res?.error || "check you email or password"}`
        );
      } else {
        router.push("/admin/categories");
      }
    } catch (error) {
      toast.error("Cannot login, check you email or password");
    }
  };
  return (
    <div className="flex flex-1 justify-center items-center content-center h-screen">
      <Form {...form}>
        <form onSubmit={handleSubmit(onLogin)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
                <br />
                <b>admin5@gmail.com / 123</b>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={!isValid}>
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}
