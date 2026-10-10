"use client";

import React from "react";
import { PersonalInfo } from "@/lib/types/resume";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { User, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Alex Rivera"
          value={data.fullName || ""}
          onChange={(e) => updateField("fullName", e.target.value)}
          leftIcon={<User className="w-4 h-4" />}
        />
        <Input
          label="Target Job Title *"
          placeholder="e.g. Senior Full Stack Engineer"
          value={data.jobTitle || ""}
          onChange={(e) => updateField("jobTitle", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Email Address *"
          type="email"
          placeholder="alex@example.com"
          value={data.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
        />
        <Input
          label="Phone Number *"
          placeholder="+91 98765 43210"
          value={data.phone || ""}
          onChange={(e) => updateField("phone", e.target.value)}
          leftIcon={<Phone className="w-4 h-4" />}
        />
        <Input
          label="Location (City, State / Remote)"
          placeholder="Bengaluru, Karnataka / Mumbai / Remote"
          value={data.location || ""}
          onChange={(e) => updateField("location", e.target.value)}
          leftIcon={<MapPin className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/in/username"
          value={data.linkedin || ""}
          onChange={(e) => updateField("linkedin", e.target.value)}
          leftIcon={<Linkedin className="w-4 h-4" />}
        />
        <Input
          label="GitHub Profile"
          placeholder="https://github.com/username"
          value={data.github || ""}
          onChange={(e) => updateField("github", e.target.value)}
          leftIcon={<Github className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        <Input
          label="Portfolio / Website URL"
          placeholder="https://myportfolio.com"
          value={data.website || ""}
          onChange={(e) => updateField("website", e.target.value)}
          leftIcon={<Globe className="w-4 h-4" />}
          helperText="Optional link to your portfolio or personal blog"
        />
        <ImageUpload
          label="Profile Photo (Optional)"
          value={data.photoUrl || ""}
          onChange={(url) => updateField("photoUrl", url)}
          placeholderUrl="https://example.com/avatar.jpg"
          helperText="Upload from your PC/mobile or enter a direct image URL"
        />
      </div>
    </div>
  );
}
