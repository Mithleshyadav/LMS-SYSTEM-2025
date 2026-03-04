import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <h1 className="text-3xl font-bold mb-4">
            Something went wrong.
          </h1>
          <p className="text-muted-foreground mb-6">
            Please try refreshing the page.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;