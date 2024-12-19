import React from 'react';
import { Link } from 'react-router-dom';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import '../styles/components/PricingPage.css';

const PricingPage = () => {
  const handlePayment = async () => {
    const tossPayments = await loadTossPayments(process.env.REACT_APP_TOSS_CLIENT_KEY);

    try {
      await tossPayments.requestPayment('카드', {
        amount: 100,
        orderId: `order_${Date.now()}`,
        orderName: 'AI 강아지 감정 분석 서비스 이용권',
        customerName: '고객',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 에러:', error);
    }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>구독 정책 🎉</h1>
        <p>AI 강아지 감정 분석 서비스의 구독 정책을 안내해드립니다.</p>
      </div>

      <div className="pricing-content">
        <div className="pricing-plan">
          <h2>월 구독 요금제</h2>
          <div className="plan-price">
            <span className="amount">1,000</span>
            <span className="currency">원</span>
            <span className="period">/월</span>
          </div>
          <div className="plan-features">
            <h3>제공 혜택</h3>
            <ul>
              <li>무제한 강아지 감정 분석</li>
              <li>매일 24시간 이용 가능</li>
              <li>실시간 AI 분석</li>
            </ul>
          </div>
          <button onClick={handlePayment} className="subscribe-button">
            구독하기
          </button>
        </div>

        <div className="subscription-terms">
          <h3>구독 정책 안내</h3>
          
          <div className="terms-section">
            <h4>결제 정책</h4>
            <ul>
              <li>구독은 매월 자동으로 갱신됩니다</li>
              <li>결제일은 최초 구독 시작일을 기준으로 합니다</li>
              <li>안전한 결제를 위해 토스페이먼츠를 사용합니다</li>
            </ul>
          </div>

          <div className="terms-section">
            <h4>해지 및 환불</h4>
            <ul>
              <li>언제든지 구독 해지가 가능합니다</li>
              <li>해지 시점까지의 이용 금액을 제외한 금액이 환불됩니다</li>
              <li>해지 후에도 결제된 기간까지는 서비스 이용이 가능합니다</li>
            </ul>
          </div>

          <div className="terms-section">
            <h4>이용 안내</h4>
            <ul>
              <li>업로드 가능한 이미지 크기는 최대 5MB입니다</li>
              <li>지원되는 이미지 형식: JPG, PNG, WEBP</li>
              <li>분석 결과는 즉시 제공됩니다</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pricing-footer">
        <Link to="/" className="back-button">메인으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default PricingPage; 