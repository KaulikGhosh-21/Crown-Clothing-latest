import "./form-input.styles.jsx";
import { Group, FormInputStyle, FormInputLabel } from "./form-input.styles.jsx";

const FormInput = ({label, ...inputProps}) => {

    return(
        <Group>
                <FormInputStyle
                    {...inputProps}
                />
                <FormInputLabel shrink={inputProps.value.length}
                >
                    {label}:
                </FormInputLabel>
        </Group>
    )
};

export default FormInput;