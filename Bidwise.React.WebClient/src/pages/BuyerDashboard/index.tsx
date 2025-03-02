import { NoDataYet } from "@/components/NoDataYet";
import { SomethingWentWrongAlert } from "@/components/SomethingWentWrongAlert";
import { TimeLeft } from "@/components/TimeLeft";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { SkeletonText } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useBuyAuctions } from "@/hooks/queries/useBuyAuctions";
import {
  Badge,
  Box,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  Separator,
  Status,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { LuTable, LuList } from "react-icons/lu";
import { RiAuctionLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BuyerDashboardPage = () => {
  const [filterValue, setFilterValue] = useState("All");

  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useBuyAuctions(userId);

  const filteredData = useMemo(() => {
    if (Array.isArray(data)) {
      if (filterValue === "All") {
        return data;
      } else if (filterValue === "Running") {
        return data.filter((d) => d.item.status === "Available");
      } else if (filterValue === "Ended") {
        return data.filter((d) => ["Sold", "Expired"].includes(d.item.status));
      } else {
        return [];
      }
    }

    return [];
  }, [data, filterValue]);

  return (
    <Box maxW="8xl" mx="auto">
      <Flex justifyContent="space-between" alignItems="center" py={5}>
        <Heading>My Bids</Heading>
        <SegmentedControl
          defaultValue="All"
          onValueChange={(e) => setFilterValue(e.value)}
          items={[
            {
              value: "All",
              label: "All",
            },
            {
              value: "Running",
              label: (
                <HStack>
                  <FaRegClock />
                  Running
                </HStack>
              ),
            },
            {
              value: "Ended",
              label: (
                <HStack>
                  <RiAuctionLine />
                  Ended
                </HStack>
              ),
            },
          ]}
        />
      </Flex>
      <Separator />
      <Box py={5}>
        {isLoading ? (
          <SkeletonText noOfLines={4} gap="4" />
        ) : isError ? (
          <SomethingWentWrongAlert />
        ) : (
          Array.isArray(data) &&
          (data.length > 0 ? (
            <>
              <Table.ScrollArea
                borderWidth="1px"
                rounded="md"
                maxHeight="calc(100vh - (65px + 120px + 48px + 16px))"
              >
                <Table.Root stickyHeader interactive>
                  <Table.Header>
                    <Table.Row bg="bg.subtle">
                      <Table.ColumnHeader>Item</Table.ColumnHeader>
                      <Table.ColumnHeader>Result</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Bid Amount
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Current Highest Bid
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {filteredData.map((myBid) => (
                      <Table.Row
                        key={myBid.id}
                        cursor="pointer"
                        onClick={() => navigate(`/auctions/${myBid.item.id}`)}
                      >
                        <Table.Cell>{myBid.item.name}</Table.Cell>
                        <Table.Cell>
                          {!!myBid.item.buyerId ? (
                            myBid.item.buyerId === userId ? (
                              <Status.Root colorPalette="green">
                                <Status.Indicator />
                                Won for{" "}
                                <FormatNumber
                                  value={myBid.item.buyerPayAmount!}
                                  style="currency"
                                  currency="USD"
                                  maximumFractionDigits={0}
                                />
                              </Status.Root>
                            ) : (
                              <Status.Root colorPalette="red">
                                <Status.Indicator />
                                Lose
                              </Status.Root>
                            )
                          ) : dayjs(myBid.item.endDate).diff(
                              dayjs(),
                              "second"
                            ) > 0 ? (
                            <VStack alignItems="start" gap={0}>
                              <Status.Root colorPalette="blue">
                                <Status.Indicator />
                                Running -{" "}
                                {(myBid.item.currentHighestBid || 0) >
                                myBid.amount
                                  ? "Outbidded"
                                  : "Leading"}
                              </Status.Root>
                              <Text color="fg.muted">
                                Ends in{" "}
                                <TimeLeft endDate={myBid.item.endDate} />
                              </Text>
                            </VStack>
                          ) : (
                            "-"
                          )}
                        </Table.Cell>
                        <Table.Cell
                          textAlign="end"
                          pr={8}
                          color={
                            (myBid.item.currentHighestBid || 0) > myBid.amount
                              ? "fg.error"
                              : ""
                          }
                        >
                          <FormatNumber
                            value={myBid.amount}
                            style="currency"
                            currency="USD"
                            maximumFractionDigits={0}
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="end" pr={8}>
                          <FormatNumber
                            value={myBid.item.currentHighestBid || 0}
                            style="currency"
                            currency="USD"
                            maximumFractionDigits={0}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </>
          ) : (
            <NoDataYet
              type="results"
              suggestions={[
                "Try removing filters",
                "Try different keywords",
                "Try different auction types",
              ]}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default BuyerDashboardPage;
