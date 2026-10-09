"use client";

import React from "react";
import { Education } from "@/lib/types/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface EducationFormProps {
  education: Education[];
  onChange: (updated: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newItem: Education = {
      id: `edu-${Date.now()}`,
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
    };
    onChange([...education, newItem]);
  };

  const updateItem = (id: string, updates: Partial<Education>) => {
    onChange(
      education.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Education</h3>
          <p className="text-xs text-slate-500">
            Degrees, certifications, bootcamps, and academic credentials.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addEducation}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Degree
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No education entries yet</p>
          <Button size="sm" onClick={addEducation} className="mt-3" leftIcon={<Plus className="w-4 h-4" />}>
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div
              key={edu.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-slate-900">
                  {edu.degree || `Education #${idx + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(edu.id)}
                  className="p-1 text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Degree / Major"
                  placeholder="e.g. B.S. in Computer Science"
                  value={edu.degree}
                  onChange={(e) => updateItem(edu.id, { degree: e.target.value })}
                />
                <Input
                  label="School / University"
                  placeholder="e.g. University of California, Berkeley"
                  value={edu.institution}
                  onChange={(e) => updateItem(edu.id, { institution: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Location"
                  placeholder="Berkeley, CA"
                  value={edu.location}
                  onChange={(e) => updateItem(edu.id, { location: e.target.value })}
                />
                <Input
                  label="Start Date"
                  placeholder="YYYY-MM (e.g. 2018-08)"
                  value={edu.startDate}
                  onChange={(e) => updateItem(edu.id, { startDate: e.target.value })}
                />
                <Input
                  label="End Date"
                  placeholder="YYYY-MM (e.g. 2022-05)"
                  value={edu.endDate}
                  onChange={(e) => updateItem(edu.id, { endDate: e.target.value })}
                />
              </div>

              <div className="w-full sm:w-1/3">
                <Input
                  label="GPA / Honors (Optional)"
                  placeholder="e.g. 3.8 / 4.0"
                  value={edu.gpa || ""}
                  onChange={(e) => updateItem(edu.id, { gpa: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
