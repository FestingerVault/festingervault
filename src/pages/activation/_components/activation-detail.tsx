import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import useApiMutation from "@/hooks/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import { __ } from "@wordpress/i18n";
import { Globe, Loader } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";
export type ClientLicenseType = {
  plan_type: string;
  expires: number;
  status: string;
  product?: ClientProductType;
};
export type ClientProductType = {
  title: string;
};
export type ActivationDetailItemType = {
  activation_key: string;
  domain: string;
  created: number;
  expires: number;
  status: "active" | "inactive" | "expired";
  plan_type: string;
  plan_title: string;
  total_limit: number;
  today_limit: number;
  today_limit_used: number;
};

type Props = {
  item: ActivationDetailItemType;
};
export function ActivationDetailItemSkeleton() {
  return (
    <Card>
      <CardContent className="mt-4 space-y-2 pb-0">
        <Skeleton className=" h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}
export default function ActivationDetailItem({ item }: Props) {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useApiMutation("license/deactivate");
  async function onSubmit() {
    try {
      await mutateAsync({});
      toast.success(__("License Deactivated Successfully"));
      queryClient.invalidateQueries({ queryKey: ["license/detail"] });
    } catch (error) {
      toast.error(
        (error as { message?: string })?.message ??
          __("Error Deactivating License"),
      );
    }
  }
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium uppercase">
          {item.plan_type}
        </CardTitle>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-xl font-bold">{item.plan_title}</div>
        <div className="flex flex-row gap-1 text-xs text-muted-foreground">
          <span>{__("Expires:")}</span>
          <span>
            {item.expires > 0
              ? moment.unix(item.expires).fromNow()
              : "LIFETIME"}
          </span>
        </div>
        <div className="flex flex-row gap-1 text-xs text-muted-foreground">
          <span>{__("Status:")}</span>
          <span>{item.status}</span>
        </div>
        <div className="flex flex-row gap-1 text-xs text-muted-foreground">
          <span>{__("Install ID:")}</span>
          <span>{item.activation_key}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              disabled={isPending}
              className="flex-rowgap-2 flex"
            >
              {__("Deactivate")}
              {isPending ? <Loader className="h-4 w-4 animate-spin" /> : null}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="text-center">
                <DrawerTitle className="text-center">
                  {__("Are you absolutely sure?")}
                </DrawerTitle>
                <DrawerDescription className="text-center">
                  {__("Do you want to deactivate license activation")}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <div className="flex flex-row justify-center gap-4">
                  <Button
                    onClick={onSubmit}
                    variant="destructive"
                    disabled={isPending}
                    className="flex flex-row gap-2"
                  >
                    {__("Deactivate")}
                    {isPending ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : null}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">{__("Cancel")}</Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
}