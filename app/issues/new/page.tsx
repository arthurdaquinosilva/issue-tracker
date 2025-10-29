"use client";
import { createIssueSchema } from "@/app/validationSchemas";
import "easymde/dist/easymde.min.css";
import z from "zod";
import IssueForm from "../_components/IssueForm";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
