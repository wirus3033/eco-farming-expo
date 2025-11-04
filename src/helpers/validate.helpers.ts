import { t } from "i18next";

export const validateEmail = (
  email: string
): { isValid: boolean; error: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return { isValid: false, error: t('LOGING:EMAIL_REQUIRED')};
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: t('LOGING:SYNTAX_ERROR_EMAIL') };
  }
  return { isValid: true, error: "" };
};

export const validatePassword = (
  password: string
): { isValid: boolean; error: string } => {
  if (!password.trim()) {
    return { isValid: false, error: t('LOGING:PASSWORD_REQUIRED')};
  }

  return { isValid: true, error: "" };
};
