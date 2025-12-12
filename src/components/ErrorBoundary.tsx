import { Component, type ErrorInfo, type ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../ui/Button";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showRetry?: boolean;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    this.props.onError?.(error, errorInfo);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
          showRetry={this.props.showRetry}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  onRetry?: () => void;
  showRetry?: boolean;
}

function ErrorFallback({
  error,
  onRetry,
  showRetry = true,
}: ErrorFallbackProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-[400px] flex items-center justify-center p-8 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="text-center max-w-md">
        <div
          className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
            theme === "light"
              ? "bg-red-100 text-red-600"
              : "bg-red-900/30 text-red-400"
          }`}
        >
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2
          className={`text-xl font-semibold mb-3 ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Something went wrong
        </h2>

        <p
          className={`text-sm mb-6 ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>

        {import.meta.env.DEV && error && (
          <details
            className={`text-left mb-6 p-4 rounded-lg ${
              theme === "light" ? "bg-gray-100" : "bg-gray-800"
            }`}
          >
            <summary
              className={`cursor-pointer text-sm font-medium ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Error Details
            </summary>
            <pre
              className={`mt-2 text-xs overflow-auto ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex gap-3 justify-center">
          {showRetry && onRetry && (
            <Button
              variant="primary"
              onClick={onRetry}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
}

// Specific error boundaries for different components
export function CardErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundaryClass
      fallback={
        <div className="w-full max-w-sm">
          <div
            className={`p-6 rounded-2xl border ${
              useTheme().theme === "light"
                ? "bg-white/50 border-gray-200"
                : "bg-black/50 border-gray-700"
            }`}
          >
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-500">Failed to load content</p>
            </div>
          </div>
        </div>
      }
      showRetry={false}
    >
      {children}
    </ErrorBoundaryClass>
  );
}

export function GridErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundaryClass
      fallback={
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Failed to load content
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            There was an error loading your memories
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </Button>
        </div>
      }
    >
      {children}
    </ErrorBoundaryClass>
  );
}

export function ModalErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundaryClass
      fallback={
        <div className="p-8 text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Modal Error
          </h3>
          <p className="text-sm text-gray-500">
            Something went wrong with this modal
          </p>
        </div>
      }
      showRetry={false}
    >
      {children}
    </ErrorBoundaryClass>
  );
}

export default ErrorBoundaryClass;
