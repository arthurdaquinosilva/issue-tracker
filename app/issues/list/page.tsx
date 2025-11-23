import { IssueStatusBadge, Link } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface Params {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Params) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statusParam = searchParams.status;
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(statusParam) ? statusParam : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
  });

  return (
    <div>
      <IssueActions />
      {issues.length > 0 && (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value}>
                  <Flex align="center" gap="1">
                    <NextLink
                      href={{
                        query: { ...searchParams, orderBy: column.value },
                      }}
                    >
                      {column.label}
                    </NextLink>
                    {column.value === searchParams.orderBy ? (
                      <ArrowUpIcon />
                    ) : (
                      <ArrowDownIcon />
                    )}
                  </Flex>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="md:hidden">
                    <span className="font-bold">Status: </span>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
