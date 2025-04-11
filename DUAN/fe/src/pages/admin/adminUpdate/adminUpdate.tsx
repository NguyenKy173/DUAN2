import { Button, Form, Input, InputNumber, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useOne, useUpdate } from "../../../hooks";
import { useListCategories } from "../../../hooks/categoriesHooks";

const AdminUpdate = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL

  const { data: categories } = useListCategories({ resource: "categories" });
  const { data: product, isLoading } = useOne({ resource: "products", id });
  const updateMutation = useUpdate({ resource: "products" });

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        description: product.description,
        categoryId: product.categoryId,
        image: product.image,
      });
    }
  }, [product, form]);

  const onFinish = (values: any) => {
    const updatedValues = {
      ...values,
      price: Number(values.price),
      categoryId: Number(values.categoryId),
    };

    updateMutation.mutate(
      {resource: "products", id: Number(id), values: updatedValues },
      {
        onSuccess: () => {
          alert("Cập nhật thành công!");
          nav("/admin/adminList");
        },
      }
    );
  };

  if (isLoading) return <p>Đang tải...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 30 }}>
      <h2>Cập nhật sản phẩm</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price" rules={[{ required: true, type: "number", min: 0 }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Danh mục" name="categoryId" rules={[{ required: true }]}>
          <Select placeholder="Chọn danh mục">
            {categories?.map((cate: any) => (
              <Select.Option key={cate.id} value={cate.id}>
                {cate.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Hình ảnh" name="image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default AdminUpdate;
