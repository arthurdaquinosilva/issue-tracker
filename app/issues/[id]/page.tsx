import AssigneeSelect from "@/app/api/issues/[id]/AssigneeSelect";
import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({
    where: {
      id: parseInt(issueId),
    },
  }),
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(id);

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
