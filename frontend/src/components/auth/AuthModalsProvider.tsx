import { createContext, ReactNode, useState } from 'react';
import { LogInModal, ResetPasswordModal, SignUpModal } from '@/components';

interface IAuthModalsContext {
  showLoginModal: () => void;
  showSignUpModal: () => void;
  showResetPasswordModal: () => void;
}

export const AuthModalsContext = createContext<IAuthModalsContext>({
  showLoginModal: () => {
    throw Error('Auth Modals Context not implemented');
  },
  showSignUpModal: () => {
    throw Error('Auth Modals Context not implemented');
  },
  showResetPasswordModal: () => {
    throw Error('Auth Modals Context not implemented');
  },
});

interface IProps {
  children: ReactNode;
}

function AuthModalsProvider({ children }: IProps) {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<boolean>(false);

  const [contextValue] = useState({
    showLoginModal: () => setShowLoginModal(true),
    showSignUpModal: () => setShowSignUpModal(true),
    showResetPasswordModal: () => setShowResetPasswordModal(true),
  });

  return (
    <AuthModalsContext.Provider value={contextValue}>
      {children}

      <LogInModal
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
        onSignUpInsteadClicked={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
        onForgotPasswordClicked={() => {
          setShowLoginModal(false);
          setShowResetPasswordModal(true);
        }}
      />

      <SignUpModal
        open={showSignUpModal}
        onClose={() => {
          setShowSignUpModal(false);
        }}
        onLogInInsteadClicked={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />

      <ResetPasswordModal
        open={showResetPasswordModal}
        onClose={() => {
          setShowResetPasswordModal(false);
        }}
        onSignUpClicked={() => {
          setShowResetPasswordModal(false);
          setShowSignUpModal(true);
        }}
      />
    </AuthModalsContext.Provider>
  );
}

export default AuthModalsProvider;
