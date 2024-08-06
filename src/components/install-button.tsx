import { PostItemType, PostMediaType } from "@/types/item";
import { Button, ButtonProps } from "@/components/ui/button";
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
import { useQueryClient } from "@tanstack/react-query";
import useActivation from "@/hooks/use-activation";
import { toast } from "sonner";
import { useNavigate, useParams } from "@/router";
import { __, sprintf } from "@wordpress/i18n";
import useInstall, {
  PluginInstallResponse,
  PluginInstallSchema,
} from "@/hooks/useInstall";
import useApiMutation from "@/hooks/useApiMutation";
import { decodeEntities } from "@wordpress/html-entities";
import {
  CloudDownload,
  Download,
  DownloadCloud,
  Loader,
  Recycle,
  RefreshCw,
} from "lucide-react";
type Props = {
  item: PostItemType;
  media?: PostMediaType;
} & ButtonProps;

export default function InstallButton({ item, media, size, variant }: Props) {
  const navigate = useNavigate();
  const { data: activation } = useActivation();
  const queryClient = useQueryClient();
  const { isPending: isInstallPending, mutateAsync: installPlugin } =
    useApiMutation<PluginInstallResponse, PluginInstallSchema>("item/install");
  const { isInstalled, isNewerVersion, isInstallable, isRollBack } = useInstall(
    item,
    media,
  );
  const { tab } = useParams("/item/:type/detail/:id/:tab?");
  function install(is_download?: boolean) {
    if (typeof activation?.plan_type == "undefined") {
      toast.error(__("License not activated"));
      navigate("/activation");
      return;
    }
    toast.promise(
      installPlugin({
        item_id: item.id,
        method: is_download === true ? "download" : "install",
        media_id: media?.id,
      }),
      {
        description: decodeEntities(item.title),
        loading:
          is_download === true
            ? "Downloading"
            : isRollBack
              ? sprintf("Roll-Back to version %s", media.version)
              : isInstalled
                ? isNewerVersion
                  ? "Updating"
                  : "Re-Installing"
                : "Installing",
        success(data) {
          if (data.link && is_download === true) {
            window.open(data.link, "_blank");
          }
          queryClient.invalidateQueries({
            queryKey: ["update/list"],
          });
          queryClient.invalidateQueries({
            queryKey: ["item/detail"],
          });
          return __("Successful");
        },
        error(err) {
          return err.message;
        },
      },
    );
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className="flex items-center gap-2"
          disabled={isInstallPending}
        >
          {isInstallPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <CloudDownload width={16} />
          )}
          {size != "icon" && (
            <span>
              {isInstallable
                ? isRollBack
                  ? "Roll-Back"
                  : isInstalled
                    ? isNewerVersion
                      ? "Update"
                      : "Re-Install"
                    : "Install"
                : "Download"}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-center leading-normal">
              {decodeEntities(item.title)}
            </DrawerTitle>
            <DrawerDescription
              className="flex flex-col gap-2 text-center"
              asChild
            >
              <div>
                <div>
                  {isInstallable
                    ? isRollBack
                      ? sprintf(
                          "Roll-back to version from %s to %s",
                          isInstalled.installed_version,
                          media.version,
                        )
                      : isInstalled
                        ? isNewerVersion
                          ? sprintf(
                              "Update version from %s to %s",
                              isInstalled.installed_version,
                              isInstalled.version,
                            )
                          : sprintf(
                              __("Re-install version %s"),
                              media ? media.version : isInstalled.version,
                            )
                        : sprintf(
                            "Install version %s",
                            media ? media.version : item.version,
                          )
                    : sprintf(
                        "Download version %s",
                        media ? media.version : item.version,
                      )}
                </div>
                <div>
                  {sprintf(
                    __(
                      "%d download credit would be consumed from your account.",
                    ),
                    1,
                  )}
                </div>
                <div className="flex flex-row justify-center divide-x">
                  <div className="px-4">
                    Daily Limit: {activation?.today_limit}
                  </div>
                  <div className="px-4">
                    Used Limit: {activation?.today_limit_used}
                  </div>
                  {activation?.plan_title === "recurring" && (
                    <div className="p-4">
                      Total Limit: {activation?.total_limit}
                    </div>
                  )}
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex flex-row justify-center gap-4">
              {isInstallable && (
                <DrawerClose asChild>
                  <Button
                    onClick={() => install(false)}
                    variant="default"
                    className="gap-2"
                  >
                    <DownloadCloud size={16} />
                    <span>
                      {isRollBack
                        ? "Roll-Back"
                        : isInstalled
                          ? isNewerVersion
                            ? "Update"
                            : "Re-Install"
                          : "Install"}
                    </span>
                  </Button>
                </DrawerClose>
              )}
              <DrawerClose asChild>
                <Button
                  onClick={() => install(true)}
                  variant="outline"
                  className="gap-2"
                >
                  <Download size={16} />
                  <span>{__("Download")}</span>
                </Button>
              </DrawerClose>
              {tab !== "changelog" && (
                <DrawerClose asChild>
                  <Button
                    onClick={() =>
                      navigate("/item/:type/detail/:id/:tab?", {
                        params: {
                          type: item.type,
                          id: item.id,
                          tab: "changelog",
                        },
                      })
                    }
                    variant="outline"
                    className="gap-2"
                  >
                    <RefreshCw size={16} />
                    <span>{__("Roll-Back")}</span>
                  </Button>
                </DrawerClose>
              )}
              <DrawerClose asChild>
                <Button variant="outline">{__("Cancel")}</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}