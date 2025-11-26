import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: {
    label: string;
    count: number;
    type: Status;
  }[] = [
    { label: "Open Issues", count: open, type: "OPEN" },
    { label: "In-progress Issues", count: inProgress, type: "IN_PROGRESS" },
    { label: "Closed Issues", count: closed, type: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction="column" gap="2">
            <Link
              href={`/issues/list?status=${status.type}`}
              className="text-sm font-medium"
            >
              {status.label}
            </Link>
            <Text size="5" className="font-bold">
              {status.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
