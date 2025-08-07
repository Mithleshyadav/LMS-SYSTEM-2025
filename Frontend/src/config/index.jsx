import { Description } from "@radix-ui/react-toast";
import { Subtitles } from "lucide-react";

export const signUpFormControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your name',
    type: 'text',
    componentType: 'input'
  },
  {
    name: 'userEmail',
    label: 'User Email',
    placeholder: 'Enter your email',
    type: 'text',
    componentType: 'input'
  },
  {
    name: 'password',
    label: 'password',
    placeholder: 'Enter your password',
    type: 'text',
    componentType: 'input'
  },
]

export const signInFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};
export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "chinese", label: "Chinese" },
  { id: "japanese", label: "Japanese" },
  { id: "korean", label: "Korean" },
  { id: "russian", label: "Russian" },
  { id: "portuguese", label: "Portuguese" },
  { id: "arabic", label: "Arabic" },
  { id: "hindi", label: "Hindi" }
  
]

export const courseLevelOptions = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" } 
]

export const courseLadingPageFormControls = [
{  name: "title",
   label: "Title",
   commonType: "input",
   type: "text",
   placeholder: "Enter course title"
  },
  {
   name: "category",
   label: "Category",
   commonType: "select",
   type: "text",
   placeholder: "",
   options: courseCategories 
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",
    componentType: "input",
    type: "number",
    placeholder: "Enter course pricing" 
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "welcome message for students"
  }
];

export const courseLadingInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
}

export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePrevie: false,
    public_id: "",
  }
]




