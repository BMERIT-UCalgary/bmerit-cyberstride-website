import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Loading messages (last one shown at 99%)
const loadingMessages = [
  "Establishing secure connection...",
  "Authenticating walker device...",
  "Retrieving gait data...",
  "Analyzing motion patterns...",
  "Finalizing session report...",
  "Almost there..."
];

function LoadingScreenPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let progressTimer;
    let navigationTimer;

    const increaseProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress < 90) {
          const nextProgress = prevProgress + Math.floor(Math.random() * 10) + 5; // +5 to +14
          setMessageIndex((prevIndex) =>
            Math.min(prevIndex + 1, loadingMessages.length - 2)
          );
          progressTimer = setTimeout(increaseProgress, Math.random() * 1500 + 800); // 0.8s–2.3s
          return Math.min(nextProgress, 90);
        } else {
          // Lock at 99%, show "Almost there..."
          setProgress(99);
          setMessageIndex(loadingMessages.length - 1);

          // Final jump to 100 and redirect
          setTimeout(() => {
            setProgress(100);
            navigationTimer = setTimeout(() => {
              navigate('/dashboard');
            }, 2000); // Wait 2s on 100%
          }, 2000); // Wait 2s on "Almost there..."
        }
        return prevProgress;
      });
    };

    // Start loading
    progressTimer = setTimeout(increaseProgress, 1000); // Wait 1s to start

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center"
      style={{
        background: 'linear-gradient(to bottom right, #B7F0DF, #A8E2FF)'
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-black">CyberStride</h1>

      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md text-center">
        <div className="mb-6 min-h-[48px]">
          <p className="text-lg font-medium text-gray-700 animate-pulse">
            {loadingMessages[messageIndex]}
          </p>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden mb-2">
          <div
            className="h-4 bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-500 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500">{progress}%</p>
      </div>
    </div>
  );
}

export default LoadingScreenPage;
