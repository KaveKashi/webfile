import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [_, navigate] = useLocation();
  const { user, isLoading } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-burgundy border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-church flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Left Column - Auth Forms */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <CardTitle className="text-3xl font-cormorant">Welcome to St. Mary's Parish</CardTitle>
            <CardDescription>
              Sign in to your account or register to access the church management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right Column - Informational Content */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="bg-white/90 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-cormorant font-bold text-burgundy mb-4">
              Church Management System
            </h2>
            <p className="text-gray-700 mb-6">
              Our management system helps you:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-burgundy mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Manage your profile and family information</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-burgundy mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Upload and organize important documents</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-burgundy mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Track sacraments and church participation</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-burgundy mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Stay updated on church events and announcements</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <blockquote className="italic text-gray-600">
                "For where two or three gather in my name, there am I with them."
                <footer className="font-semibold mt-2">Matthew 18:20</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
