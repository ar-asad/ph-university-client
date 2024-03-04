import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";

import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseMangement";
import { toast } from "sonner";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  console.log(courses);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    // const courseData = {
    //   ...data,
    //   code: Number(data.code),
    //   credits: Number(data.credits),
    //   isDeleted: false,
    //   preRequisiteCourses: data.preRequisiteCourses?.map((item: string) => ({
    //     course: item,
    //     isDeleted: false,
    //   })),
    // };
    console.log(courseData);

    //Send to server
    try {
      await createCourse(courseData).unwrap();
      toast.success("Course created", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message, { id: toastId });
    }
  };

  // Default form values...
  const course = {
    title: "Dom Manipulation",
    prefix: "JS",
    code: 108,
    credits: 3,

    preRequisiteCourses: [],
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit} defaultValues={course}>
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="preRequisiteCourses"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
