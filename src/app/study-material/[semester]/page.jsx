import { notFound } from "next/navigation";
import StudyMaterialPage, { semesterCatalog } from "@/components/studyMaterialPage";

export function generateStaticParams() {
  return semesterCatalog.map((item) => ({ semester: item.slug }));
}

export default async function SemesterRoute({ params }) {
  const { semester: semesterSlug } = await params;
  const semester = semesterCatalog.find((item) => item.slug === semesterSlug);

  if (!semester) {
    notFound();
  }

  return <StudyMaterialPage semester={semester} />;
}
