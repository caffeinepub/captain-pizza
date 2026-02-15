import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree';
import { RenderErrorBoundary } from './components/system/RenderErrorBoundary';

// Create the router instance
let router: ReturnType<typeof createRouter> | null = null;

try {
  router = createRouter({ routeTree });
} catch (error) {
  console.error('Failed to create router:', error);
}

export default function App() {
  // If router creation failed, show error fallback
  if (!router) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <RenderErrorBoundary>
      <RouterProvider router={router} />
    </RenderErrorBoundary>
  );
}
