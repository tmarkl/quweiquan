"use client";

import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../constants";
import { getIsMobile, getNameOptions, getNames } from "../utils";
import { Button, Card, Col, Form, Input, Radio, Row } from "antd";

export type DataType = {
  title: string;
  author: string;
  book: string;
  dynasty: string;
  content: string;
  name: string;
  sentence: string;
  sentenceHtml: string;
};

export default function Name() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("取名");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(!!getIsMobile());
  }, []);

  const [data, setData] = useState<DataType[]>([]);
  const [currentName, setCurrentName] = useState("");

  const loadBook = (type: string) => {
    setLoading(true);
    const url = `/json/${type}.json`;
    fetch(url)
      .then((res) => res.json())
      .then((r) => {
        const names = [];
        for (let i = 0; i < PAGE_SIZE; i++) {
          const name = getNames(r);

          if (name) {
            const sentenceHtml = name.sentence.replace(
              new RegExp(`[${name}]`, "ig"),
              (char: string) => `<i>${char}</i>`
            );
            names.push({ ...name, sentenceHtml });
          }
        }
        setData(names);
        setLoading(false);
        setButtonText("换一批");
      });
  };

  const submit = async () => {
    const { type } = await form.validateFields();
    loadBook(type);
  };

  return (
    <div
      className="min-h-screen  pt-[20px] "
      style={{
        background:
          "linear-gradient(334deg, #46a0ff, #a1abe0, #d5b7c0, #ffc49f)",
      }}
    >
      <div className="flex flex-col justify-center items-center max-w-custom mx-auto p-4">
        <div className="flex flex-col justify-center items-center w-full sm:w-[600px]">
          <Form
            form={form}
            initialValues={{ type: "shijing" }}
            onValuesChange={() => {
              setButtonText("取名");
            }}
          >
            <Form.Item name="type" className="w-[300px] sm:w-[512px]">
              <Radio.Group
                optionType={!isMobile ? "button" : "default"}
                buttonStyle="solid"
                options={getNameOptions}
              />
            </Form.Item>
            <Form.Item
              name="firstName"
              className="w-[300px] sm:w-[512px]"
              rules={[{ message: "请先输入您的姓氏", required: true }]}
            >
              <Input
                size="large"
                placeholder="请输入您的姓氏,如：张"
                onBlur={(e) => {
                  setCurrentName(e.target.value);
                }}
              />
            </Form.Item>
            <Button
              size="large"
              type="primary"
              className="w-[300px] sm:w-[512px]"
              onClick={submit}
              loading={loading}
            >
              {buttonText}
            </Button>
          </Form>
        </div>

        <Row gutter={[16, 16]} className="w-full mt-[80px]">
          {data.map((item) => (
            <Col span={isMobile ? 24 : 8} key={item.name}>
              <Card
                hoverable
                style={{
                  background:
                    "linear-gradient(25deg, #46a0ff, #a1abe0, #d5b7c0, #ffc49f)",
                }}
              >
                <div className="flex text-[30px] font-bold justify-center text-white">
                  {currentName}
                  {item.name}
                </div>
                <div className="m mt-[20px] text-[16px]  text-white">
                  <span>「</span>
                  {item.sentenceHtml}
                  <span>」</span>
                </div>
                <div className="flex justify-between mt-4  text-white">
                  <div>
                    {item.book}&nbsp;•&nbsp;{item.title}
                  </div>
                  <div>
                    [{item.dynasty}]&nbsp;{item.author || "佚名"}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
