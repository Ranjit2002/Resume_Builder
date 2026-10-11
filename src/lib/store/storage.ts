import { ResumeData } from "../types/resume";
import { PortfolioData } from "../types/portfolio";
import { UserProfile } from "../types/subscription";
import { SAMPLE_RESUME, SAMPLE_PORTFOLIO } from "../constants/sample-data";
import { createClient, isSupabaseConfigured } from "../supabase/client";

const RESUMES_STORAGE_KEY = "careercraft_resumes";
const PORTFOLIOS_STORAGE_KEY = "careercraft_portfolios";
const USER_PROFILE_KEY = "careercraft_user_profile";

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: "user-demo-123",
  email: "alex.rivera@example.com",
  fullName: "Alex Rivera",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  createdAt: "2026-01-15T12:00:00.000Z",
  subscription: {
    userId: "user-demo-123",
    plan: "free",
    status: "active",
  },
};

// Helper to safely access localStorage in client components
function getLocalItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Local storage write error:", e);
  }
}

/* ============================
   RESUME STORAGE API
   ============================ */

export async function getResumes(): Promise<ResumeData[]> {
  if (typeof window === "undefined") return [SAMPLE_RESUME];

  // 1. Immediately read from localStorage (0ms latency, instant response)
  const stored = getLocalItem<ResumeData[]>(RESUMES_STORAGE_KEY, []);
  if (stored && stored.length > 0) {
    return stored;
  }

  // 2. Initialize with sample resume if empty
  const initial = [SAMPLE_RESUME];
  setLocalItem(RESUMES_STORAGE_KEY, initial);

  // 3. Optional background sync if Supabase configured
  if (isSupabaseConfigured()) {
    (async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("resumes")
            .select("*")
            .order("updated_at", { ascending: false });

          if (!error && data && data.length > 0) {
            const remoteResumes: ResumeData[] = data.map((row) => ({
              ...row.data,
              id: row.id,
              title: row.title,
              updatedAt: row.updated_at,
              createdAt: row.created_at,
            }));
            setLocalItem(RESUMES_STORAGE_KEY, remoteResumes);
          }
        }
      } catch (e) {
        // Silently catch background sync errors
      }
    })();
  }

  return initial;
}

export async function getResumeById(id: string): Promise<ResumeData | null> {
  if (typeof window === "undefined") {
    return id === SAMPLE_RESUME.id ? SAMPLE_RESUME : null;
  }

  // 1. Check local storage FIRST for instant (0ms) load
  const localList = getLocalItem<ResumeData[]>(RESUMES_STORAGE_KEY, [SAMPLE_RESUME]);
  const localMatch = localList.find((r) => r.id === id);
  if (localMatch) {
    return localMatch;
  }

  if (id === SAMPLE_RESUME.id || id === "sample-resume-id") {
    return SAMPLE_RESUME;
  }

  // 2. Fallback to Supabase with strict 1.5s timeout if not found locally
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const fetchPromise = supabase
          .from("resumes")
          .select("*")
          .eq("id", id)
          .single();

        const timeoutPromise = new Promise<{ data: null; error: string }>((resolve) =>
          setTimeout(() => resolve({ data: null, error: "timeout" }), 1500)
        );

        const result = await Promise.race([fetchPromise, timeoutPromise]);
        // @ts-ignore
        if (result && !result.error && result.data) {
          // @ts-ignore
          const remoteResume: ResumeData = {
            // @ts-ignore
            ...result.data.data,
            // @ts-ignore
            id: result.data.id,
            // @ts-ignore
            title: result.data.title,
            // @ts-ignore
            updatedAt: result.data.updated_at,
            // @ts-ignore
            createdAt: result.data.created_at,
          };
          // Cache in local storage for future instant loads
          setLocalItem(RESUMES_STORAGE_KEY, [remoteResume, ...localList]);
          return remoteResume;
        }
      }
    } catch (e) {
      console.warn("Supabase resume fetch error:", e);
    }
  }

  // 3. Fallback: if not found, return a template-based draft so editor never hangs
  const fallbackDraft: ResumeData = {
    ...SAMPLE_RESUME,
    id,
    title: "Draft Resume",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return fallbackDraft;
}

export async function saveResume(resume: ResumeData): Promise<ResumeData> {
  const updatedResume: ResumeData = {
    ...resume,
    updatedAt: new Date().toISOString(),
  };

  // 1. Instantly write to localStorage (0ms latency, completely synchronous and reliable)
  const currentList = getLocalItem<ResumeData[]>(RESUMES_STORAGE_KEY, [SAMPLE_RESUME]);
  const index = currentList.findIndex((r) => r.id === updatedResume.id);
  let updatedList: ResumeData[];

  if (index >= 0) {
    updatedList = [...currentList];
    updatedList[index] = updatedResume;
  } else {
    updatedList = [updatedResume, ...currentList];
  }

  setLocalItem(RESUMES_STORAGE_KEY, updatedList);

  // 2. Background sync to Supabase (never blocks the UI or navigation)
  if (isSupabaseConfigured()) {
    (async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          await supabase.from("resumes").upsert({
            id: updatedResume.id,
            title: updatedResume.title,
            data: updatedResume,
            updated_at: updatedResume.updatedAt,
          });
        }
      } catch (e) {
        // Silently ignore background sync errors
      }
    })();
  }

  return updatedResume;
}

export async function duplicateResume(id: string): Promise<ResumeData | null> {
  const original = await getResumeById(id);
  if (!original) return null;

  const newId = `resume-${Date.now()}`;
  const copy: ResumeData = {
    ...original,
    id: newId,
    title: `${original.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return await saveResume(copy);
}

export async function deleteResume(id: string): Promise<boolean> {
  const list = getLocalItem<ResumeData[]>(RESUMES_STORAGE_KEY, []);
  const filtered = list.filter((r) => r.id !== id);
  setLocalItem(RESUMES_STORAGE_KEY, filtered);

  if (isSupabaseConfigured()) {
    (async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          await supabase.from("resumes").delete().eq("id", id);
        }
      } catch (e) {
        // Silently catch background deletion error
      }
    })();
  }

  return true;
}

/* ============================
   PORTFOLIO STORAGE API
   ============================ */

export async function getPortfolios(): Promise<PortfolioData[]> {
  if (typeof window === "undefined") return [SAMPLE_PORTFOLIO];

  // 1. Immediately read from localStorage (0ms)
  const stored = getLocalItem<PortfolioData[]>(PORTFOLIOS_STORAGE_KEY, []);
  if (stored && stored.length > 0) {
    return stored;
  }

  const initial = [SAMPLE_PORTFOLIO];
  setLocalItem(PORTFOLIOS_STORAGE_KEY, initial);

  // 2. Background sync if Supabase configured
  if (isSupabaseConfigured()) {
    (async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("portfolios")
            .select("*")
            .order("updated_at", { ascending: false });

          if (!error && data && data.length > 0) {
            const remotePortfolios: PortfolioData[] = data.map((row) => ({
              ...row.data,
              id: row.id,
              slug: row.slug,
              title: row.title,
              isPublished: row.is_published,
              updatedAt: row.updated_at,
              createdAt: row.created_at,
            }));
            setLocalItem(PORTFOLIOS_STORAGE_KEY, remotePortfolios);
          }
        }
      } catch (e) {
        // Silently catch background errors
      }
    })();
  }

  return initial;
}

export async function getPortfolioById(id: string): Promise<PortfolioData | null> {
  if (typeof window === "undefined") {
    return id === SAMPLE_PORTFOLIO.id ? SAMPLE_PORTFOLIO : null;
  }

  // 1. Check local storage first (0ms latency)
  const localList = getLocalItem<PortfolioData[]>(PORTFOLIOS_STORAGE_KEY, [SAMPLE_PORTFOLIO]);
  const localMatch = localList.find((p) => p.id === id);
  if (localMatch) {
    return localMatch;
  }

  if (id === SAMPLE_PORTFOLIO.id || id === "demo-portfolio-1") {
    return SAMPLE_PORTFOLIO;
  }

  // 2. Fallback to Supabase with strict 1.5s timeout
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const fetchPromise = supabase
          .from("portfolios")
          .select("*")
          .eq("id", id)
          .single();

        const timeoutPromise = new Promise<{ data: null; error: string }>((resolve) =>
          setTimeout(() => resolve({ data: null, error: "timeout" }), 1500)
        );

        const result = await Promise.race([fetchPromise, timeoutPromise]);
        // @ts-ignore
        if (result && !result.error && result.data) {
          // @ts-ignore
          const remotePortfolio: PortfolioData = {
            // @ts-ignore
            ...result.data.data,
            // @ts-ignore
            id: result.data.id,
            // @ts-ignore
            slug: result.data.slug,
            // @ts-ignore
            title: result.data.title,
            // @ts-ignore
            isPublished: result.data.is_published,
            // @ts-ignore
            updatedAt: result.data.updated_at,
            // @ts-ignore
            createdAt: result.data.created_at,
          };
          setLocalItem(PORTFOLIOS_STORAGE_KEY, [remotePortfolio, ...localList]);
          return remotePortfolio;
        }
      }
    } catch (e) {
      console.warn("Supabase portfolio get failed:", e);
    }
  }

  // Fallback to sample portfolio so editor never hangs
  return {
    ...SAMPLE_PORTFOLIO,
    id,
    title: "Draft Portfolio",
  };
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioData | null> {
  const normalizedSlug = slug.toLowerCase().trim();

  // 1. Check local storage first
  const list = getLocalItem<PortfolioData[]>(PORTFOLIOS_STORAGE_KEY, [SAMPLE_PORTFOLIO]);
  const match = list.find(
    (p) => p.slug.toLowerCase() === normalizedSlug && p.isPublished
  );
  if (match) return match;

  if (normalizedSlug === SAMPLE_PORTFOLIO.slug && SAMPLE_PORTFOLIO.isPublished) {
    return SAMPLE_PORTFOLIO;
  }

  // 2. Check Supabase with strict timeout
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const fetchPromise = supabase
          .from("portfolios")
          .select("*")
          .eq("slug", normalizedSlug)
          .eq("is_published", true)
          .single();

        const timeoutPromise = new Promise<{ data: null; error: string }>((resolve) =>
          setTimeout(() => resolve({ data: null, error: "timeout" }), 1500)
        );

        const result = await Promise.race([fetchPromise, timeoutPromise]);
        // @ts-ignore
        if (result && !result.error && result.data) {
          // @ts-ignore
          return {
            // @ts-ignore
            ...result.data.data,
            // @ts-ignore
            id: result.data.id,
            // @ts-ignore
            slug: result.data.slug,
            // @ts-ignore
            title: result.data.title,
            // @ts-ignore
            isPublished: result.data.is_published,
            // @ts-ignore
            updatedAt: result.data.updated_at,
            // @ts-ignore
            createdAt: result.data.created_at,
          };
        }
      }
    } catch (e) {
      console.warn("Supabase public slug fetch error:", e);
    }
  }

  return null;
}

export async function savePortfolio(portfolio: PortfolioData): Promise<PortfolioData> {
  const updatedPortfolio: PortfolioData = {
    ...portfolio,
    updatedAt: new Date().toISOString(),
  };

  // 1. Immediately write to localStorage (0ms latency)
  const currentList = getLocalItem<PortfolioData[]>(PORTFOLIOS_STORAGE_KEY, [SAMPLE_PORTFOLIO]);
  const index = currentList.findIndex((p) => p.id === updatedPortfolio.id);
  let updatedList: PortfolioData[];

  if (index >= 0) {
    updatedList = [...currentList];
    updatedList[index] = updatedPortfolio;
  } else {
    updatedList = [updatedPortfolio, ...currentList];
  }

  setLocalItem(PORTFOLIOS_STORAGE_KEY, updatedList);

  // 2. Background sync to Supabase (never blocks UI)
  if (isSupabaseConfigured()) {
    (async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          await supabase.from("portfolios").upsert({
            id: updatedPortfolio.id,
            slug: updatedPortfolio.slug,
            title: updatedPortfolio.title,
            is_published: updatedPortfolio.isPublished,
            data: updatedPortfolio,
            updated_at: updatedPortfolio.updatedAt,
          });
        }
      } catch (e) {
        // Ignore background sync errors
      }
    })();
  }

  return updatedPortfolio;
}

export async function deletePortfolio(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from("portfolios").delete().eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase delete portfolio error:", e);
    }
  }

  const list = getLocalItem<PortfolioData[]>(PORTFOLIOS_STORAGE_KEY, []);
  const filtered = list.filter((p) => p.id !== id);
  setLocalItem(PORTFOLIOS_STORAGE_KEY, filtered);
  return true;
}

/* ============================
   USER PROFILE & SUBSCRIPTION
   ============================ */

export function getUserProfile(): UserProfile {
  return getLocalItem<UserProfile>(USER_PROFILE_KEY, DEFAULT_USER_PROFILE);
}

export function isUserPro(profile?: UserProfile): boolean {
  const p = profile || getUserProfile();
  return Boolean(
    p?.subscription?.plan === "pro" &&
    p?.subscription?.status === "active"
  );
}

export function saveUserProfile(profile: Partial<UserProfile>): UserProfile {
  const current = getUserProfile();
  const updated = {
    ...current,
    ...profile,
    subscription: profile.subscription
      ? { ...current.subscription, ...profile.subscription }
      : current.subscription,
  };
  setLocalItem(USER_PROFILE_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("careercraft_user_updated", { detail: updated })
    );
  }

  return updated;
}
