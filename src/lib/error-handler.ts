import { useToast } from "@/components/ui/use-toast";

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export function handleApiError(error: unknown, toast?: ReturnType<typeof useToast>): string {
  let errorMessage = "Something went wrong. Please try again.";

  if (error instanceof Error) {
    errorMessage = error.message;
    
    // Try to parse JSON error message
    try {
      const parsed = JSON.parse(error.message);
      if (parsed?.message) {
        errorMessage = parsed.message;
      } else if (parsed?.error) {
        errorMessage = parsed.error;
      }
    } catch {
      // If parsing fails, use the error message as is
    }
  }

  // Show toast if provided
  if (toast) {
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }

  return errorMessage;
}

export function formatValidationErrors(errors: Record<string, string[]>): string {
  return Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
    .join("\n");
}
