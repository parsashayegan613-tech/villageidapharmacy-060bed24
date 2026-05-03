import { NextResponse, type NextRequest } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  request: NextRequest,
  bucket: string,
  limit = 5,
  windowMs = 60_000,
) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "local";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return { allowed: true, retryAfter: 0 };
}

export function rateLimitResponse(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many requests. Please wait a moment and try again." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    },
  );
}

export function isHoneypotFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export function optionalText(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function verifyTurnstile(request: NextRequest, token: string | undefined) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return {
      ok: process.env.NODE_ENV !== "production",
      error: "Anti-spam verification is not configured.",
    };
  }

  if (!token) {
    return { ok: false, error: "Complete the anti-spam check and try again." };
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || undefined;
  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip) {
    body.set("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    return { ok: false, error: "Anti-spam verification failed. Please try again." };
  }

  return { ok: true, error: null };
}
