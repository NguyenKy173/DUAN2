import { Button, Form, Input, InputNumber, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../../hooks";
import { useListCategories } from "../../../hooks/categoriesHooks";

const AdminAdd = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { data: categories } = useListCategories({ resource: "categories" });
  const createMutation = useCreate({ resource: "products" });
  const onFinish = (values: any) => {
    const newValues = {
      ...values,
      price: Number(values.price),
      categoryId: Number(values.categoryId),
    };
    createMutation.mutate({ resource: "products", values: newValues },{
      onSuccess: ()=>{
        form.resetFields();
        nav('/admin/adminList')
      }
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          marginTop: 30,
        }}
      >
        ProductAdd
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true }, { type: "number", min: 0 }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Danh mục" name="categoryId" rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}>
          <Select placeholder="Chọn danh mục">
            {categories?.map((cate:any) => (
              <Select.Option key={cate.id} value={cate.id}>
                {cate.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

          <Form.Item label="Images" name="image" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Button htmlType="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
};
export default AdminAdd;
