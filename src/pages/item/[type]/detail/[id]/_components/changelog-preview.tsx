import InstallButton from "@/components/install-button";
import SimpleTable, { SimpleColumnDef } from "@/components/table/simple-table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useApiFetch from "@/hooks/useApiFetch";
import { Link, useParams } from "@/router";
import {
  PostChangelogCollectionResponse,
  PostItemType,
  PostMediaType,
} from "@/types/item";
import moment from "moment";
import { useMemo } from "react";

type Props = {
  item: PostItemType;
};
export default function ChangelogPreview({ item }: Props) {
  const params = useParams("/item/:type/detail/:id/:tab?");
  const { data, isError, isLoading, isFetching } =
    useApiFetch<PostChangelogCollectionResponse>("item/changelog", {
      item_id: params.id,
    });
  const columns = useMemo<SimpleColumnDef<PostMediaType>[]>(
    () => [
      {
        id: "version",
        label: "Version",
        className: "",
        render({ row }) {
          return row.version;
        },
      },
      {
        id: "date",
        label: "Date",
        className: "whitespace-nowrap text-muted-foreground",
        render({ row }) {
          return moment.unix(row.updated).format("D MMM, YYYY");
        },
      },
      {
        id: "action",
        label: "",
        className: "",
        render({ row }) {
          return (
            <InstallButton
              item={item}
              media={row}
              size="icon"
              variant="outline"
            />
          );
        },
      },
    ],
    [item],
  );
  return (
    <div className="flex flex-col gap-5 sm:gap-7">
      <Card>
        <CardHeader className="border-b p-5 sm:p-7">Changelog</CardHeader>
        <CardContent className="p-5 text-sm sm:p-7">
          {data?.data ? (
            <div className="flex flex-col gap-4">
              <SimpleTable columns={columns} data={data?.data.slice(0, 5)} />
            </div>
          ) : isLoading || isFetching ? (
            <div className="">Loading...</div>
          ) : (
            <div className="">No Items Found</div>
          )}
        </CardContent>
        <CardFooter className="justify-center border-t border-border text-center">
          <Link
            to="/item/:type/detail/:id/:tab?"
            params={{ ...params, tab: "changelog" }}
            className="border-b border-dashed border-blue-500 text-sm text-blue-500"
          >
            View More
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}