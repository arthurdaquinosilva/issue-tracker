import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";

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
    <IssueChart
      open={openIssuesCount}
      inProgress={inProgressIssuesCount}
      closed={closedIssuesCount}
    />
  );
}
