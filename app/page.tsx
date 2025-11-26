import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";

export default async function Home() {
  const openIssuesCount = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  const inProgressIssuesCount = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });

  const closedIssuesCount = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  return (
    <IssueSummary
      open={openIssuesCount}
      inProgress={inProgressIssuesCount}
      closed={closedIssuesCount}
    />
  );
}
