import { notFound } from "next/navigation";
import { BranchMaterialPage, semesterCatalog } from "@/components/studyMaterialPage";

export function generateStaticParams() {
  return semesterCatalog.flatMap((semester) =>
    semester.branches.map((branch) => ({
      semester: semester.slug,
      branch: branch.slug,
    }))
  );
}

export default function BranchRoute({ params }) {
  const semester = semesterCatalog.find((item) => item.slug === params.semester);

  if (!semester) {
    notFound();
  }

  const branch = semester.branches.find((item) => item.slug === params.branch);

  if (!branch) {
    notFound();
  }

  return <BranchMaterialPage semester={semester} branch={branch} />;
}
