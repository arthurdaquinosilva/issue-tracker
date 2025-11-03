import { issueSchema } from "@/app/validationSchemas";
import { HTTP_STATUS } from "@/app/lib/http-status";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: HTTP_STATUS.BAD_REQUEST_400,
    });

  const createdIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(createdIssue, { status: HTTP_STATUS.CREATED_201 });
}
