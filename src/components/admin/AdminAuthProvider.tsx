import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect } from "react";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const { user, isAdmin, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (!user || !isAdmin) {
                navigate("/login");
            }
        }
    }, [user, isAdmin, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        );
    }

    if (!user || !isAdmin) return null;

    return <>{children}</>;
}

// Re-export useAdminAuth as an alias pointing to global useAuth
export { useAuth as useAdminAuth } from "@/components/auth/AuthProvider";
