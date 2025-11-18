import authOptions from "@/app/auth/authOptions";
import { HTTP_STATUS } from "@/app/lib/http-status";
import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      { message: "Not authorized to create an Issue" },
      { status: HTTP_STATUS.UNAUTHORIZED_401 },
    );

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
