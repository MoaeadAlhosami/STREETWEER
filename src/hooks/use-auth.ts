import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { authService } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";
import { handleApiError } from "@/lib/error-handler";
import { LoginRequest, RegisterRequest } from "@/types/auth";

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.token && data.user) {
        login(data.user, data.token);
        toast({
          title: "Welcome back!",
          description: "Logged in successfully.",
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "Invalid response from server.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      handleApiError(error, toast);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (data) => {
      if (data.token && data.user) {
        login(data.user, data.token);
        toast({
          title: "Welcome!",
          description: "Account created successfully.",
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "Invalid response from server.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      handleApiError(error, toast);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      router.push("/");
    },
    onError: (error) => {
      // Logout locally even if API call fails
      logout();
      handleApiError(error, toast);
    },
  });
};
