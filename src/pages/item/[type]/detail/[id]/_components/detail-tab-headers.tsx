import { Button } from "@/components/ui/button";
import useInstall from "@/hooks/useInstall";
import { Link, useParams } from "@/router";
import { PostItemType } from "@/types/item";
import cn from "@/utils/cn";
import { __ } from "@wordpress/i18n";
import { EllipsisVertical, ExternalLink, Heart } from "lucide-react";
import { DetailTabType } from "../-[tab]";
import { Slot } from "@radix-ui/react-slot";

type Props = {
  item: PostItemType;
  tabs: DetailTabType;
};
export default function DetailTabHeaders({ item, tabs }: Props) {
  const params = useParams("/item/:type/detail/:id/:tab?");
  const { InstallButton } = useInstall(item);
	const active=tabs.find(tab=>tab.id===params.tab)?.id??"description";
  return (
    <div className="flex flex-row items-center justify-between border-b-2 border-b-card">
      <div className="flex flex-row">
        {tabs.map(({ id, label, external }) => (
          <Slot
            key={id}
            className={cn(
              "rounded-none border-b-2 border-transparent px-6 py-4 text-sm transition-colors hover:border-b-blue-600",
              id === active && "border-b-blue-800",
            )}
          >
            {external ? (
              <a href={external} target="_blank">
                {__("Support")}
              </a>
            ) : (
              <Link
                to="/item/:type/detail/:id/:tab?"
                params={{
                  ...params,
                  tab: id,
                }}
              >
                {label}
              </Link>
            )}
          </Slot>
        ))}
      </div>
      <div className="flex flex-row gap-4">
        <InstallButton />
        {item.preview && (
          <Button asChild className="flex gap-2" variant="outline" size="sm">
            <a href={item.preview} target="_blank" referrerPolicy="no-referrer">
              <span>{__("Live Preview")}</span>
              <ExternalLink size={16} />
            </a>
          </Button>
        )}
        <Button size="icon" variant="outline">
          <Heart size={16} />
        </Button>
        <Button size="icon" variant="outline">
          <EllipsisVertical size={16} />
        </Button>
      </div>
    </div>
  );
}