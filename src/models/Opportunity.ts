import mongoose, { Schema, Document, Model } from "mongoose";
import {
  OPPORTUNITY_CATEGORIES,
  type OpportunityCategory,
} from "@/lib/opportunity-constants";

export { OPPORTUNITY_CATEGORIES, type OpportunityCategory };

export interface IRound {
  name: string;
  description: string;
  timeline?: string;
}

export interface IStep {
  step: number;
  title: string;
  description: string;
}

export interface ITimelinePhase {
  phase: string;
  period: string;
  description: string;
}

export interface IOpportunity extends Document {
  title: string;
  slug: string;
  category: OpportunityCategory;
  description: string;
  longDescription?: string;
  organizer?: string;
  companySlug?: string;
  companyUrl?: string;
  eligibility?: string;
  applicationUrl?: string;
  logoUrl?: string;
  opensAt?: Date;
  closesAt?: Date; // registration deadline (the countdown target)
  endsAt?: Date; // final/event end — stays visible until this date
  eventDate?: Date;
  recurringMonth?: string; // e.g. "February" for yearly programs
  statusOverride?: string; // "" = auto, else forces the status badge
  isPPIOffering: boolean;
  ppiDetails?: string;
  isDiversity: boolean;
  isFemaleOnly: boolean;
  prizes?: string;
  stipend?: string;
  rounds: IRound[];
  steps: IStep[];
  timeline: ITimelinePhase[];
  tips: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OpportunitySchema = new Schema<IOpportunity>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: OPPORTUNITY_CATEGORIES,
    },
    description: { type: String, default: "" },
    longDescription: String,
    organizer: String,
    companySlug: String,
    companyUrl: String,
    eligibility: String,
    applicationUrl: String,
    logoUrl: String,
    opensAt: Date,
    closesAt: Date,
    endsAt: Date,
    eventDate: Date,
    recurringMonth: String,
    statusOverride: { type: String, default: "" },
    isPPIOffering: { type: Boolean, default: false },
    ppiDetails: String,
    isDiversity: { type: Boolean, default: false },
    isFemaleOnly: { type: Boolean, default: false },
    prizes: String,
    stipend: String,
    rounds: [
      {
        name: String,
        description: String,
        timeline: String,
      },
    ],
    steps: [
      {
        step: Number,
        title: String,
        description: String,
      },
    ],
    timeline: [
      {
        phase: String,
        period: String,
        description: String,
      },
    ],
    tips: [String],
    tags: [String],
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Opportunity: Model<IOpportunity> =
  mongoose.models.Opportunity ||
  mongoose.model<IOpportunity>("Opportunity", OpportunitySchema);
