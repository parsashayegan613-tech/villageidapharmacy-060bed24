import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowRight, Pill } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirect") || null;
    const { user, isAdmin, isLoading: authLoading } = useAuth();

    // Redirect if already logged in or just logged in
    useEffect(() => {
        if (user && !authLoading && justLoggedIn) {
            if (isAdmin) {
                navigate("/admin", { replace: true });
            } else {
                // Failsafe: if a regular user somehow logs in, redirect to home
                navigate("/", { replace: true });
            }
        }
    }, [user, isAdmin, authLoading, justLoggedIn, navigate]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
            if (authError) throw authError;
            setJustLoggedIn(true);
            // The useEffect above will handle the redirect once AuthProvider updates
        } catch (err: any) {
            setError(err.message || "Invalid email or password.");
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email first.");
            return;
        }
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/login`,
            });
            if (error) throw error;
            toast.success("Password reset email sent! Check your inbox.");
        } catch (err: any) {
            setError(err.message || "Could not send reset email.");
        }
    };

    return (
        <Layout>
            <SEOHead title="Admin Portal | Village IDA Pharmacy" description="Secure staff login for Village IDA Pharmacy." />

            <section className="py-20 md:py-28 flex items-center justify-center">
                <div className="w-full max-w-sm mx-auto px-4">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                            <Pill className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-foreground">
                            Admin Portal
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Secure access for pharmacy staff.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
                        <form onSubmit={handleSignIn} className="space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="villageidapharmacy@gmail.com"
                                    required
                                    className="mt-1.5"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="mt-1.5"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full rounded-full gap-2 mt-2" size="lg">
                                {isLoading ? "Signing in..." : "Sign In"}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
