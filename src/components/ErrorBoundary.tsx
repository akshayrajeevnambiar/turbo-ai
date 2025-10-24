import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { tokens } from "../content/turboai";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Send error to monitoring service in production
    if (
      typeof window !== "undefined" &&
      window.location.hostname !== "localhost"
    ) {
      // Example: Send to analytics or error monitoring
      // analytics.track('Error Boundary Triggered', { error: error.message });
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: tokens.colors.charcoal,
            color: tokens.colors.white,
            fontFamily: tokens.type.body.join(", "),
            padding: "2rem",
          }}
        >
          <div style={{ maxWidth: "600px", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                color: tokens.colors.emeraldNeon,
                marginBottom: "1rem",
                fontFamily: tokens.type.headings.join(", "),
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.7",
                marginBottom: "2rem",
                opacity: 0.9,
              }}
            >
              We apologize for the inconvenience. An unexpected error has
              occurred. Please try refreshing the page or contact us if the
              problem persists.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: tokens.colors.emeraldNeon,
                  color: tokens.colors.charcoal,
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor =
                    tokens.colors.emeraldTint;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    tokens.colors.emeraldNeon;
                }}
              >
                Refresh Page
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  backgroundColor: "transparent",
                  color: tokens.colors.emeraldNeon,
                  border: `2px solid ${tokens.colors.emeraldNeon}`,
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor =
                    tokens.colors.emeraldNeon;
                  e.currentTarget.style.color = tokens.colors.charcoal;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = tokens.colors.emeraldNeon;
                }}
              >
                Go Home
              </button>
            </div>

            {/* Development error details */}
            {import.meta.env.DEV && this.state.error && (
              <details
                style={{
                  marginTop: "2rem",
                  textAlign: "left",
                  backgroundColor: tokens.colors.charcoalDeep,
                  padding: "1rem",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    marginBottom: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Error Details (Development)
                </summary>
                <pre style={{ whiteSpace: "pre-wrap", overflow: "auto" }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
