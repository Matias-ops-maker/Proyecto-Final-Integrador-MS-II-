import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: { timeout: 5000 }
});

const preference = new Preference(client);

export async function createPayment(req, res) {
  try {
    const { items, payer, back_urls, external_reference, notification_url, metadata } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No hay items en el carrito'
      });
    }

    const body = {
      items: items,
      payer: payer,
      back_urls: back_urls,
      auto_return: 'approved',
      external_reference: external_reference,
      notification_url: notification_url,
      statement_descriptor: 'RepuestosAuto',
      metadata: metadata || {},
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() 
    };

    console.log('Creating payment preference with data:', JSON.stringify(body, null, 2));

    const response = await preference.create({ body });
    
    res.json({
      success: true,
      preferenceId: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la preferencia de pago',
      error: error.message,
      details: error.response?.data || null
    });
  }
}

export async function paymentWebhook(req, res) {
  try {
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      }
    
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('Error');
  }
}

export async function getPaymentStatus(req, res) {
  try {
    const { paymentId } = req.params;

    res.json({
      payment_id: paymentId,
      status: 'approved',
      amount: 1000,
      payment_method: 'credit_card'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el estado del pago'
    });
  }
}



