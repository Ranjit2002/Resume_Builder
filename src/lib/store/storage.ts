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

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("resumes")
          .select("*")
          .order("updated_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((row) => ({
            ...row.data,
            id: row.id,
            title: row.title,
            updatedAt: row.updated_at,
            createdAt: row.created_at,
          }));
        }
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to local storage:", e);
    }
  }

  // Local storage fallback
  const stored = getLocalItem<ResumeData[]>(RESUMES_STORAGE_KEY, []);
  if (!stored || stored.length === 0) {
    const initial = [SAMPLE_RESUME];
    setLocalItem(RESUMES_STORAGE_KEY, initial);
    return initial;
  }
  return stored;
}

export async function getResumeById(id: string): Promise<ResumeData | null> {
  if (typeof window === "undefined") {
    return id === SAMPLE_RESUME.id ? SAMPLE_RESUME : null;
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("resumes")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          return {
            ...data.data,
            id: data.id,
            title: data.title,
            updatedAt: data.updated_at,
            createdAt: data.created_at,
          };
        }
      }
    } catch (e) {
      console.warn("Supabase get single failed:", e);
    }
  }

  const list = await getResumes();
  return list.find((r) => r.id === id) || (id === SAMPLE_RESUME.id ? SAMPLE_RESUME : null);
}

export async function saveResume(resume: ResumeData): Promise<ResumeData> {
  const updatedResume: ResumeData = {
    ...resume,
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase.from("resumes").upsert({
          id: updatedResume.id,
          title: updatedResume.title,
          data: updatedResume,
          updated_at: updatedResume.updatedAt,
        });
        if (error) {
          console.warn("Supabase upsert resume error:", error);
        }
      }
    } catch (e) {
      console.warn("Supabase save exception:", e);
    }
  }

  // Always keep localStorage in sync
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
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from("resumes").delete().eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase delete failed:", e);
    }
  }

  const list = getLocalItem<ResumeData[]>(RESUMES_STORAGE_KEY, []);
  const filtered = list.filter((r) => r.id !== id);
  setLocalItem(RESUMES_STORAGE_KEY, filtered);
  return true;
}

/* ============================
   PORTFOLIO STORAGE API
   ============================ */

export async function getPortfolios(): Promise<PortfolioData[]> {
  if (typeof window === "undefined") return [SAMPLE_PORTFOLIO];

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .order("updated_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((row) => ({
            ...row.data,
            id: row.id,
            slug: row.slug,
            title: row.title,
            isPublished: row.is_published,
            updatedAt: row.updated_at,
            createdAt: row.created_at,
          }));
        }
      }
    } catch (e) {
      console.warn("Supabase portfolio list failed:", e);
    }
  }

  const stored = getLocalItem<PortfolioData[]>(PORTFOLIOS_STORAGE_KEY, []);
  if (!stored || stored.length === 0) {
    const initial = [SAMPLE_PORTFOLIO];
    setLocalItem(PORTFOLIOS_STORAGE_KEY, initial);
    return initial;
  }
  return stored;
}

export async function getPortfolioById(id: string): Promise<PortfolioData | null> {
  if (typeof window === "undefined") {
    return id === SAMPLE_PORTFOLIO.id ? SAMPLE_PORTFOLIO : null;
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          return {
            ...data.data,
            id: data.id,
            slug: data.slug,
            title: data.title,
            isPublished: data.is_published,
            updatedAt: data.updated_at,
            createdAt: data.created_at,
          };
        }
      }
    } catch (e) {
      console.warn("Supabase portfolio get failed:", e);
    }
  }

  const list = await getPortfolios();
  return list.find((p) => p.id === id) || (id === SAMPLE_PORTFOLIO.id ? SAMPLE_PORTFOLIO : null);
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioData | null> {
  const normalizedSlug = slug.toLowerCase().trim();

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .eq("slug", normalizedSlug)
          .eq("is_published", true)
          .single();

        if (!error && data) {
          return {
            ...data.data,
            id: data.id,
            slug: data.slug,
            title: data.title,
            isPublished: data.is_published,
            updatedAt: data.updated_at,
            createdAt: data.created_at,
          };
        }
      }
    } catch (e) {
      console.warn("Supabase public slug fetch error:", e);
    }
  }

  const list = await getPortfolios();
  const match = list.find(
    (p) => p.slug.toLowerCase() === normalizedSlug && p.isPublished
  );

  if (match) return match;
  if (normalizedSlug === SAMPLE_PORTFOLIO.slug && SAMPLE_PORTFOLIO.isPublished) {
    return SAMPLE_PORTFOLIO;
  }
  return null;
}

export async function savePortfolio(portfolio: PortfolioData): Promise<PortfolioData> {
  const updatedPortfolio: PortfolioData = {
    ...portfolio,
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
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
      console.warn("Supabase portfolio upsert failed:", e);
    }
  }

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

export function saveUserProfile(profile: Partial<UserProfile>): UserProfile {
  const current = getUserProfile();
  const updated = { ...current, ...profile };
  setLocalItem(USER_PROFILE_KEY, updated);
  return updated;
}
