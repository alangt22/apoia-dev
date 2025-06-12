import { NextResponse, NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';


export async function POST(req: NextRequest) {

  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

  } catch (error) {
    console.error('Falha ao processar o webhook', error);
    return new NextResponse('Webhook Error', {status: 400,});
  }

  switch (event.type) {
    case 'checkout.session.completed': 
      const session = event.data.object as Stripe.Checkout.Session
      const paymentIntentId = session.payment_intent as string

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log(' ## PaymentIntent:', paymentIntent)

    const donarName = paymentIntent.metadata.donarName;
    const donarMessage = paymentIntent.metadata.donarMessage;
    const donateId = paymentIntent.metadata.donationId;

    try {
        const updateDonation = await prisma.donation.update({
            where: {
                id: donateId
            },
            data: {
                status: 'PAID',
                donarName: donarName ?? "Anônimo",
                donarMessage: donarMessage ?? "Nenhuma mensagem",
            }
        })


        console.log('Doação atualizada com sucesso: ', updateDonation);

    } catch (error) {
        console.error('Erro ao salvar doação no banco de dados', error);
    }
    break;

    default:
      console.log(`Evento desconhecido ${event.type}`);
  }

  return NextResponse.json({ ok: true });


}
