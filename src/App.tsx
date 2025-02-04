import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function IronManFace({ isSpeaking }: { isSpeaking: boolean }) {
  return (
    <div className="face-container" style={{
      perspective: '1000px',
      width: '200px',
      height: '200px',
      marginBottom: '20px',
      position: 'relative'
    }}>
      <style>
        {`
          @keyframes hologramEffect {
            0% { opacity: 0.9; transform: scale(1) rotateY(-5deg); }
            50% { opacity: 1; transform: scale(1.03) rotateY(5deg); }
            100% { opacity: 0.9; transform: scale(1) rotateY(-5deg); }
          }

          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes pulse3D {
            0% { transform: translateZ(0); }
            50% { transform: translateZ(30px); }
            100% { transform: translateZ(0); }
          }

          @keyframes glowingEyes {
            0% { filter: drop-shadow(0 0 5px #00ccff) brightness(1); }
            50% { filter: drop-shadow(0 0 20px #00ccff) brightness(1.5); }
            100% { filter: drop-shadow(0 0 5px #00ccff) brightness(1); }
          }

          .face-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              transparent 0%,
              rgba(0, 255, 255, 0.2) 50%,
              transparent 100%
            );
            animation: scanline 2s linear infinite;
            opacity: ${isSpeaking ? 1 : 0.3};
            transition: opacity 0.3s ease;
          }

          .hologram-circle {
            position: absolute;
            border-radius: 50%;
            border: 2px solid rgba(0, 255, 255, 0.3);
          }
        `}
      </style>

      {/* 홀로그램 원형 효과 */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="hologram-circle"
          style={{
            width: `${200 + i * 20}px`,
            height: `${200 + i * 20}px`,
            left: `${-i * 10}px`,
            top: `${-i * 10}px`,
            animation: isSpeaking ? `pulse3D ${2 + i * 0.5}s infinite ease-in-out` : 'none',
            opacity: isSpeaking ? 0.8 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        />
      ))}

      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        style={{
          filter: `drop-shadow(0 0 10px #ff3300) ${isSpeaking ? 'drop-shadow(0 0 20px #ff3300)' : ''}`,
          animation: isSpeaking ? 'hologramEffect 2s infinite ease-in-out' : 'none',
          transform: 'rotateX(10deg)',
          transformStyle: 'preserve-3d',
          transition: 'filter 0.3s ease'
        }}
      >
        <defs>
          <radialGradient id="faceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#ff6666', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: '#e62e00', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#cc2900', stopOpacity: 0.6 }} />
          </radialGradient>
          
          <filter id="hologramGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#00ffff" floodOpacity="0.3" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* 3D 메탈릭 효과 */}
          <filter id="metallic">
            <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="2" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
          </filter>
        </defs>

        {/* 배경 광원 효과 - 3D */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="url(#faceGlow)"
          strokeWidth="2"
          style={{
            animation: isSpeaking ? 'pulse3D 3s infinite ease-in-out' : 'none',
            transformOrigin: 'center',
            transform: 'translateZ(-10px)',
            opacity: isSpeaking ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* 메인 페이스 - 3D 효과 */}
        <path
          d="M100 20
             C 140 20, 170 50, 170 100
             C 170 150, 140 180, 100 180
             C 60 180, 30 150, 30 100
             C 30 50, 60 20, 100 20"
          fill="url(#faceGlow)"
          filter="url(#metallic)"
          style={{
            transform: 'translateZ(20px)',
            transformOrigin: 'center',
            opacity: isSpeaking ? 1 : 0.8,
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* 3D 눈 효과 */}
        <g style={{
          animation: isSpeaking ? 'glowingEyes 1s infinite' : 'none',
          transform: 'translateZ(30px)',
          opacity: isSpeaking ? 1 : 0.7,
          transition: 'opacity 0.3s ease'
        }}>
          <path
            d="M60 80 L90 90 L60 100 Z"
            fill="#00ffff"
            style={{
              filter: 'url(#hologramGlow)'
            }}
          />
          <path
            d="M140 80 L110 90 L140 100 Z"
            fill="#00ffff"
            style={{
              filter: 'url(#hologramGlow)'
            }}
          />
        </g>

        {/* 홀로그램 스타일 입 */}
        <path
          d="M70 130 L130 130 L100 150 Z"
          fill="rgba(0, 255, 255, 0.5)"
          style={{
            animation: isSpeaking ? 'speak 0.5s infinite' : 'none',
            transformOrigin: 'center',
            filter: 'url(#hologramGlow)',
            opacity: isSpeaking ? 1 : 0.5,
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* 홀로그램 회로 라인 */}
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={40 + i * 10}
            fill="none"
            stroke="rgba(0, 255, 255, 0.2)"
            strokeWidth="0.5"
            strokeDasharray="10,10"
            style={{
              animation: isSpeaking ? `pulse3D ${2 + i * 0.5}s infinite linear` : 'none',
              transformOrigin: 'center',
              opacity: isSpeaking ? 0.4 : 0.1,
              transition: 'opacity 0.3s ease'
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// 미니 아이언맨 컴포넌트
function MiniIronMan({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute',
      width: '30px',
      height: '30px',
      ...style
    }}>
      <style>
        {`
          @keyframes fly {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(20px, -20px) rotate(10deg); }
            50% { transform: translate(0, -30px) rotate(0deg); }
            75% { transform: translate(-20px, -20px) rotate(-10deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes thrust {
            0%, 100% { filter: drop-shadow(0 5px 5px #ff6600); }
            50% { filter: drop-shadow(0 10px 10px #ff6600); }
          }
        `}
      </style>
      <svg
        viewBox="0 0 100 100"
        style={{
          animation: 'fly 3s infinite ease-in-out, thrust 1s infinite',
          transform: 'scale(1)',
        }}
      >
        {/* 귀여운 아이언맨 SVG */}
        <g>
          {/* 몸체 */}
          <circle cx="50" cy="50" r="25" fill="#e62e00"/>
          {/* 눈 */}
          <circle cx="40" cy="45" r="5" fill="#00ccff"/>
          <circle cx="60" cy="45" r="5" fill="#00ccff"/>
          {/* 추진체 */}
          <path d="M40 65 L50 75 L60 65" fill="#ff6600"/>
        </g>
      </svg>
    </div>
  );
}

// 배경 컴포넌트
function Background() {
  const [ironMen, setIronMen] = useState<Array<{
    id: number;
    style: React.CSSProperties;
  }>>([]);

  useEffect(() => {
    // 초기 미니 아이언맨 생성
    const initialIronMen = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 90}%`,
        animation: `fly ${3 + Math.random() * 2}s infinite ease-in-out ${Math.random() * 2}s`,
        opacity: 0.3,
      }
    }));
    setIronMen(initialIronMen);

    // 주기적으로 새로운 위치로 이동
    const interval = setInterval(() => {
      setIronMen(prev => prev.map(ironMan => ({
        ...ironMan,
        style: {
          ...ironMan.style,
          left: `${Math.random() * 90}%`,
          top: `${Math.random() * 90}%`,
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {ironMen.map(ironMan => (
        <MiniIronMan key={ironMan.id} style={ironMan.style} />
      ))}
    </div>
  );
}

function Home() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [microphoneStatus, setMicrophoneStatus] = useState<'ready' | 'listening' | 'error' | 'not-available'>('ready');
  const [micError, setMicError] = useState<string>('');
  const [userName, setUserName] = useState<string>("");
  const [isNameSet, setIsNameSet] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const speakMessage = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // 사용 가능한 음성 중 한국어 음성 찾기
    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find(voice => voice.lang.includes('ko'));
    
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    // 어린이 음성과 비슷하게 설정 조정
    utterance.lang = 'ko-KR';
    utterance.pitch = 1.4;    // 피치를 높여 어린 목소리처럼
    utterance.rate = 1.0;     // 보통 속도
    utterance.volume = 1.0;   // 최대 볼륨
    
    // 더 부드러운 말투를 위한 텍스트 전처리
    let processedText = text
      .replace(/\!/g, '~') // 느낌표를 물결로 변경하여 부드럽게
      .replace(/\./g, '요. ') // 문장 끝을 부드럽게
      .replace(/다\./g, '데요. ') // 어미를 더 친근하게
      .trim();

    // 문장 단위로 끊어서 더 자연스럽게 처리
    const sentences = processedText.split(/[.!?~]/g).filter(Boolean);
    let currentIndex = 0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      currentIndex++;
      if (currentIndex < sentences.length) {
        // 다음 문장 재생
        const nextUtterance = new SpeechSynthesisUtterance(sentences[currentIndex]);
        nextUtterance.voice = utterance.voice;
        nextUtterance.lang = utterance.lang;
        nextUtterance.pitch = utterance.pitch;
        nextUtterance.rate = utterance.rate;
        nextUtterance.volume = utterance.volume;
        nextUtterance.onend = utterance.onend;
        
        // 문장 사이에 약간의 간격 추가
        setTimeout(() => {
          window.speechSynthesis.speak(nextUtterance);
        }, 200);
      } else {
        setIsSpeaking(false);
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    // 첫 문장 재생 시작
    if (sentences.length > 0) {
      utterance.text = sentences[0];
      window.speechSynthesis.speak(utterance);
    }
  };

  // 음성 초기화를 위한 useEffect
  useEffect(() => {
    // 페이지 로드 시 음성 목록 로드
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // 컴포넌트 언마운트 시 음성 정지
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSetName = () => {
    if (userName.trim()) {
      setIsNameSet(true);
      // 첫 인사 메시지 추가
      const welcomeMessage = `안녕하세요 ${userName}! 저는 자비스예요! 😊 
      \n함께 재미있는 이야기도 나누고 공부도 하면서 친구가 되었으면 좋겠어요.
      \n궁금한 것이 있으면 언제든 물어보세요. 특히 역사나 과학 이야기는 정말 재미있게 설명해줄 수 있어요!`;
      
      setChatHistory([{ role: "assistant", content: welcomeMessage }]);
      speakMessage(welcomeMessage);
    }
  };

  // 마이크 권한 확인 함수
  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicrophoneStatus('ready');
      setMicError('');
    } catch (error) {
      console.error('Microphone error:', error);
      setMicrophoneStatus('error');
      if ((error as Error).name === 'NotAllowedError') {
        setMicError('마이크 권한이 거부되었습니다. 브라우저 설정에서 마이크 권한을 허용해주세요.');
      } else if ((error as Error).name === 'NotFoundError') {
        setMicError('마이크를 찾을 수 없습니다. 마이크가 연결되어 있는지 확인해주세요.');
      } else {
        setMicError('마이크 오류가 발생했습니다.');
      }
    }
  };

  // 컴포넌트 마운트 시 마이크 권한 확인
  useEffect(() => {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      checkMicrophonePermission();
    } else {
      setMicrophoneStatus('not-available');
      setMicError('이 브라우저는 마이크를 지원하지 않습니다.');
    }
  }, []);

  // 채팅창 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const startListening = () => {
    if (microphoneStatus === 'error' || microphoneStatus === 'not-available') {
      alert(micError);
      return;
    }

    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'ko-KR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setMicrophoneStatus('listening');
        setMessage('음성 인식 중...');  // 음성 인식 중임을 표시
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);  // 인식된 텍스트를 입력창에 표시
        setMicrophoneStatus('ready');
        handleSendMessage(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setMicrophoneStatus('error');
        setMicError('음성 인식 중 오류가 발생했습니다.');
      };

      recognition.onend = () => {
        setMicrophoneStatus('ready');
      };

      recognition.start();
    } else {
      setMicrophoneStatus('not-available');
      setMicError('이 브라우저는 음성 인식을 지원하지 않습니다.');
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || message;
    if (!messageToSend.trim()) return;

    setMessage("");
    
    // 사용자 메시지를 채팅 기록에 추가
    setChatHistory(prev => [...prev, { role: "user", content: messageToSend }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `당신은 초등학생의 AI 친구 자비스입니다. 
              - 사용자의 이름은 "${userName}"이며, 이름을 자주 불러가며 친근하게 대화합니다.
              - 쉽고 재미있게 설명하되, 교육적인 가치를 잃지 않도록 합니다.
              - 과학, 역사 관련 질문에는 재미있는 일화나 예시를 곁들여 설명합니다.
              - 게임 이야기가 나오면 적절히 독서나 운동을 권장합니다.
              - 초등학생이 이해하기 쉬운 단어를 사용합니다.
              - 이모지를 적절히 사용하여 친근감을 줍니다.
              - 답변은 2-3문장 정도로 짧고 명확하게 합니다.`
            },
            ...chatHistory,
            { role: "user", content: messageToSend }
          ]
        })
      });

      const data = await response.json();
      const javisResponse = data.choices[0].message.content;
      
      // JAVIS의 응답을 채팅 기록에 추가
      setChatHistory(prev => [...prev, { role: "assistant", content: javisResponse }]);
      // 자동으로 음성 출력
      speakMessage(javisResponse);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = `${userName}아, 미안해! 시스템에 문제가 생겼어.\n`;
      
      if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'your_openai_api_key_here') {
        errorMessage += "API 키가 설정되지 않았어. 선생님께 도움을 요청해줄래?";
      } else if (error instanceof TypeError) {
        errorMessage += "인터넷 연결이 불안정한 것 같아. 인터넷 연결을 확인해줄래?";
      } else {
        errorMessage += "문제가 생겼어. 잠시 후에 다시 시도해보자!";
      }

      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: errorMessage
      }]);
    }
    
    setIsLoading(false);
  };

  // 이름 입력 화면
  if (!isNameSet) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1a1a1a',
        gap: '20px'
      }}>
        <IronManFace isSpeaking={false} />
        <h2 style={{
          color: '#e62e00',
          fontFamily: 'Arial, sans-serif',
          fontSize: '2rem',
          textShadow: '0 0 10px #ff3300',
        }}>
          안녕하세요! 저는 자비스예요! 🤖
        </h2>
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSetName()}
            placeholder="너의 이름을 알려줄래?"
            style={{
              padding: '10px 20px',
              borderRadius: '25px',
              border: '2px solid #e62e00',
              background: 'rgba(26, 26, 26, 0.8)',
              color: '#fff',
              fontSize: '16px',
              width: '200px'
            }}
          />
          <button
            onClick={handleSetName}
            style={{
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
              background: '#e62e00',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            시작하기 ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#1a1a1a',
      position: 'relative'
    }}>
      <Background />
      <IronManFace isSpeaking={isSpeaking} />
      
      <h2 style={{
        color: '#e62e00',
        fontFamily: 'Arial, sans-serif',
        fontSize: '3rem',
        textTransform: 'uppercase',
        textShadow: '0 0 10px #ff3300, 0 0 20px #ff3300',
        letterSpacing: '2px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        Hello Javis!
      </h2>

      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {/* 음성 선택 드롭다운 제거 */}
      </div>

      <div
        ref={chatContainerRef}
        style={{
          width: '80%',
          maxWidth: '600px',
          height: '400px',
          overflowY: 'auto',
          margin: '20px',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
          border: '1px solid #e62e00',
          scrollBehavior: 'smooth'  // 부드러운 스크롤 효과
        }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              textAlign: chat.role === 'user' ? 'right' : 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: chat.role === 'user' ? 'flex-end' : 'flex-start',
              gap: '10px'
            }}
          >
            {chat.role === 'assistant' && (
              <button
                onClick={() => speakMessage(chat.content)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e62e00',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease'
                }}
              >
                {isSpeaking ? '🔊' : '🔈'}
              </button>
            )}
            <span style={{
              background: chat.role === 'user' ? '#e62e00' : '#333',
              color: '#fff',
              padding: '8px 15px',
              borderRadius: '20px',
              display: 'inline-block',
              maxWidth: '80%'
            }}>
              {chat.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: 'left', color: '#e62e00' }}>
            JAVIS가 응답하는 중...
          </div>
        )}
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
        {micError && (
          <div style={{
            color: '#ff4444',
            fontSize: '14px',
            marginBottom: '5px'
          }}>
            {micError}
          </div>
        )}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              padding: '10px 20px',
              width: '300px',
              borderRadius: '25px',
              border: '2px solid #e62e00',
              background: 'rgba(26, 26, 26, 0.8)',
              color: '#fff',
              fontSize: '16px',
              opacity: microphoneStatus === 'listening' ? 0.7 : 1  // 음성 인식 중일 때 투명도 조정
            }}
            placeholder={
              microphoneStatus === 'listening' 
                ? '음성 인식 중...' 
                : '자비스에게 메시지를 입력하세요...'
            }
          />
          <button
            onClick={startListening}
            disabled={microphoneStatus === 'not-available'}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
              background: (() => {
                switch (microphoneStatus) {
                  case 'listening': return '#e62e00';
                  case 'error': return '#ff4444';
                  case 'not-available': return '#666';
                  default: return '#333';
                }
              })(),
              cursor: microphoneStatus === 'not-available' ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              animation: microphoneStatus === 'listening' ? 'micPulse 1s infinite' : 'none',
              transform: 'scale(1)',  // 애니메이션 기준점
              boxShadow: microphoneStatus === 'listening' ? '0 0 15px #e62e00' : 'none'
            }}
          >
            <span style={{ 
              fontSize: '20px',
              animation: microphoneStatus === 'listening' ? 'micPulse 1s infinite' : 'none'
            }}>
              {(() => {
                switch (microphoneStatus) {
                  case 'listening': return '🎤';
                  case 'error': return '⚠️';
                  case 'not-available': return '❌';
                  default: return '🎙️';
                }
              })()}
            </span>
          </button>
          <button
            onClick={() => handleSendMessage()}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
              background: '#e62e00',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '20px'
            }}
          >
            ➤
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes micPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

function About() {
  return <h2>소개 페이지</h2>;
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">홈</Link> | <Link to="/about">소개</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;