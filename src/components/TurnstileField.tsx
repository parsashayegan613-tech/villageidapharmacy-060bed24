"use client";

import { Turnstile } from "@marsidev/react-turnstile";

type TurnstileFieldProps = {
  action: string;
  onVerify: (token: string) => void;
  onReset: () => void;
};

export function TurnstileField({ action, onVerify, onReset }: TurnstileFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) return null;

  return (
    <div className="flex justify-center">
      <Turnstile
        siteKey={siteKey}
        onSuccess={onVerify}
        onExpire={onReset}
        onError={onReset}
        onTimeout={onReset}
        options={{
          action,
          theme: "auto",
          size: "flexible",
        }}
      />
    </div>
  );
}
