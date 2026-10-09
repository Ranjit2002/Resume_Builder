export type PlanType = "free" | "pro";

export interface PlanLimits {
  maxResumes: number;
  maxPortfolios: number;
  allowedResumeTemplates: string[];
  allowedPortfolioTemplates: string[];
  hasAiWriting: boolean;
  hasCustomBranding: boolean;
  hasAnalytics: boolean;
  hasPriorityExport: boolean;
}

export interface UserSubscription {
  userId: string;
  plan: PlanType;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd?: string;
  razorpaySubscriptionId?: string;
  razorpayCustomerId?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  createdAt: string;
  subscription: UserSubscription;
}
