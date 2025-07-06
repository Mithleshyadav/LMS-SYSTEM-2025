import {Label} from "../ui/label"
import {Input} from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

function FormControls({formControls =[], formData, setFormData}) {

  function renderComponentByType(getControlItem){
      let element = null;
    const currentControlItemValue = formData[getControlItem.name] || "";  
    switch (getControlItem.componentType){
         case "input":
            element = (
            <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            />
          );
          break;
        //  case "select":
        //     element = <Select/>
        //   break;
        //  case "textarea":
        //     element = <Textarea/>
        //   break;

          default:
             element = (
            <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            />
          );
            break;
    }
    return element;
  }

  return (
    <div className="flex flex-col gap-3" >
      {
        formControls.map(controlItem =>
          <div key={controlItem.name}>
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
            {renderComponentByType(controlItem)}
          </div>
        )
      }
    </div>
  )
}

export default FormControls;