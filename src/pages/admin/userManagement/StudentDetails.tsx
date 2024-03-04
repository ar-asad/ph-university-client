import { useParams } from "react-router-dom";

function StudentDetails() {
  const { studentId } = useParams();

  return <div>StudentDetails {studentId} </div>;
}

export default StudentDetails;
