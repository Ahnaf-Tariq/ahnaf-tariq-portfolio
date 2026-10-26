import type { Metadata } from "next";
import { WORK_PROJECTS } from "@/data/data";
import WorkGallery from "@/components/work-gallery";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "A selection of web experiences and digital products built by Ahnaf Tariq.",
};

export default function WorksPage() {
  return <WorkGallery projects={WORK_PROJECTS} />;
}
