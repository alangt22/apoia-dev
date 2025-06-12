"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const createPaymentSchema = z.object({
  slug: z.string().min(1, "O username é obrigatório"),
  name: z.string().min(1, "O nome deve ter pelo menos 3 caracteres"),
  message: z.string().min(1, "A mensagem deve ter pelo menos 3 caracteres"),
  price: z.number().min(1500, "O valor deve ser maior que R$10"),
  creatorId: z.string(),
});

type CreatePaymentSchema = z.infer<typeof createPaymentSchema>;

export async function createPayment(data: CreatePaymentSchema) {
  const schema = createPaymentSchema.safeParse(data);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  if(!data.creatorId) {
    return {
      error: "Falha ao criar o pagamento",
    };
  }

  try {
   const creator = await prisma.user.findFirst({
      where: {
        connectedStripeAccountId: data.creatorId,
      }
    });

    if(!creator) {
      return {
        error: "Falha ao criar o pagamento",
      };
    }

    const applicationFeeAmount = Math.floor(data.price * 0.1);

    const donation = await prisma.donation.create({
      data: {
        donarName: data.name,
        donarMessage: data.message,
        userId: creator.id,
        status: "PENDING",
        amount: (data.price - applicationFeeAmount),
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.HOST_URL}/creator/${data.slug}`,
      cancel_url: `${process.env.HOST_URL}/creator/${data.slug}`,
      line_items: [
        {
         price_data: {
          currency: "brl",
          product_data: {
            name: `Apoiar ${creator.name}`,
          },
          unit_amount: data.price,
         },
         quantity: 1,
        }
      ],
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount, // esse valor precisa estar em centavos
        transfer_data: {
          destination: creator.connectedStripeAccountId as string, // ID da conta do criador
        },
        metadata: {
          donarName: data.name,
          donarMessage: data.message,
          donationId: donation.id, // ID da doação para vincular com o pagamento
        }
      }
    })

    return {
      sessionId: session.id,
    }

  } catch (error) {
    return {
      error: "Falha ao criar o pagamento",
    };
  }
}
