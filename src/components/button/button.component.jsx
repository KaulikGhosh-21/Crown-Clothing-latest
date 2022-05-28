import "./button.styles.jsx";

import { 
    BaseButton, 
    GoogleSignInButton, 
    InvertedButton, 
    SpinnerButton 
} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButtonToRender = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]
)

// const getButtonToRender = (buttonType) => {
//         switch(buttonType){
//             case 'google-sign-in': 
//                 return GoogleSignInButton;
//             case 'inverted':
//                 return InvertedButton;
//             default:
//                 return BaseButton;
//         }

// }

const Button = ({children, isLoading, buttonType, ...otherProps}) => {

    const CustomButton = getButtonToRender(buttonType);

    return(
        <CustomButton
            {...otherProps}
        >

            {isLoading ? <SpinnerButton /> : children}

        </CustomButton>
    )
};

export default Button;
