"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { VillageIdaLogo } from "@/components/VillageIdaLogo";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

        if (authError || !data.user) {
            setError("Invalid email or password.");
            setLoading(false);
            return;
        }

        // Verify this user is in the admin_users table
        const { data: adminData } = await supabase
            .from("admin_users")
            .select("id")
            .eq("id", data.user.id)
            .single();

        if (!adminData) {
            await supabase.auth.signOut();
            setError("You are not authorized to access the admin panel.");
            setLoading(false);
            return;
        }

        router.replace("/admin");
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-5">
                        <VillageIdaLogo className="h-14 w-auto" />
                    </div>
                    <h1 className="text-white text-xl font-semibold">Admin Login</h1>
                    <p className="text-zinc-500 text-sm mt-1">Village IDA Pharmacy</p>
                </div>

                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-zinc-300 text-sm">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="mt-2 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-zinc-300 text-sm">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="mt-2 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2.5">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-zinc-600 text-xs mt-6">
                    Staff access only · Village IDA Pharmacy
                </p>
            </div>
        </div>
    );
}
