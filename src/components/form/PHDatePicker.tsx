import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field: { onChange } }) => (
          <Form.Item label={label}>
            <DatePicker
              onChange={(_, dateString) => onChange(dateString)}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
