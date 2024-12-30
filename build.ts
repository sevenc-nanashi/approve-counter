import * as tsdown from "tsdown";

tsdown.build({
  entry: "src/index.ts",
  outDir: "dist",
});
