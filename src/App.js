import React, { useState, useEffect } from 'react';
import './App.css';
import PaymentModal from './components/PaymentModal';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PricingPage from './components/PricingPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';

// 파일 업로드 컴포넌트
const FileUpload = ({ isLoading, onFileSelect, setError }) => {
  const fileInputRef = React.useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onFileSelect({ target: { files: [files[0]] } });
    } else {
      setError('이미지 파일만 업로드 가능합니다.');
    }
  };

  return (
    <div 
      className={`upload-section ${isDragOver ? 'drag-over' : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 11L12 8L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileSelect}
        disabled={isLoading}
        style={{ display: 'none' }}
      />
      <p className="main-text">
        강아지 사진 업로드
      </p>
      <p className="sub-text">
        {isDragOver ? '여기에 놓아주세요!' : '클릭하거나 드래그하여 업로드하세요'}
      </p>
    </div>
  );
};

// 로딩 컴포넌트
const LoadingCard = () => (
  <div className="loading-card">
    <div className="loading-content">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        <h3>강아지의 표정을 분석하고 있습니다</h3>
        <p>잠시만 기다려주세요...</p>
      </div>
      <div className="loading-steps">
        <div className="step completed">
          <span className="step-number">1</span>
          <span className="step-text">이미지 업로드 완료</span>
        </div>
        <div className="step active">
          <span className="step-number">2</span>
          <span className="step-text">AI 감정 분석중</span>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <span className="step-text">결과 생성</span>
        </div>
      </div>
    </div>
  </div>
);

// 이미지 프리뷰 컴포넌트
const ImagePreview = ({ image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const url = URL.createObjectURL(image);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  return (
    <div className="image-preview-wrapper">
      <div className="image-preview-container">
        <div className="image-preview-header">
          <h3>선택된 이미지</h3>
        </div>
        <div className="image-preview-content">
          <img src={imageUrl} alt="선택된 강아지" />
        </div>
      </div>
    </div>
  );
};

// 메인 컴포넌트
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainContent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emotionInfo, setEmotionInfo] = useState(null);
  const [useCount, setUseCount] = useState(() => {
    return parseInt(localStorage.getItem('useCount') || '0');
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  // 사용 횟수 추적 함수
  const incrementUseCount = () => {
    const newCount = useCount + 1;
    setUseCount(newCount);
    localStorage.setItem('useCount', newCount.toString());
    
    // 3번째 사용 후 결제 모달 표시
    if (newCount >= 3) {
      setShowPaymentModal(true);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      incrementUseCount(); // 사용 횟수 증가
      setEmotionInfo(null);
      setSelectedImage(file);
      setError(null);
      analyzeDog(file);
    }
  };

  const parseEmotionInfo = (text) => {
    try {
      const emotionData = {
        emotion: "알 수 없음",
        confidence: 90,
        status: "정보를 찾을 수 없니다",
        behaviors: [],
        recommendations: []
      };

      const lines = text.split('\n');

      const emotionKeywords = {
        행복: ['행복', '기쁨', '즐거움', '신남', '좋아함', '반가움', '활기찬'],
        슬픔: ['슬픔', '우울', '서러움', '외로움', '쓸쓸함'],
        화남: ['화남', '분노', '짜증', '불만', '싫음'],
        불안: ['불안', '걱정', '긴장', '두려움', '겁먹음'],
        졸림: ['졸림', '피곤', '나른함', '지침']
      };

      lines.forEach(line => {
        line = line.trim().toLowerCase();
        
        if (line.includes('감정:')) {
          const emotionText = line.split(':')[1].trim();
          
          for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
            if (keywords.some(keyword => emotionText.includes(keyword))) {
              emotionData.emotion = emotion;
              emotionData.confidence = Math.floor(Math.random() * (99 - 90 + 1)) + 90;
              break;
            }
          }
        }
        
        if (line.includes('상태:') || line.includes('전반적인 상태:')) {
          emotionData.status = line.split(':')[1].trim();
        }
        
        if (line.includes('- ')) {
          const behavior = line.replace('- ', '').trim();
          if (behavior) {
            emotionData.behaviors.push(behavior);
          }
        }
      });

      return emotionData;
    } catch (error) {
      console.error('Parsing error:', error);
      throw new Error('감정 정보 파싱 중 오류가 발생했습니다.');
    }
  };

  const analyzeDog = async (file) => {
    if (!API_KEY) {
      setError('API 키가 설정되지 않았습니다');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEmotionInfo(null);

    try {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('파일 크기는 5MB 이하여야 합니다.');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('이미지 파일만 업로드 가능합니다.');
      }

      const reader = new FileReader();
      
      reader.onerror = () => {
        setError('파일 읽기 중 오류가 발생했습니다.');
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
      
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result.split(',')[1];
          
          const requestBody = {
            contents: [{
              parts: [
                {
                  text: `이 강아지의 감정과 상태를 분석해주세요. 다음 형식으로 답변해주세요:
감정:
감정 확신도:
전반적인 상태:
행동 특징:
- 특징1
- 특징2
권장 대응:
- 권장사항1
- 권장사항2`
                },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Image
                  }
                }
              ]
            }]
          };

          console.log('API 요청 시작...');
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody)
            }
          );

          if (!response.ok) {
            throw new Error(`서버 오류: ${response.status}`);
          }

          const data = await response.json();
          console.log('API 응답:', data);
          
          if (data.candidates?.[0]?.content) {
            const text = data.candidates[0].content.parts[0].text;
            console.log('분석 텍스트:', text);
            
            const emotionData = parseEmotionInfo(text);
            setEmotionInfo(emotionData);
          } else {
            throw new Error('API 응답 식이 올바르지 않습니다.');
          }
          
        } catch (error) {
          console.error('Error:', error);
          setError(`이미지 분석 중 오류가 발생했습니다: ${error.message}`);
          setEmotionInfo(null);
        } finally {
          setIsLoading(false);
        }
      };
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || '이미지 처리 중 오류가 발생했습니다.');
      setEmotionInfo(null);
      setIsLoading(false);
    }
  };

  const EmotionCard = ({ emotion, confidence, status, behaviors, recommendations }) => {
    const getFunnyComment = (emotion) => {
      const comments = {
        행복: [
          "꼬리 흔들기 신공 LV.999 달성! 🌟",
          "행복 지수가 강아지간식 냄새 맡은 수준입니다 🦴",
          "이 강아지님, 복권 당첨되셨나요? 😆",
          "꼬리로 발전소 돌릴 수 있는 수준의 기쁨입니다 ⚡️",
          "방금 우주 최고의 산책을 다녀온 표정이에요 🌈"
        ],
        슬픔: [
          "간식이 필요한 긴급상황입니다! 🆘",
          "주인님의 신용카드가 필요한 순간입니다 💳",
          "강아지 우울증 치료법: 1. 식 2. 산책 3. 더 많은 간식 🎯",
          "'내 장난감이 어디갔지?' 하고 고민중인 것 같아요 🧸",
          "방금 목욕했다는 슬픈 표정이군요 🛁"
        ],
        화남: [
          "누가 우리 강아지 간식을 훔쳤나요? 🕵️‍♂️",
          "강아지 분노조절 린지 진행중... 🌋",
          "우리 강아지 지금 '개'빡났습니다 😤",
          "다이어트 시작한 날의 표정이네요 🥗",
          "옆집 강아지가 자기 영역을 침범했나 봅니다 🚫"
        ],
        불안: [
          "주인님 신발 씹기 모드 활성화까지 3,2,1... 👟",
          "분리불안: 주인이 화장실만 가도 난리날 예정 🚽",
          "강아지 마음의 소리: 내가 왜 여기있지? 🤔",
          "병원 가는 길이라는 걸 눈치챈 것 같아요 🏥",
          "'저기 저 진공청소기 좀 치워주세요' 라고 하고 싶은 표정 🧹"
        ],
        졸림: [
          "강아지 배터리 잔량 3% 남았습니다 🔋",
          "산책 가고 싶지만 침대가 더 좋은 순간 💤",
          "꿈에서는 모든 간식이 제 것이겠죠? 😴",
          "소파가 너무 편한 나머지 영영 일어나지 못할 것 같아요 🛋",
          "산 5분 만에 집에 가고 싶어하는 상태니다 🏃‍♂️"
        ]
      };

      if (comments[emotion]) {
        const randomIndex = Math.floor(Math.random() * comments[emotion].length);
        return comments[emotion][randomIndex];
      }

      const defaultComments = [
        "강아지님이 오늘따라 수께끼 같은 표정을 짓고 계시네요 🤔",
        "강아지의 마음을 해석하기 위해 AI가 온 힘을 다했다멍! 🔍",
        "복잡미묘한 감정을 품고 계신 것 같아요 🌟"
      ];
      return defaultComments[Math.floor(Math.random() * defaultComments.length)];
    };

    return (
      <div className="card">
        <h2>🐕 감정 분석 결과</h2>
        <div className="emotion-result">
          <h3>주요 감정: {emotion}</h3>
          <div className="confidence-bar">
            <div 
              className="confidence-level" 
              style={{width: `${confidence}%`}}
            ></div>
          </div>
          <p className="confidence-text">확신도: {confidence}%</p>
        </div>
        
        <div className="funny-comment-section">
          <p className="funny-comment">
            {getFunnyComment(emotion)}
          </p>
        </div>

        <div className="status-section">
          <h4>전반적 상태</h4>
          <p>{status}</p>
        </div>

        {behaviors.length > 0 && (
          <div className="behaviors-section">
            <h4>행동 특징</h4>
            <ul>
              {behaviors.map((behavior, index) => (
                <li key={index}>🔍 {behavior}</li>
              ))}
            </ul>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h4>권장 대응</h4>
            <ul>
              {recommendations.map((recommendation, index) => (
                <li key={index}>💡 {recommendation}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Puppy AI Emotion Analyzer</h1>
      
      <FileUpload
        isLoading={isLoading}
        onFileSelect={handleImageUpload}
        setError={setError}
      />

      {selectedImage && <ImagePreview image={selectedImage} />}
      
      {isLoading && <LoadingCard />}
      
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      
      {emotionInfo && !error && <EmotionCard {...emotionInfo} />}

      {showPaymentModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowPaymentModal(false)}></div>
          <PaymentModal onClose={() => setShowPaymentModal(false)} />
        </>
      )}

      
      <nav className="footer-links">
        <Link to="/pricing" className="footer-link">구독 정책</Link>
        <Link to="/terms" className="footer-link">이용약관</Link>
        <Link to="/privacy" className="footer-link">개인정보처리방침</Link>
      </nav>
    </div>
  );
}

export default App;
