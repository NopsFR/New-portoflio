import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0B0C10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <div style={{
            background: '#1F2833',
            border: '1px solid #2A3340',
            borderRadius: '8px',
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
          }}>
            <h1 style={{ color: '#F87171', fontSize: '18px', marginBottom: '16px' }}>
              ⚠ App Error
            </h1>
            <pre style={{
              color: '#F87171',
              fontSize: '13px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              background: '#0B0C10',
              padding: '16px',
              borderRadius: '4px',
              marginBottom: '12px',
            }}>
              {this.state.error?.message || 'Unknown error'}
            </pre>
            {this.state.error?.stack && (
              <details style={{ marginTop: '12px' }}>
                <summary style={{ color: '#6B7280', fontSize: '12px', cursor: 'pointer' }}>
                  Stack Trace
                </summary>
                <pre style={{
                  color: '#6B7280',
                  fontSize: '11px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  marginTop: '8px',
                  maxHeight: '300px',
                  overflow: 'auto',
                }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '8px 20px',
                background: 'rgba(102,252,241,0.08)',
                border: '1px solid rgba(102,252,241,0.20)',
                borderRadius: '4px',
                color: '#66FCF1',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;