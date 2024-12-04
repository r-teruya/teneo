export interface OnboardingStepProps {
  onNext: () => void;
  onBack?: () => void;
}

export interface FormData {
  // 個人情報
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  birthDate: string;
  gender: '男性' | '女性' | 'その他';
  phoneNumber: string;
  email: string;

  // 住所情報
  postalCode: string;
  prefecture: string;
  city: string;
  address1: string;
  address2?: string;

  // 取引情報
  occupation: string;
  annualIncome: string;
  investmentExperience: string;
  riskTolerance: string;
  investmentGoal: string;
} 