import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import registerValidation from '@/validations/auth/registerValidation'
import { registerUser } from '@/redux/actions/authAction'
import { useAppDispatch } from '@/hooks/hooks'
import { Link, useNavigate } from 'react-router-dom'

type registerForm = z.infer<typeof registerValidation>

// So const helps in changing type string to type readonly array
const fields = ['email', 'name', 'username', 'password'] as const;
type FieldName = typeof fields[number];



const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const form = useForm<registerForm>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',

    },
  })

  const onSubmit = async (values: registerForm) => {
      await dispatch(registerUser(values,navigate))
      form.reset()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500">Please enter your credentials to continue</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((fieldName: FieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={fieldName === 'password' ? 'password' : 'text'}
                        placeholder={`Enter your ${fieldName}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
             <div className="text-sm text-right">
              <Link to="/login" className="text-indigo-600 hover:underline">
                Already registered? Login
              </Link>
            </div>
            <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Register
