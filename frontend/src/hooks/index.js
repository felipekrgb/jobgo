import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}

export default AppProvider;
