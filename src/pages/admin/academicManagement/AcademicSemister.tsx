import { useGetAllSemisterQuery } from "../../../redux/features/admin/academicManagementApi";

const AcademicSemister = () => {
  const { data } = useGetAllSemisterQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>academic semister</h1>
    </div>
  );
};

export default AcademicSemister;
