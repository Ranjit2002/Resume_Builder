"use client";

import React from "react";
import { AwardItem, LanguageItem, VolunteerItem } from "@/lib/types/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  awards: AwardItem[];
  languages: LanguageItem[];
  volunteer: VolunteerItem[];
  onChangeAwards: (updated: AwardItem[]) => void;
  onChangeLanguages: (updated: LanguageItem[]) => void;
  onChangeVolunteer: (updated: VolunteerItem[]) => void;
}

export function AwardsLanguagesVolunteerForm({
  awards,
  languages,
  volunteer,
  onChangeAwards,
  onChangeLanguages,
  onChangeVolunteer,
}: Props) {
  // Awards
  const addAward = () => {
    onChangeAwards([
      ...awards,
      { id: `award-${Date.now()}`, title: "", issuer: "", date: "" },
    ]);
  };
  const updateAward = (id: string, updates: Partial<AwardItem>) => {
    onChangeAwards(awards.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };
  const removeAward = (id: string) => {
    onChangeAwards(awards.filter((a) => a.id !== id));
  };

  // Languages
  const addLanguage = () => {
    onChangeLanguages([
      ...languages,
      { id: `lang-${Date.now()}`, language: "", proficiency: "Fluent" },
    ]);
  };
  const updateLanguage = (id: string, updates: Partial<LanguageItem>) => {
    onChangeLanguages(
      languages.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
  };
  const removeLanguage = (id: string) => {
    onChangeLanguages(languages.filter((l) => l.id !== id));
  };

  // Volunteer
  const addVolunteer = () => {
    onChangeVolunteer([
      ...volunteer,
      {
        id: `vol-${Date.now()}`,
        role: "",
        organization: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const updateVolunteer = (id: string, updates: Partial<VolunteerItem>) => {
    onChangeVolunteer(
      volunteer.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };
  const removeVolunteer = (id: string) => {
    onChangeVolunteer(volunteer.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Languages */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Spoken Languages
          </h4>
          <Button type="button" size="sm" variant="outline" onClick={addLanguage} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Add Language
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-2 p-2.5 border rounded-xl bg-white shadow-2xs">
              <Input
                placeholder="Language (e.g. English)"
                value={lang.language}
                onChange={(e) => updateLanguage(lang.id, { language: e.target.value })}
              />
              <select
                value={lang.proficiency}
                onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value as any })}
                className="text-xs rounded-xl border border-slate-200 py-2 px-2 bg-white"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Proficient">Proficient</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              <button
                type="button"
                onClick={() => removeLanguage(lang.id)}
                className="p-1 text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Awards & Honors */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Awards & Honors
          </h4>
          <Button type="button" size="sm" variant="outline" onClick={addAward} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Add Award
          </Button>
        </div>
        <div className="space-y-2.5">
          {awards.map((a) => (
            <div key={a.id} className="p-3 border rounded-xl bg-white space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">{a.title || "Untitled Honor"}</span>
                <button type="button" onClick={() => removeAward(a.id)} className="text-slate-400 hover:text-rose-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Input
                  placeholder="Award Title"
                  value={a.title}
                  onChange={(e) => updateAward(a.id, { title: e.target.value })}
                />
                <Input
                  placeholder="Awarding Body"
                  value={a.issuer}
                  onChange={(e) => updateAward(a.id, { issuer: e.target.value })}
                />
                <Input
                  placeholder="Date (YYYY-MM)"
                  value={a.date}
                  onChange={(e) => updateAward(a.id, { date: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Leadership */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Volunteer & Community
          </h4>
          <Button type="button" size="sm" variant="outline" onClick={addVolunteer} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Add Volunteer Role
          </Button>
        </div>
        <div className="space-y-2.5">
          {volunteer.map((v) => (
            <div key={v.id} className="p-3 border rounded-xl bg-white space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">{v.role || "Volunteer Activity"}</span>
                <button type="button" onClick={() => removeVolunteer(v.id)} className="text-slate-400 hover:text-rose-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input
                  placeholder="Role Title"
                  value={v.role}
                  onChange={(e) => updateVolunteer(v.id, { role: e.target.value })}
                />
                <Input
                  placeholder="Organization"
                  value={v.organization}
                  onChange={(e) => updateVolunteer(v.id, { organization: e.target.value })}
                />
              </div>
              <Input
                placeholder="Brief description of impact"
                value={v.description}
                onChange={(e) => updateVolunteer(v.id, { description: e.target.value })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
