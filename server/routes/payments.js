const express = require('express');
const router = express.Router();

router.post('/naver', async (req, res) => {
  try {
    // 네이버페이 테스트 모드 기준
    const response = await fetch('https://dev.apis.naver.com/naverpay-partner/naverpay/payments/v2/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
      },
      body: JSON.stringify({
        merchantPayKey: `order_${Date.now()}`,
        productName: req.body.productName,
        totalPayAmount: req.body.amount,
        taxScopeAmount: req.body.amount,
        taxExScopeAmount: 0,
        returnUrl: `${process.env.SERVICE_URL}/payments/complete`,
        cancelUrl: `${process.env.SERVICE_URL}/payments/cancel`,
      })
    });

    const data = await response.json();
    res.json({ paymentUrl: data.paymentUrl });
    
  } catch (error) {
    console.error('네이버페이 결제 오류:', error);
    res.status(500).json({ error: '결제 처리 중 오류가 발생했습니다.' });
  }
}); 