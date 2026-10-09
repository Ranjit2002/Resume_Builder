"use client";

import React from "react";
import { CertificationItem } from "@/lib/types/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Award } from "lucide-react";

interface CertificationsFormProps {
  certifications: CertificationItem[];
  onChange: (updated: CertificationItem[]) => void;
}

export function CertificationsForm({
  certifications,
  onChange,
}: CertificationsFormProps) {
  const addCert = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      issueDate: "",
    };
    onChange([...certifications, newCert]);
  };

  const updateCert = (id: string, updates: Partial<CertificationItem>) => {
    onChange(
      certifications.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const removeCert = (id: string) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Certifications & Licenses</h3>
          <p className="text-xs text-slate-500">
            Validated credentials like AWS, Meta, Scrum, Google Cloud, etc.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addCert}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No certifications added</p>
          <Button size="sm" onClick={addCert} className="mt-3" leftIcon={<Plus className="w-4 h-4" />}>
            Add Certification
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">
                  {c.name || "Untitled Credential"}
                </span>
                <button
                  type="button"
                  onClick={() => removeCert(c.id)}
                  className="p-1 text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Certification Name"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={c.name}
                  onChange={(e) => updateCert(c.id, { name: e.target.value })}
                />
                <Input
                  label="Issuing Organization"
                  placeholder="e.g. Amazon Web Services"
                  value={c.issuer}
                  onChange={(e) => updateCert(c.id, { issuer: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Issue Date"
                  placeholder="YYYY-MM (e.g. 2023-04)"
                  value={c.issueDate}
                  onChange={(e) => updateCert(c.id, { issueDate: e.target.value })}
                />
                <Input
                  label="Verification Link (Optional)"
                  placeholder="https://..."
                  value={c.credentialUrl || ""}
                  onChange={(e) => updateCert(c.id, { credentialUrl: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
