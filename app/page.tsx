import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

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

  const issuesCountInfo = {
    open: openIssuesCount,
    inProgress: inProgressIssuesCount,
    closed: closedIssuesCount,
  };

  return (
    <Grid
      columns={{
        initial: "1",
        md: "2",
      }}
      gap="5"
    >
      <Flex direction="column" gap="5">
        <IssueSummary {...issuesCountInfo} />
        <IssueChart {...issuesCountInfo} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
