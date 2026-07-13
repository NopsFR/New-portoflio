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
          background: '#0a0a0f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'monospace',
        }}>
          <div style={{
            background: '#0d0d14',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
          }}>
            <h1 style={{ color: '#ef4444', fontSize: '18px', marginBottom: '16px' }}>
              ⚠ App Error
            </h1>
            <pre style={{
              color: '#f87171',
              fontSize: '13px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              background: '#050508',
              padding: '16px',
              borderRadius: '4px',
              marginBottom: '12px',
            }}>
              {this.state.error?.message || 'Unknown error'}
            </pre>
            {this.state.error?.stack && (
              <details style={{ marginTop: '12px' }}>
                <summary style={{ color: '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>
                  Stack Trace
                </summary>
                <pre style={{
                  color: '#6b7280',
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
                background: '#00ff4110',
                border: '1px solid #00ff4130',
                borderRadius: '4px',
                color: '#00ff41',
                fontFamily: 'monospace',
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