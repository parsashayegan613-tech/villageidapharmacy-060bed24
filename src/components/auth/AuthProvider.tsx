import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isAdmin: boolean;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isAdmin: false,
    isLoading: true,
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set up auth state listener FIRST (Supabase best practice)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    // Use setTimeout to avoid Supabase client deadlock
                    setTimeout(async () => {
                        try {
                            const { data } = await supabase
                                .from("admin_users")
                                .select("id")
                                .eq("id", session.user.id)
                                .maybeSingle();
                            setIsAdmin(!!data);
                        } catch {
                            setIsAdmin(false);
                        }
                        setIsLoading(false);
                    }, 0);
                } else {
                    setIsAdmin(false);
                    setIsLoading(false);
                }
            }
        );

        // Then check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // No session - stop loading immediately
                setIsLoading(false);
            }
            // If there IS a session, onAuthStateChange will fire and handle it
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
