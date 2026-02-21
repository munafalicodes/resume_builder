import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, Upload, Sparkles, Star, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                CareerForge Pro
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
                            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
                            <Link to="/app" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200 rounded-full blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
                            🚀 The #1 AI-Powered Resume Builder
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            Build Your
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"> Dream Career</span>
                            <br /> in Minutes, Not Hours.
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Create professional, ATS-optimized resumes with AI-powered suggestions.
                            Upload your existing resume and let our intelligent engine handle the rest.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/app" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1">
                                Create My Resume <ArrowRight size={20} />
                            </Link>
                            <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all hover:border-gray-300">
                                View Examples
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Image / Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-20 relative mx-auto max-w-5xl"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden p-3 md:p-4 rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
                            <div className="bg-gray-50 rounded-xl overflow-hidden aspect-video flex items-center justify-center border border-gray-100">
                                {/* Simulated UI representation */}
                                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center">
                                    <div className="w-3/4 h-3/4 bg-white shadow-lg rounded-lg p-6 border border-gray-100">
                                        <div className="w-1/3 h-4 bg-gray-200 rounded mb-4"></div>
                                        <div className="w-full h-2 bg-gray-100 rounded mb-2"></div>
                                        <div className="w-full h-2 bg-gray-100 rounded mb-2"></div>
                                        <div className="w-2/3 h-2 bg-gray-100 rounded mb-6"></div>
                                        <div className="flex gap-4">
                                            <div className="w-1/2 h-20 bg-blue-50 rounded border border-blue-100"></div>
                                            <div className="w-1/2 h-20 bg-gray-50 rounded border border-gray-100"></div>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-400 font-medium">Interactive Builder Preview</p>
                                </div>
                            </div>
                        </div>
                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle size={24} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">ATS Score</p>
                                    <p className="text-xl font-bold text-gray-900">92%</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Sparkles size={24} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">AI Suggestions</p>
                                    <p className="text-sm font-bold text-gray-900">Optimized!</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose CareerForge?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Everything you need to land your next job, powered by advanced AI.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <FeatureCard
                            delay={0.2}
                            icon={<Sparkles className="text-blue-600" size={32} />}
                            title="AI-Powered Rewriting"
                            description="Instantly improve your bullet points with AI suggestions tailored to the job description."
                        />
                        <FeatureCard
                            delay={0.4}
                            icon={<Upload className="text-indigo-600" size={32} />}
                            title="Resume Import"
                            description="Upload your existing PDF or DOCX resume and we'll parse it into our builder automatically."
                        />
                        <FeatureCard
                            delay={0.6}
                            icon={<Shield className="text-green-600" size={32} />}
                            title="ATS-Friendly Templates"
                            description="Professional templates designed to pass Applicant Tracking Systems with ease."
                        />
                        <FeatureCard
                            delay={0.8}
                            icon={<Zap className="text-yellow-500" size={32} />}
                            title="Instant Feedback"
                            description="Get real-time scoring and feedback as you build your resume."
                        />
                        <FeatureCard
                            delay={1.0}
                            icon={<FileText className="text-gray-600" size={32} />}
                            title="PDF Export"
                            description="Download your resume in a clean, professional PDF format ready for applications."
                        />
                        <FeatureCard
                            delay={1.2}
                            icon={<Star className="text-purple-600" size={32} />}
                            title="Cover Letter AI"
                            description="Generate a matching cover letter for your resume in seconds."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
        className="p-8 bg-white rounded-3xl hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-100"
    >
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

export default LandingPage;
