import { ResumeData, ResumeScoreReport } from "../types/resume";

export function calculateResumeScore(resume: ResumeData): ResumeScoreReport {
  let score = 0;
  const completedItems: string[] = [];
  const suggestions: ResumeScoreReport["suggestions"] = [];

  // 1. Personal Information (20 points max)
  const info = resume.personalInfo;
  if (info.fullName?.trim() && info.jobTitle?.trim()) {
    score += 8;
    completedItems.push("Full name and professional headline");
  } else {
    suggestions.push({
      title: "Add your full name & job title",
      description: "Recruiters need to know who you are and your target role instantly.",
      points: 8,
      sectionKey: "personal",
    });
  }

  if (info.email?.trim() && info.phone?.trim()) {
    score += 6;
    completedItems.push("Direct contact methods (Email & Phone)");
  } else {
    suggestions.push({
      title: "Provide contact information",
      description: "Ensure your email address and phone number are present.",
      points: 6,
      sectionKey: "personal",
    });
  }

  if (info.location?.trim()) {
    score += 3;
    completedItems.push("Location / City");
  } else {
    suggestions.push({
      title: "Include location or remote preference",
      description: "Hiring managers check for time zone alignment or relocation readiness.",
      points: 3,
      sectionKey: "personal",
    });
  }

  if (info.linkedin?.trim() || info.github?.trim() || info.website?.trim()) {
    score += 3;
    completedItems.push("Online profile or portfolio link");
  } else {
    suggestions.push({
      title: "Attach LinkedIn or portfolio link",
      description: "Adding your LinkedIn profile increases recruiter response rates by 71%.",
      points: 3,
      sectionKey: "personal",
    });
  }

  // 2. Summary (15 points max)
  if (resume.summary?.trim().length > 80) {
    score += 15;
    completedItems.push("Strong professional summary (>80 characters)");
  } else if (resume.summary?.trim().length > 20) {
    score += 8;
    completedItems.push("Brief professional summary");
    suggestions.push({
      title: "Expand professional summary",
      description: "Aim for 2-4 sentences highlighting your years of experience, core expertise, and key achievement.",
      points: 7,
      sectionKey: "summary",
    });
  } else {
    suggestions.push({
      title: "Write a professional summary",
      description: "Summarize your career focus, top accomplishments, and value proposition.",
      points: 15,
      sectionKey: "summary",
    });
  }

  // 3. Work Experience (25 points max)
  if (resume.experiences && resume.experiences.length > 0) {
    score += 12;
    completedItems.push(`Added ${resume.experiences.length} work experience entry/entries`);

    // Check for metric-driven bullets (% or $ or numbers)
    const allHighlights = resume.experiences.flatMap((e) => e.highlights || []);
    const hasMetrics = allHighlights.some((h) =>
      /\d+%|\$\d+|\d+\+|\b\d+\s*(users|clients|projects|million|k|team|members)\b/i.test(h)
    );

    if (hasMetrics) {
      score += 8;
      completedItems.push("Actionable bullet points with measurable metrics");
    } else {
      suggestions.push({
        title: "Add measurable metrics to experience bullets",
        description: "Include numbers, percentages, or dollar amounts to quantify your impact (e.g., 'increased sales by 30%').",
        points: 8,
        sectionKey: "experiences",
      });
    }

    if (allHighlights.length >= 3) {
      score += 5;
      completedItems.push("Detailed achievement bullets");
    } else {
      suggestions.push({
        title: "Add more bullet points for responsibilities",
        description: "Aim for 3-5 concise bullet points per relevant work experience.",
        points: 5,
        sectionKey: "experiences",
      });
    }
  } else {
    suggestions.push({
      title: "Add your work experience",
      description: "Detail your past roles, internships, or freelancing engagements.",
      points: 25,
      sectionKey: "experiences",
    });
  }

  // 4. Education (15 points max)
  if (resume.education && resume.education.length > 0) {
    score += 15;
    completedItems.push("Education credentials listed");
  } else {
    suggestions.push({
      title: "Add education or training background",
      description: "List your degree, university, bootcamp, or major coursework.",
      points: 15,
      sectionKey: "education",
    });
  }

  // 5. Skills (15 points max)
  const totalSkills = resume.skillCategories.reduce(
    (acc, cat) => acc + (cat.skills?.length || 0),
    0
  );
  if (totalSkills >= 8) {
    score += 15;
    completedItems.push(`Comprehensive skill set (${totalSkills} skills tagged)`);
  } else if (totalSkills >= 3) {
    score += 8;
    completedItems.push("Basic skills listed");
    suggestions.push({
      title: "Add more relevant keywords & skills",
      description: "Include 8-15 technical and specialized skills to optimize ATS keyword matching.",
      points: 7,
      sectionKey: "skills",
    });
  } else {
    suggestions.push({
      title: "Add key skills and competencies",
      description: "Recruiters and ATS scanners filter heavily on specific skill keywords.",
      points: 15,
      sectionKey: "skills",
    });
  }

  // 6. Projects or Certifications (10 points max)
  const hasProjects = resume.projects && resume.projects.length > 0;
  const hasCerts = resume.certifications && resume.certifications.length > 0;

  if (hasProjects && hasCerts) {
    score += 10;
    completedItems.push("Projects and industry certifications included");
  } else if (hasProjects || hasCerts) {
    score += 6;
    completedItems.push(hasProjects ? "Projects showcased" : "Certifications included");
    suggestions.push({
      title: hasProjects ? "Add certifications or licenses" : "Showcase portfolio projects",
      description: "Providing both tangible projects and credentials dramatically boosts interview callback rates.",
      points: 4,
      sectionKey: hasProjects ? "certifications" : "projects",
    });
  } else {
    suggestions.push({
      title: "Add at least one project or certification",
      description: "Demonstrate hands-on execution and validated expertise.",
      points: 10,
      sectionKey: "projects",
    });
  }

  // Ensure score stays within 0 - 100
  const finalScore = Math.min(100, Math.max(0, score));

  let grade: ResumeScoreReport["grade"] = "Needs Work";
  if (finalScore >= 90) grade = "All-Star";
  else if (finalScore >= 80) grade = "Excellent";
  else if (finalScore >= 65) grade = "Strong";
  else if (finalScore >= 50) grade = "Good";

  return {
    score: finalScore,
    grade,
    completedItems,
    suggestions,
  };
}
