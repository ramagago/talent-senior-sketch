import FormItem from "antd/es/form/FormItem";
import { DatePicker, Input, Select, Checkbox, Collapse } from "antd";
import dayjs from "dayjs";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { useWatch } from "antd/es/form/Form";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const OPTIONS = [
  "Javascript",
  "Python",
  "Java",
  ".Net",
  "Genexus",
  "C#",
  "C++",
  "PHP",
  "AWS",
  "Firebase",
];

const FormWorkExperience = () => {
  const form = useFormInstance();

  const currentlyWorking = useWatch("currentlyWorking", form);
  const selectedSkills = useWatch("skills", form);

  const { Panel } = Collapse;
  const workExperiences = useWatch("workExperiences", form) || [];

  const [showForm, setShowForm] = useState(true);

  const addNewWorkExperience = async () => {
    try {
      await form.validateFields();
      const {
        role,
        company,
        workField,
        positionLevel,
        peopleInCharge,
        task,
        salary,
        startWorkDate,
        currentlyWorking,
        endWorkDate,
        skills,
        workExperiences = [],
        ...rest
      } = form.getFieldsValue(true);

      form.setFieldsValue({
        workExperiences: [
          ...workExperiences,
          {
            role,
            company,
            workField,
            positionLevel,
            peopleInCharge,
            task,
            salary,
            startWorkDate,
            currentlyWorking,
            endWorkDate,
            skills,
          },
        ],
        role: undefined,
        company: undefined,
        workField: undefined,
        positionLevel: undefined,
        peopleInCharge: undefined,
        task: undefined,
        salary: undefined,
        startWorkDate: undefined,
        currentlyWorking: false,
        endWorkDate: undefined,
        skills: undefined,
        ...rest,
      });
      setShowForm(false);
    } catch {
      console.log("error en el add");
    }
  };

  const deleteWorkExperience = (workExperienceIndex) => {
    form.setFieldValue(
      "workExperiences",
      workExperiences.toSpliced(workExperienceIndex, 1)
    );
    if (workExperiences.length < 2) {
      setShowForm(true);
    }
  };

  const dateFormat = "DD-MM-YYYY";
  const { TextArea } = Input;
  const filteredOptions = OPTIONS.filter((o) => !selectedSkills?.includes(o));

  return (
    <>
      <h3 className="text-lg mb-6 font-semibold">Experiencia Laboral</h3>

      {!!workExperiences.length && (
        <Collapse>
          {workExperiences.map((workExperience, index) => (
            <Panel
              header={workExperience.company}
              key={index}
              extra={
                <button
                  className="outline-none text-lg text-gray-600 hover:text-gray-300 bg-transparent"
                  onClick={() => deleteWorkExperience(index)}
                >
                  <FaTrash />
                </button>
              }
            >
              <p>Cargo: {workExperience.role}</p>
              <p>Rubro o área: {workExperience.workField}</p>
              <p>Nivel jerárquico: {workExperience.positionLevel}</p>
              <p>Personas a cargo: {workExperience.peopleInCharge}</p>
              <p>Tareas: {workExperience.task}</p>
              <p>
                Salario nominal (en pesos uruguayos): {workExperience.salary}
              </p>
              <p>
                Fecha de inicio:{" "}
                {workExperience.startWorkDate.format("DD-MM-YYYY")}
              </p>
              {workExperience.currentlyWorking && (
                <p>Actualmente trabajando: {workExperience.currentlyWorking}</p>
              )}
              {workExperience.endWorkDate && (
                <p>
                  Fecha de finalización:{" "}
                  {workExperience.endWorkDate.format("DD-MM-YYYY")}
                </p>
              )}
              <p>Conocimientos: {workExperience.skills}</p>
            </Panel>
          ))}
        </Collapse>
      )}
      {!showForm && (
        <div className="flex justify-center m-6">
          <button
            className="text-4xl text-celeste01 bg-transparent hover:text-azul01 cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <FaCirclePlus />
          </button>
        </div>
      )}
      {showForm && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full ">
            <div className="xl:col-span-2">
              <label htmlFor="role">
                Cargo<span className="text-red-400 text-xs"> *</span>
              </label>
              <FormItem
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Este campo es requerido",
                  },
                ]}
              >
                <Input id="role" />
              </FormItem>
            </div>
            <div className="xl:col-span-2">
              <label htmlFor="company">
                Empresa<span className="text-red-400 text-xs"> *</span>
              </label>
              <FormItem
                name="company"
                rules={[
                  {
                    required: true,
                    message: "Este campo es requerido",
                  },
                ]}
              >
                <Input id="company" />
              </FormItem>
            </div>
            <div></div>
            <div>
              <label htmlFor="workField">
                Rubro o área<span className="text-red-400 text-xs"> *</span>
              </label>
              <FormItem name="workField">
                <Select
                  id="workField"
                  options={[
                    {
                      value: "backend",
                      label: "Backend",
                    },
                    {
                      value: "frontend",
                      label: "Frontend",
                    },
                    {
                      value: "devops",
                      label: "Devops",
                    },
                  ]}
                />
              </FormItem>
            </div>
            <div>
              <label htmlFor="positionLevel">
                Nivel jerárquico<span className="text-red-400 text-xs"> *</span>
              </label>
              <FormItem
                name="positionLevel"
                rules={[
                  {
                    required: true,
                    message: "Este campo es requerido",
                  },
                ]}
              >
                <Select
                  id="positionLevel"
                  options={[
                    {
                      value: "gerente",
                      label: "Gerente",
                    },
                    {
                      value: "Dueño",
                      label: "dueño",
                    },
                    {
                      value: "encargado",
                      label: "Encargado",
                    },
                  ]}
                />
              </FormItem>
            </div>
            <div>
              <label htmlFor="peopleInCharge">Personas a cargo</label>
              <FormItem name="peopleInCharge">
                <Input id="peopleInCharge" />
              </FormItem>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="task">Tareas</label>
              <FormItem name="task">
                <TextArea id="task" rows={4} />
              </FormItem>
            </div>
            <div>
              <label htmlFor="salary">
                Salario nominal (en pesos uruguayos)
              </label>
              <FormItem name="salary">
                <Input id="salary" />
              </FormItem>
            </div>
            <div className="flex items-end sm:col-span-2">
              <div>
                <label htmlFor="startWorkDate">Fecha de inicio</label>
                <FormItem
                  name="startWorkDate"
                  initialValue={dayjs("01-01-2024", dateFormat)}
                  //pongo required pero tiene fecha por defecto. Revisar y redefinir logica.
                  rules={[
                    {
                      required: true,
                      message: "Este campo es requerido",
                    },
                  ]}
                >
                  <DatePicker id="startWorkDate" />
                </FormItem>
              </div>
              <div className="flex items-baseline ml-4">
                <FormItem name="currentlyWorking" valuePropName="checked">
                  <Checkbox name="currentlyWorking">
                    Actualmetne trabajando
                  </Checkbox>
                </FormItem>
              </div>
            </div>

            <div>
              <label htmlFor="endWorkDate">Fecha de finalización</label>
              <FormItem
                name="endWorkDate"
                initialValue={dayjs("01-01-2024", dateFormat)}
                //pongo required pero tiene fecha por defecto. Revisar y redefinir logica.
                rules={[
                  {
                    required: true,
                    message: "Este campo es requerido",
                  },
                ]}
              >
                <DatePicker disabled={currentlyWorking} id="endWorkDate" />
              </FormItem>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="endWorkDate">
                Conociemientos
                <span className="text-red-400 text-xs"> *</span>
              </label>
              <FormItem
                name="skills"
                rules={[
                  {
                    required: true,
                    message: "Este campo es requerido",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Máximo 10"
                  style={{
                    width: "100%",
                  }}
                  maxCount={10}
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </FormItem>
            </div>
          </div>
          <button
            className="transition-all border border-white bg-celeste01 text-white rounded-md px-5 py-2 hover:border-celeste01 hover:bg-white hover:text-celeste01"
            onClick={addNewWorkExperience}
          >
            Agregar Trabajo
          </button>
        </>
      )}
      <div className="hidden">
        <FormItem name="workExperiences">
          {/* Evitar warning del buscador */}
          <Input />
        </FormItem>
      </div>
    </>
  );
};

export default FormWorkExperience;
