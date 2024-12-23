import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount, currency } = body;

  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({
        error: "Please  entera valid email address",
        status: 400,
      }),
    );
  }
  let customer;
  const existingCustomer = await stripe.customers.list({ email });
  if (existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0];
  } else {
    const newCustomer = await stripe.customers.create({
      name,
      email,
    });

    customer = newCustomer;
  }
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-12-18.acacia" },
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    }),
  );
}

// app.post("/payment-sheet", async (req, res) => {
//   // Use an existing Customer ID if this is a returning customer.
//   const customer = await stripe.customers.create();
//   const ephemeralKey = await stripe.ephemeralKeys.create(
//     { customer: customer.id },
//     { apiVersion: "2024-12-18.acacia" },
//   );
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: "eur",
//     customer: customer.id,
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter
//     // is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//
//   res.json({
//     paymentIntent: paymentIntent.client_secret,
//     ephemeralKey: ephemeralKey.secret,
//     customer: customer.id,
//     publishableKey:
//       "pk_test_51QZDCY1OddU0PDdqIs1lFbaHX3WNjprUuW9s1z0B5jUHw8wmBeaA4gjazLLe6BZtzo7hzwkaHAMkzHkpH807U5060077R7xobM",
//   });
// });
