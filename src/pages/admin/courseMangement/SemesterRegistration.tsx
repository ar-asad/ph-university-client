import { Button, Col, Flex } from "antd";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHForm";
import { useGetAllSemisterQuery } from "../../../redux/features/admin/academicManagementApi";
import { semesterStatusOptions } from "../../../constants/semester";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseMangement";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemisterQuery(undefined);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    console.log(data);
    const semesterData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);
    // Send Data to server and handle errors
    try {
      await addSemester(semesterData).unwrap();
      toast.success("Created", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message, { id: toastId });
    }
  };

  const defaultValues = {
    academicSemester: "65b0104110b74fcbd7a25d92",
    status: "ENDED",
    // startDate: "2025-01-10T04:00:01Z",
    // endDate: "2025-04-24T17:59:59Z",
    minCredit: 6,
    maxCredit: 16,
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
