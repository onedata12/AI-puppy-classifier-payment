import React from 'react';
import '../styles/components/PaymentModal.css';

const PaymentModal = ({ onClose }) => {
  return (
    <div className="payment-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>프리미엄 구독</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="subscription-card">
          <div className="price-tag">
            <span className="amount">₩1,000</span>
            <span className="period">/월</span>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5l-9.167 9.167L2.5 9.167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              무제한 반려동물 감정 분석
            </div>
            <div className="feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5l-9.167 9.167L2.5 9.167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              AI 맞춤형 훈련 가이드
            </div>
            <div className="feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5l-9.167 9.167L2.5 9.167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              프리미엄 고객 지원
            </div>
          </div>

          <div className="button-group">
            <button className="payment-button">
              구독하기
            </button>
            <button className="later-button" onClick={onClose}>
              다음에 하기
            </button>
          </div>
        </div>

        <div className="terms-section">
          <p>
            구독하기를 클릭하면 <a href="/terms">이용약관</a>과 
            <a href="/privacy">개인정보 처리방침</a>에 동의하게 됩니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;