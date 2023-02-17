import { useState, useEffect } from "react";
import { ActionPanel, List, Action, Icon, getPreferenceValues, Application } from "@raycast/api";
import { listWorkingDirectory, Project } from "./getfolder";

interface Preferences {
  workingDir: string;
  defaultApplication: Application;
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const [folders, setFolders] = useState<Project[]>([]);

  useEffect(() => {
    const workingDirFolders: Project[] = listWorkingDirectory(preferences.workingDir);
    setFolders(workingDirFolders);
  }, []);

  return (
    <List filtering={true}>
      {folders.map((folder) => {
        return (
          <List.Item
            key={folder.name}
            icon={Icon.Folder}
            title={folder.name}
            actions={
              <ActionPanel>
                <Action.Open
                  title={`Open with ${preferences.defaultApplication.name}`}
                  target={folder.path}
                  application={preferences.defaultApplication}
                  shortcut={{ key: "enter", modifiers: [] }}
                />
                <Action.OpenWith path={folder.path} shortcut={{ key: "enter", modifiers: ["cmd"] }} />
              </ActionPanel>
            }
          />
        );
      })}
      <List.EmptyView title={`${preferences.workingDir} is empty!`} />
    </List>
  );
}
