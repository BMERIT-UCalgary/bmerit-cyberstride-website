import React from 'react';
import Background from '../components/generic/Background';
import { useNavigate } from 'react-router-dom';
import manWalking from "../public/Walking_man_Image.png"


function SessionStartedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-gray-200 w-[90%] md:w-[70%] min-h-[200px] md:min-h-[200px] rounded-2xl flex flex-col p-5 md:p-5 outline 
            outline-2 outline-gray-400"
      >
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-xl md:text-2xl font-bold">Session started</h1>
          <img
            src={manWalking}
            alt="Walking Man"
            className="w-3 md:w-3 h-auto"
          />
        </div>

        <div className="text-base md:text-lg mb-8">
          Once you're finished the session, press "End session" and the data
          will be recorded from the walker and displayed.
        </div>

        <button
          className="bg-black text-white px-6 py-2 rounded-lg text-sm md:text-base w-fit hover:bg-gray-600 transition-colors mt-auto active:opacity-70"
          onClick={() => {
            navigate('/loading');
          }}
        >
          End Session
        </button>
      </div>
    </div>
  );
}

export default SessionStartedPage;
