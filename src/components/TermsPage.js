import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/PricingPage.css';
import '../styles/components/Legal.css';

const TermsPage = () => {
  return (
    <div className="terms-page">
      <div className="terms-header">
        <h1>이용약관</h1>
        <p>AI 강아지 감정 분석 서비스 이용약관입니다.</p>
      </div>

      <div className="terms-content">
        <section>
          <h2>제1조 (목적)</h2>
          <p>이 약관은 AI 강아지 감정 분석 서비스(이하 "회사")가 제공하는 서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        </section>

        <section>
          <h2>제2조 (용어의 정의)</h2>
          <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
          <ul>
            <li>"서비스"란 회사가 제공하는 AI 기반의 강아지 감정 분석 서비스를 의미합니다.</li>
            <li>"회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.</li>
            <li>"구독"이란 서비스를 지속적으로 이용하기 위해 정기적으로 비용을 지불하는 것을 의미합니다.</li>
          </ul>
        </section>

        <section>
          <h2>제3조 (서비스의 제공)</h2>
          <p>회사는 다음과 같은 서비스를 제공합니다:</p>
          <ul>
            <li>AI 기반 강아지 감정 분석</li>
            <li>분석 결과 저장 및 관리</li>
            <li>기타 관련 부가 서비스</li>
          </ul>
        </section>

        <section>
          <h2>제4조 (구독 및 결제)</h2>
          <p>구독 서비스 이용에 관한 사항:</p>
          <ul>
            <li>구독은 월 단위로 진행됩니다.</li>
            <li>구독료는 월 1,000원입니다.</li>
            <li>결제는 선택하신 결제 수단으로 자동 청구됩니다.</li>
            <li>구독 해지는 언제든 가능하며, 남은 기간은 이용하실 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2>제5조 (환불 정책)</h2>
          <p>환불에 관한 사항:</p>
          <ul>
            <li>서비스 이용 전 취소 시 전액 환불</li>
            <li>서비스 이용 후에는 이용 일수를 제외한 금액 환불</li>
            <li>환불은 영업일 기준 3-5일 소요될 수 있습니다.</li>
          </ul>
        </section>
      </div>

      <div className="terms-footer">
        <Link to="/" className="back-button">메인으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default TermsPage; 