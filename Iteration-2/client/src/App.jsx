import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard.jsx';
import GraphView from './pages/GraphView.jsx';
import Upload from './pages/Upload.jsx';
import BluetoothConnect from './pages/BluetoothConnect.jsx';
import SessionStartedPage from './pages/SessionStartedPage.jsx';
import Download from './pages/Download.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ForceCalculationTest from './pages/ForceCalculationTest.jsx';
import StepLengthTest from './pages/StepLengthTest.jsx';
import { DataContext } from './hooks/DataContext.jsx';
import { BluetoothProvider } from './components/BLE/BluetoothContext.jsx';
import SpeedVsTime from './pages/SpeedVsTimeTest.jsx';
import PreProcDashboard from './pages/preprocessingtest2.jsx';
import StepCalculationTest from './pages/StepCalculationTest.jsx';
import ForceCalculationTextTest from './pages/ForceCalculationTextTest.jsx';
import StepCalculationTextTest from './pages/StepCalculationTextTest.jsx';
import LoadingPage from './pages/LoadingPage.jsx';

function App() {
    return (
        <DataContext>
            <BluetoothProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/graphview" element={<GraphView />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/bluetoothconnect" element={<BluetoothConnect />} />
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/sessionstarted" element={<SessionStartedPage />} />
                        <Route path="/download" element={<Download />} />                    
                        <Route path="/SpeedVsTime" element={<SpeedVsTime/>} />
                        <Route path="/PreProcDashboard" element={<PreProcDashboard/>} />
                        <Route path="/step" element={<StepCalculationTest/>} />
                        <Route path="/step-text-test" element={<StepCalculationTextTest/>} />
                        <Route path="/force-text-test" element={<ForceCalculationTextTest/>} />
                        <Route path="/loading" element={<LoadingPage />} />
                    </Routes>
                </Router>
            </BluetoothProvider>
        </DataContext>
    );
}

export default App;