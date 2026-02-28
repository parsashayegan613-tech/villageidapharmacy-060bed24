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

type AuthMode = "signin" | "signup";

export default function Login() {
    const [mode, setMode] = useState<AuthMode>("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
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
                navigate(redirectTo || "/account", { replace: true });
            }
        }
    }, [user, isAdmin, authLoading, justLoggedIn, navigate, redirectTo]);

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

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: fullName, phone },
                },
            });
            if (authError) throw authError;

            toast.success("Account created! You can now sign in.");
            setMode("signin");
            setPassword("");
        } catch (err: any) {
            setError(err.message || "Could not create account.");
        } finally {
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
                redirectTo: `${window.location.origin}/login`,
            });
            if (error) throw error;
            toast.success("Password reset email sent! Check your inbox.");
        } catch (err: any) {
            setError(err.message || "Could not send reset email.");
        }
    };

    return (
        <Layout>
            <SEOHead title="Sign In | Village IDA Pharmacy" description="Sign in to your Village IDA Pharmacy account to track prescriptions, refills, and appointments." />

            <section className="py-20 md:py-28 flex items-center justify-center">
                <div className="w-full max-w-sm mx-auto px-4">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                            <Pill className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-foreground">
                            {mode === "signin" ? "Welcome back" : "Create an account"}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {mode === "signin" ? "Sign in to your pharmacy account." : "Track your prescriptions and appointments."}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-muted rounded-full p-1 mb-6">
                        <button
                            onClick={() => { setMode("signin"); setError(""); }}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium rounded-full transition-all",
                                mode === "signin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            )}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { setMode("signup"); setError(""); }}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium rounded-full transition-all",
                                mode === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            )}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
                        <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp} className="space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            {mode === "signup" && (
                                <>
                                    <div>
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Jane Doe"
                                            required
                                            className="mt-1.5"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone Number <span className="text-muted-foreground font-normal">(optional)</span></Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="780-555-1234"
                                            className="mt-1.5"
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="mt-1.5"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
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
                                {mode === "signin" && (
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="text-xs text-primary hover:underline mt-1.5 block"
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full rounded-full gap-2" size="lg">
                                {isLoading
                                    ? (mode === "signin" ? "Signing in..." : "Creating account...")
                                    : (mode === "signin" ? "Sign In" : "Create Account")
                                }
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
