import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TPHSingleFileSelectProps = {
  name: string;
  label: string;
};

function PHSingleFileSelect({ name, label }: TPHSingleFileSelectProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <Form.Item label={label}>
            <Input
              type="file"
              value={value?.fileName}
              {...field}
              onChange={(e) => onChange(e.target.files?.[0])}
            />
          </Form.Item>
        )}
      />
    </div>
  );
}

export default PHSingleFileSelect;
