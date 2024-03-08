import { useState } from "react";
import FormPersonalData from "./FormPersonalData";
import FormAbout from "./FormAbout";
import FormStudies from "./FormStudies";
import FormWorkExperience from "./FormWorkExperience";
import { Form, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import FormLanguages from "./FormLanguages";
import FormReferences from "./FormReferences";

const TalentForm = () => {
  const [currentStep, setCurrentStep] = useState(6);
  // const [formData, setFormData] = useState(null);
  const onFinish = () => {
    // setFormData((prevFormData) => ({ ...prevFormData, ...values }));
    console.log("submnit", form.getFieldsValue(true));
  };

  const [form] = Form.useForm();

  form.setFieldValue("jobExperience", [
    { company: "roostrap" },
    { company: "howdy" },
  ]);

  const onNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (err) {
      return;
    }
    // setFormData((prevFormData) => ({ ...prevFormData, ...values }));
  };

  const onPrevious = () => setCurrentStep(currentStep - 1);

  return (
    <>
      <Form
        form={form}
        name="registerTalent"
        scrollToFirstError
        onFinish={onFinish}
      >
        {currentStep === 1 && <FormPersonalData />}
        {currentStep === 2 && <FormAbout />}
        {currentStep === 3 && <FormStudies />}
        {currentStep === 4 && <FormWorkExperience />}
        {currentStep === 5 && <FormLanguages />}
        {currentStep === 6 && <FormReferences />}
        <FormItem className="md:col-span-2 xl:col-span-4 flex justify-end">
          {currentStep > 1 && (
            <Button type="primary" onClick={onPrevious}>
              Back
            </Button>
          )}
          {currentStep < 6 && (
            <Button type="primary" onClick={onNext} className=" ml-1">
              Next
            </Button>
          )}
          {currentStep === 6 && (
            <Button type="primary" htmlType="submit" className="ml-1">
              Submit
            </Button>
          )}
        </FormItem>
      </Form>
    </>
  );
};
export default TalentForm;
