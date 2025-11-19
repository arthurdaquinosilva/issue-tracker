import { HTTP_STATUS } from "@/app/lib/http-status";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(users, { status: HTTP_STATUS.OK_200 });
}
