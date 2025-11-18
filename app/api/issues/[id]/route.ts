import authOptions from "@/app/auth/authOptions";
import { HTTP_STATUS } from "@/app/lib/http-status";
import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      { message: "Not authorized to edit Issue" },
      { status: HTTP_STATUS.UNAUTHORIZED_401 },
    );

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: HTTP_STATUS.BAD_REQUEST_400,
    });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue)
    return NextResponse.json(
      { error: "Invalid issue" },
      { status: HTTP_STATUS.NOT_FOUND_404 },
    );

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue, { status: HTTP_STATUS.OK_200 });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      { message: "Not authorized to delete Issue" },
      { status: HTTP_STATUS.UNAUTHORIZED_401 },
    );

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Invalid Issue" },
      { status: HTTP_STATUS.NOT_FOUND_404 },
    );

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return new NextResponse(null, { status: HTTP_STATUS.NO_CONTENT_204 });
}
