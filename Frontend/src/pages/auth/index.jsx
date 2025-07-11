import React, { useState , useContext} from 'react'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signInFormControls, signUpFormControls } from '@/config'
import { AuthContext  }  from '@/context/auth-context'
import CommonForm from '@/components/common-form'

function AuthPage () {
  const [activeTab, setActiveTab] = useState('signin');
  const {
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    signInFormData,
    setSignInFormData,
    handleLoginUser
  } = useContext(AuthContext);
  
  function checkIfSignInFormIsValid () {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== "" 
    );
  }
  console.log(signInFormData);

  function checkIfSignUpFormIsValid () {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== "" 
    );
  }
  console.log(signInFormData);

  

  function handleTabChange (value) {
    setActiveTab(value)
  }

  return (
    <div className=' flex flex-col min-h-screen'>
      <header className='px-4 lg:px-6 h-14 flex items-center border-b'>
        <Link to={'/'} className='flex items-center justify-center'>
          <GraduationCap className='h-8 w-8 mr-4' />
          <span className='font-extrabold text-xl'>LMS LEARN</span>
        </Link>
      </header>
      <div className='flex items-center justify-center min-h-screen'>
        <Tabs
          value={activeTab}
          defaultValue='signin'
          onValueChange={handleTabChange}
          className='w-full max-w-md'
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger
              value='signin'
              className='py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-t-md data-[state=active]:bg-white data-[state=active]:border-b-white data-[state=active]:text-black'
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value='signup'
              className='py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-t-md data-[state=active]:bg-white data-[state=active]:border-b-white data-[state=active]:text-black'
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value='signin'>
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2" >
                <CommonForm
                formControls={signInFormControls}
                buttonText={"Sign In"}
                formData={signInFormData}
                setFormData={setSignInFormData}
                isButtonDisabled={!checkIfSignInFormIsValid()}
                handleSubmit={handleLoginUser}/>

              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='signup'>
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign Up to your account</CardTitle>
                <CardDescription>
                  Enter your details to create a new account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2" >
                <CommonForm
                formControls={signUpFormControls}
                buttonText={"Sign Up"}
                formData={signUpFormData}
                setFormData={setSignUpFormData}
                isButtonDisabled={!checkIfSignUpFormIsValid()}
                handleSubmit={handleRegisterUser}/>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AuthPage
