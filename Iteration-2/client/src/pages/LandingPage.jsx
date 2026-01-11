import React from 'react';
import Button from '../components/landing/button.jsx';
import Background from '../components/generic/Background.jsx';
import { useNavigate } from 'react-router-dom';
import dashboard from "../public/logo.png"


function LandingPage() {
  const navigate = useNavigate();

  return (
    <Background>
      <div className="flex flex-col items-center justify-center h-screen">
        <div
          className="absolute top-0 mt-24 text-6xl font-bold outline-red-500"
          style={{
            color: 'black',
          }}
        >
          CyberStride
        </div>
        <div className="flex space-x-8 mt-20">
          <Button
            text="Reload Data"
            onClick={() => {
              navigate('/upload');
            }}
          />
          <Button
            text="Start New Session"
            onClick={() => {
              navigate('/bluetoothconnect');
            }}
          />
        </div>
        {/* <div className="absolute bottom-0 mb-4 flex justify-center w-full">
          <img
            src={dashboard}
            alt="Bmerit Logo"
            style={{ width: '23%', height: 'auto' }}
          />
        </div> */}
      </div>
    </Background>
  );
}

export default LandingPage;
