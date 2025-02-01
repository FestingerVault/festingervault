import { config } from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import deepmerge from "deepmerge";
config();
const composerContent = JSON.parse(readFileSync("./composer.json"));

const updateComposer = () => {
  try {
    const newContent = deepmerge(
      deepmerge(composerContent, {
        autoload: {
          "psr-4": null,
        },
      }),
      {
        config: {
          "vendor-dir": "includes/lib",
        },
        autoload: {
          "psr-4": {
            [`${process.env.NAMESPACE}\\`]: "includes/src/",
          },
        },
      },
    );
    writeFileSync(
      "./composer.json",
      JSON.stringify(newContent, null, 4),
      "utf8",
    );
  } catch (e) {
    console.log(e);
  }
};

updateComposer();
