import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statusSearchParam = searchParams.status;
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(statusSearchParam)
    ? statusSearchParam
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy || undefined]: "asc",
      }
    : undefined;

  const currentPage = parseInt(searchParams.page) || 1;
  const previousPage = currentPage - 1;
  const itemsToShown = 5;
  const itemsToSkip = previousPage * itemsToShown;

  const where = { status: validStatus };
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: itemsToSkip,
    take: itemsToShown,
  });

  const totalRecordOfIssues = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="center">
        <Pagination
          pageSize={itemsToShown}
          currentPage={currentPage}
          itemCount={totalRecordOfIssues}
        />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
