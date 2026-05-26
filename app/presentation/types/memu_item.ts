export type MenuItem = {
  type: "file" | "directory";
  id: string;
  name: string;
  path: string;
};
