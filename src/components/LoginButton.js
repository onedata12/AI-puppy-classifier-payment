function LoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <button onClick={handleGoogleLogin}>
      Google로 로그인
    </button>
  );
}

export default LoginButton; 