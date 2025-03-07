import { build as TsupBuild } from "tsup";
import { readdir } from "fs/promises"
import { join } from "path"
import { cwd } from "process"

const build = async () => {
  const src = join(cwd(), "src")
  const dist = join(cwd(), "dist")

  const all = await readdir(src, { withFileTypes: true });

  const dirs = all
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const dir of dirs) {
    const cleaned = join("src", dir, "index.ts").split("\\").join("/")

    await TsupBuild({
      entry: [ cleaned ],
      dts: { only: true },
      outDir: join(dist, dir)
    })
  }
}

await build();