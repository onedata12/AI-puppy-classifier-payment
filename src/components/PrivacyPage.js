import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/PricingPage.css';

const PrivacyPage = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <h1>개인정보처리방침</h1>
        <p>AI 강아지 감정 분석 서비스의 개인정보처리방침입니다.</p>
      </div>

      <div className="privacy-content">
        <section>
          <h2>1. 개인정보의 수집 및 이용 목적</h2>
          <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
          <ul>
            <li>서비스 제공 및 계약의 이행</li>
            <li>구독료 결제 및 정산</li>
            <li>고객 상담 및 불만 처리</li>
          </ul>
        </section>

        <section>
          <h2>2. 수집하는 개인정보 항목</h2>
          <p>회사는 다음과 같은 개인정보를 수집합니다:</p>
          <ul>
            <li>필수항목: 이메일 주소, 결제 정보</li>
            <li>선택항목: 반려동물 정보</li>
          </ul>
        </section>

        <section>
          <h2>3. 개인정보의 보유 및 이용기간</h2>
          <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
        </section>

        <section>
          <h2>4. 개인정보의 파기절차 및 방법</h2>
          <p>개인정보 파기 절차 및 방법은 다음과 같습니다:</p>
          <ul>
            <li>파기절차: 이용목적 달성 후 내부 방침에 따라 파기</li>
            <li>파기방법: 전자적 파일 형태의 정보는 기술적 방법으로 삭제</li>
          </ul>
        </section>

        <section>
          <h2>5. 개인정보 보호책임자</h2>
          <p>개인정보 보호책임자 연락처:</p>
          <ul>
            <li>이메일: khjgd12@naver.com</li>
            <li>전화: 010-2016-5150</li>
          </ul>
        </section>
      </div>

      <div className="privacy-footer">
        <Link to="/" className="back-button">메인으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default PrivacyPage; 