import React, { useEffect, useState } from 'react';

const LoginButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // 페이지 로드 시 로그인 상태 확인
        const token = localStorage.getItem('googleToken');
        const userInfo = localStorage.getItem('userInfo');
        
        if (token && userInfo) {
            const user = JSON.parse(userInfo);
            setIsLoggedIn(true);
            setUserName(user.name);
            return; // 이미 로그인된 경우 Google Sign-In 초기화 건너뛰기
        }

        // 기존 구글 버튼 제거
        const existingButton = document.querySelector('.g_id_signin');
        if (existingButton) {
            existingButton.remove();
        }

        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleSignIn;
            document.body.appendChild(script);
        };

        loadGoogleScript();
    }, []);

    const initializeGoogleSignIn = () => {
        if (window.google && !isLoggedIn) {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
                itp_support: true // Cross-Origin 이슈 해결을 위한 옵션
            });

            window.google.accounts.id.renderButton(
                document.getElementById("my-signin-button"),
                { 
                    type: 'standard',
                    theme: 'outline', 
                    size: 'large',
                    text: 'signin_with',
                    width: 250,
                    locale: 'ko_KR'
                }
            );
        }
    };

    const handleCredentialResponse = async (response) => {
        try {
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const decodedToken = JSON.parse(jsonPayload);
            
            // 사용자 정보 저장
            setIsLoggedIn(true);
            setUserName(decodedToken.name);
            
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('googleToken', response.credential);
            localStorage.setItem('userInfo', JSON.stringify({
                name: decodedToken.name,
                email: decodedToken.email,
                picture: decodedToken.picture
            }));

            // 구글 로그인 버튼 즉시 제거
            const buttonDiv = document.getElementById("my-signin-button");
            if (buttonDiv) {
                buttonDiv.innerHTML = '';
            }

            // 기존 구글 버튼도 제거
            const existingButton = document.querySelector('.g_id_signin');
            if (existingButton) {
                existingButton.remove();
            }

            // Google Sign-In 상태 초기화
            if (window.google?.accounts?.id) {
                window.google.accounts.id.disableAutoSelect();
            }

        } catch (error) {
            console.error("Login process failed:", error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('googleToken');
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserName('');
        
        if (window.google?.accounts?.id) {
            window.google.accounts.id.disableAutoSelect();
        }
        
        // 페이지 새로고침하여 로그인 버튼 다시 초기화
        window.location.reload();
    };

    return (
        <div className="login-section">
            {isLoggedIn ? (
                <div className="user-info">
                    <span className="welcome-message">
                        안녕하세요, {userName}님! 👋
                    </span>
                    <button 
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        로그아웃
                    </button>
                </div>
            ) : (
                <div id="my-signin-button"></div>
            )}
        </div>
    );
};

export default LoginButton; 