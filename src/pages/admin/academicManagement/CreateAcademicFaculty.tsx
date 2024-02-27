import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagementApi";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addAcademicFaculty(data).unwrap();
      toast.success("AcademicFaculty created");
      console.log(res);
    } catch (err: any) {
      console.log(err);
      // console.log(err?.data?.errorSources[0]?.message);
      toast.error(err.data.errorSources[0]?.message);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}>
          <PHInput type="text" name="name" label="AcademicFaculty" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
