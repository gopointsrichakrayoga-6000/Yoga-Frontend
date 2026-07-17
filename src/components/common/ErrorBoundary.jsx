import React from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // In production, send error details to logging service (e.g., Sentry / Datadog / Server Log)
    console.error("Sanctuary ErrorBoundary caught unexpected crash:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFCFB] text-royal-950 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white border border-terracotta-500/30 rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-red-50 text-red-600 border border-red-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest font-bold text-terracotta-600">
                Pranav Dhyan Sanctuary
              </div>
              <h2 className="font-display text-3xl text-royal-950 font-normal">
                Temporary Interruption
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We encountered an unexpected rendering interruption while loading this sacred view. Our technical caretakers have been notified.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReload}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-royal-900 text-white hover:bg-royal-800 font-semibold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Sanctuary</span>
              </button>
              <button
                onClick={this.handleGoHome}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full border border-gray-300 bg-gray-50 text-royal-950 hover:bg-gray-100 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </button>
            </div>

            {/* Optional Collapsible Technical Note for Dev / Debug */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-4 p-3 bg-gray-900 rounded-lg text-left text-xs font-mono text-red-300 overflow-x-auto max-h-40">
                <strong>{this.state.error.toString()}</strong>
                <pre className="text-[10px] text-gray-400 mt-1 leading-normal">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
