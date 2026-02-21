import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Dashboard from './components/Dashboard';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import LandingPage from './components/LandingPage';
import './index.css';

const Layout = ({ children }) => (
  <div className="app-container font-sans text-gray-900">
    {/* We can move the header here if we want it on all app pages but not landing, or make it conditional */}
    <header className="app-header bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link to="/app" className="text-2xl font-bold text-white no-underline"><h1>CareerForge Pro</h1></Link>
        <nav className="flex gap-4">
          <Link to="/dashboard" className="text-gray-300 hover:text-white no-underline transition-colors">Dashboard</Link>
          <Link to="/cover-letter" className="text-gray-300 hover:text-white no-underline transition-colors">Cover Letter</Link>
        </nav>
      </div>
      <button
        onClick={async () => {
          try {
            const response = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
              method: 'POST'
            });
            const { id } = await response.json();
            const stripe = window.Stripe(import.meta.env.VITE_STRIPE_KEY || 'pk_test_placeholder');
            if (stripe) {
              const { error } = await stripe.redirectToCheckout({ sessionId: id });
              if (error) console.error(error);
            } else {
              alert("Stripe Pk Key missing. Session ID: " + id);
            }
          } catch (e) {
            console.error("Payment error:", e);
          }
        }}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-bold transition-colors"
      >
        Upgrade to Pro 🚀
      </button>
    </header>
    {children}
  </div>
);

function App() {
  return (
    <Router>


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={
          <Layout>
            <main className="builder-main flex flex-1 overflow-hidden h-screen">
              <div className="editor-pane flex-1 p-8 overflow-y-auto border-r border-gray-200 bg-white">
                <ResumeForm />
              </div>
              <div className="preview-pane flex-1 bg-gray-700 p-8 overflow-y-auto flex justify-center">
                <div className="preview-wrapper bg-white shadow-2xl p-10 min-h-[297mm] w-[210mm]">
                  <ResumePreview />
                </div>
              </div>
            </main>
          </Layout>
        } />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/cover-letter" element={<Layout><CoverLetterGenerator /></Layout>} />
      </Routes>

    </Router>
  );
}

export default App;
