import { notFound } from "next/navigation";
import StudyMaterialPage, { semesterCatalog } from "@/components/studyMaterialPage";

export function generateStaticParams() {
  return semesterCatalog.map((item) => ({ semester: item.slug }));
}

export default function SemesterRoute({ params }) {
  const semester = semesterCatalog.find((item) => item.slug === params.semester);

  if (!semester) {
    notFound();
  }

  return <StudyMaterialPage semester={semester} />;
}
