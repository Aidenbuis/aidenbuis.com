export interface FileProps {
  name: string;
  type: "file";
  content: "";
}

export type FilePropsOrFolderProps = FileProps | FolderProps;

export interface FolderProps {
  name: string;
  type: "folder";
  content: FilePropsOrFolderProps[];
  open?: boolean;
}

const innerWorkingsDirectoryData: FilePropsOrFolderProps[] = [
  {
    name: ".git",
    open: true,
    type: "folder",
    content: [
      { name: "hooks", type: "folder", open: true, content: [] },
      { name: "info", type: "folder", open: true, content: [] },
      {
        name: "objects",
        type: "folder",
        open: true,
        content: [
          { name: "info", type: "folder", open: true, content: [] },
          { name: "pack", type: "folder", open: true, content: [] },
        ],
      },
      {
        name: "refs",
        type: "folder",
        open: true,
        content: [
          { name: "heads", type: "folder", open: true, content: [] },
          { name: "tags", type: "folder", open: true, content: [] },
        ],
      },
      { name: "config", type: "file", content: "" },
      { name: "description", type: "file", content: "" },
      { name: "HEAD", type: "file", content: "" },
      { name: "index", type: "file", content: "" },
    ],
  },
];

export default innerWorkingsDirectoryData;
