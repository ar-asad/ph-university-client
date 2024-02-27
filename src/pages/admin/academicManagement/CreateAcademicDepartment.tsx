import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PHSelect from "../../../components/form/PHSelect";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";

import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const { data } = useGetAllAcademicFacultyQuery(undefined);
  const [AddAcademicDepartment] = useAddAcademicDepartmentMutation();

  const academicFacultyOptions = data?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await AddAcademicDepartment(data).unwrap();
      toast.success("AcademicDepertment created");
      console.log(res);
    } catch (err: any) {
      toast.error(err.data.errorSources[0]?.message);
      // console.log(err);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}>
          <PHInput type="text" name="name" label="AcademicDepartment" />
          <PHSelect
            label="AcademicFaculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
