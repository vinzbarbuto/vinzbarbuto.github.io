import type { Metadata } from "next";
import WorkspaceClient from "@/components/workspace3d/WorkspaceClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "3D Workspace Twin | Vincenzo Barbuto",
  description: "Explore the interactive 3D virtual workspace of Vincenzo Barbuto, Research Fellow in Edge AI and Digital Twins. Click objects to browse publications, projects, and career milestones.",
  openGraph: {
    title: "3D Workspace Twin | Vincenzo Barbuto",
    description: "Explore the interactive 3D virtual workspace of Vincenzo Barbuto. Click objects to browse publications, projects, and career milestones.",
    type: "website",
    url: "https://vincenzobarbuto.com/workspace",
  }
};

export default function WorkspacePage() {
  return (
    <div className={styles.workspaceWrapper}>
      <WorkspaceClient />
    </div>
  );
}
