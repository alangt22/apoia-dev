"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function CreateAccountButton() {
  const [loading, setLoading] = useState(false);

  async function handleCreateStripeAccount() {
    setLoading(true);

    try {
      const res = await fetch(
        "https://apoia-dev-brown.vercel.app/api/stripe/create-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("Erro ao criar conta de pagamento");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Erro ao criar conta de pagamento:", error);
      setLoading(false);
    }
  }

  return (
    <div className="mb-5 ">
      <Button
        className="cursor-pointer"
        disabled={loading}
        onClick={handleCreateStripeAccount}
      >
        {loading ? "Carregando..." : "Ativar conta de pagamento"}
      </Button>
    </div>
  );
}
