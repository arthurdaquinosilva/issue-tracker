"use client";
import { issueSchema } from "@/app/validationSchemas";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import z from "zod";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
