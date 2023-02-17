import fs from "fs";
import { resolve, join } from "path";

export interface Project {
  dirent: fs.Dirent;
  path: string;
  name: string;
}

export function listWorkingDirectory(workingdir: string): Project[] {
  const workingdirContents = fs.readdirSync(resolve(workingdir), { withFileTypes: true });
  const workingdirDirectories = workingdirContents.filter((project) => project.isDirectory());
  return workingdirDirectories.map((project) => {
    return {
      dirent: project,
      path: join(workingdir, project.name),
      name: project.name,
    };
  });
}
