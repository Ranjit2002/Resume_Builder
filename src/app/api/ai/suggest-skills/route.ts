import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { roleTitle } = await req.json();
    const role = (roleTitle || "Software Engineer").toLowerCase();

    const SKILL_MAP: Record<string, string[]> = {
      frontend: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Web Performance", "Jest", "CSS3 / HTML5"],
      backend: ["Node.js", "Express", "Python", "Go", "PostgreSQL", "Redis", "Docker", "RESTful APIs", "Microservices"],
      fullstack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Supabase", "Docker", "GraphQL", "Tailwind CSS", "AWS"],
      designer: ["Figma", "Design Systems", "User Research", "Wireframing", "Interaction Design", "Prototyping", "Information Architecture"],
      product: ["Product Strategy", "User Journey Mapping", "A/B Testing", "Agile / Scrum", "Jira", "SQL Analytics", "Stakeholder Management"],
      data: ["Python", "SQL", "Pandas", "PyTorch", "Tableau", "ETL Pipelines", "Data Modeling", "Scikit-learn"],
      default: ["Problem Solving", "Git / GitHub", "Agile Methodologies", "Cross-Functional Collaboration", "System Architecture", "Continuous Integration"],
    };

    let selectedKey = "default";
    if (role.includes("front") || role.includes("ui") || role.includes("web")) selectedKey = "frontend";
    else if (role.includes("back") || role.includes("api") || role.includes("server")) selectedKey = "backend";
    else if (role.includes("full") || role.includes("software") || role.includes("dev")) selectedKey = "fullstack";
    else if (role.includes("design") || role.includes("ux")) selectedKey = "designer";
    else if (role.includes("product") || role.includes("manager")) selectedKey = "product";
    else if (role.includes("data") || role.includes("analyst") || role.includes("ai")) selectedKey = "data";

    const skills = [
      ...SKILL_MAP[selectedKey],
      ...SKILL_MAP.default.slice(0, 3),
    ];

    return NextResponse.json({
      skills,
      category: selectedKey,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to generate skill suggestions." },
      { status: 500 }
    );
  }
}
