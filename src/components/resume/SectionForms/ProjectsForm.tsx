"use client";

import React from "react";
import { ProjectItem } from "@/lib/types/resume";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, FolderGit2, Globe } from "lucide-react";
import { Github } from "@/components/ui/Icons";

interface ProjectsFormProps {
  projects: ProjectItem[];
  onChange: (updated: ProjectItem[]) => void;
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "",
      description: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
    };
    onChange([...projects, newProj]);
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    onChange(
      projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Featured Projects</h3>
          <p className="text-xs text-slate-500">
            Showcase your code builds, open source work, or real-world apps.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addProject}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No projects added yet</p>
          <Button size="sm" onClick={addProject} className="mt-3" leftIcon={<Plus className="w-4 h-4" />}>
            Add First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">
                  {proj.title || `Project #${idx + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="p-1 text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <Input
                label="Project Name"
                placeholder="e.g. Telemetry Analytics Dashboard"
                value={proj.title}
                onChange={(e) => updateProject(proj.id, { title: e.target.value })}
              />

              <Textarea
                label="Description & Outcomes"
                rows={2}
                placeholder="What problem does it solve? What was your core technical contribution?"
                value={proj.description}
                onChange={(e) =>
                  updateProject(proj.id, { description: e.target.value })
                }
              />

              <Input
                label="Technologies (comma separated)"
                placeholder="React, Next.js, TypeScript, PostgreSQL"
                value={proj.technologies?.join(", ") || ""}
                onChange={(e) =>
                  updateProject(proj.id, {
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Live Demo Link"
                  placeholder="https://myproject.com"
                  value={proj.liveUrl || ""}
                  onChange={(e) =>
                    updateProject(proj.id, { liveUrl: e.target.value })
                  }
                  leftIcon={<Globe className="w-4 h-4" />}
                />
                <Input
                  label="GitHub Repository"
                  placeholder="https://github.com/username/repo"
                  value={proj.githubUrl || ""}
                  onChange={(e) =>
                    updateProject(proj.id, { githubUrl: e.target.value })
                  }
                  leftIcon={<Github className="w-4 h-4" />}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
