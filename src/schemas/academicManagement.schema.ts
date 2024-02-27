import { z } from "zod";

export const academicSemesterSchema = z.object({
  code: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Year" }),
  startMonth: z.string({ required_error: "Please select a Start Month" }),
  endMonth: z.string({ required_error: "Please select a End Month" }),
});
export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Name is Required" }),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Name is Required" }),
  academicFaculty: z.string({
    required_error: "Please select a AcademicFaculty",
  }),
});
