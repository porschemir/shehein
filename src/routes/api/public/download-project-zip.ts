import { createFileRoute } from "@tanstack/react-router";
import { readdir, readFile } from "fs/promises";
import { join, relative } from "path";
import JSZip from "jszip";

const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  ".output",
  "build",
  ".cache",
  "coverage",
  ".turbo",
  ".next",
  ".wrangler",
]);

const EXCLUDED_FILES = new Set([
  ".env",
  ".env.local",
  ".env.development",
  ".env.production",
  ".git",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
  "tsconfig.tsbuildinfo",
]);

async function addDirectory(zip: JSZip, dirPath: string, basePath: string) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    const zipPath = relative(basePath, fullPath);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      await addDirectory(zip, fullPath, basePath);
    } else {
      if (EXCLUDED_FILES.has(entry.name)) continue;
      const content = await readFile(fullPath);
      zip.file(zipPath, content);
    }
  }
}

export const Route = createFileRoute("/api/public/download-project-zip")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const zip = new JSZip();
          const projectRoot = "/dev-server";

          await addDirectory(zip, projectRoot, projectRoot);

          const buffer = await zip.generateAsync({ type: "arraybuffer" });

          return new Response(buffer, {
            headers: {
              "Content-Type": "application/zip",
              "Content-Disposition": 'attachment; filename="shein-project.zip"',
            },
          });
        } catch (error) {
          console.error("Failed to generate project ZIP:", error);
          return new Response(
            JSON.stringify({ error: "Unable to generate project ZIP." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
