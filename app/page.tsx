"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "@/public/niso.png";
import bgImage from "@/public/tcnimg.jpg";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, setUser } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login - set a demo user
    setUser({
      id: "1",
      email: "admin@niso.ng",
      name: "Admin User",
      role: "super_admin",
      entityType: "niso",
      entityId: "1",
      entityName: "NISO - Nigeria Independent System Operator",
      department: "Administration",
      status: "active",
      permissions: ["dashboard:view", "users:view", "users:create", "users:edit", "users:delete"],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    toast.success("Login successful!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image src={logo} alt="NISO Logo" className="h-16 w-24" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Nigeria Independent System Operator</p>
            <p className="text-sm text-gray-500 mt-1">
              Enterprise Resource Planning System
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@niso.ng"
                    defaultValue="admin@niso.ng"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    defaultValue="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-900 mb-2">
                  Demo Credentials:
                </p>
                <p className="text-xs text-blue-700">Email: admin@niso.ng</p>
                <p className="text-xs text-blue-700">Password: password</p>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-gray-500 mt-8">
            © 2025 Nigeria Independent System Operator. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:flex flex-1 relative">
        <Image
          src={bgImage}
          alt="TCN Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute top-50 left-0 right-0 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Powering Nigeria&apos;s Future
          </h2>
          <p className="text-lg text-gray-200">
            Managing grid operations, billing, and settlements for a reliable
            power supply
          </p>
        </div>
      </div>
    </div>
  );
}
