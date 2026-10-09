import React, { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { translateMany } from '../utils/freeTranslate'

const defaultTexts = {
  heading: "Create your account",
  cardTitle: "Sign up",
  cardDescription: "Create your account to get started with Ten Transport",
  fullNameLabel: "Full Name",
  fullNamePlaceholder: "Enter your full name",
  emailLabel: "Email",
  emailPlaceholder: "m@example.com",
  passwordLabel: "Password",
  signupButton: "Signup",
  alreadyAccount: "Already have an account?",
  loginLink: "Login",
  creatingAccount: "Creating account..."
}

const Signup = ({ language = "en" }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isScreenLoading, setIsScreenLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [texts, setTexts] = useState(defaultTexts)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (language === "en") {
      setTexts(defaultTexts)
      return
    }
    async function translateLabels() {
      setIsScreenLoading(true)
      try {
        const keys = Object.keys(defaultTexts)
        const values = Object.values(defaultTexts)
        const translated = await translateMany(values, language, "en")
        const newTexts = {}
        keys.forEach((key, idx) => {
          newTexts[key] = translated[idx] || defaultTexts[key]
        })
        setTexts(newTexts)
      } catch {
        setTexts(defaultTexts)
      } finally {
        setIsScreenLoading(false)
      }
    }
    translateLabels()
  }, [language])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsScreenLoading(true)
    try {
      setIsLoading(true)
      const res = await axios.post(`http://localhost:8000/user/register`, formData, {
        headers: { "Content-Type": "application/json" }
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/verify') 
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message)
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => toast.error(err.msg))
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Signup failed. Please check your input.")
      }
    } finally {
      setIsLoading(false)
      setIsScreenLoading(false)
    }
  }

  return (
    <div className='relative w-full h-screen md:h-[760px] bg-green-100 overflow-hidden'>
      {isScreenLoading && (
        <div className='absolute inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center'>
          <Loader2 className='h-12 w-12 text-white animate-spin' />
        </div>
      )}
      <div className='min-h-screen flex flex-col'>
        <div className='flex-1 flex items-center justify-center p-4'>
          <div className='w-full max-w-md space-y-6'>
            <div className='text-center space-y-2'>
              <h1 className='text-3xl font-bold text-center tracking-tight text-green-600'>
                {texts.heading}
              </h1>
            </div>

            <Card className="w-full max-w-sm">
              <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl text-center text-green-600'>{texts.cardTitle}</CardTitle>
                <CardDescription className='text-center'>{texts.cardDescription}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="full-name">{texts.fullNameLabel}</Label>
                    <Input
                      id="full-name"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      type="text"
                      placeholder={texts.fullNamePlaceholder}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">{texts.emailLabel}</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={texts.emailPlaceholder}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">{texts.passwordLabel}</Label>
                    <div className='relative'>
                      <Input
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        required
                      />
                      <Button
                        variant='ghost'
                        size="sm"
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      {texts.creatingAccount}
                    </>
                  ) : texts.signupButton}
                </Button>

                <p className="text-center text-sm mt-2">
                  {texts.alreadyAccount}{" "}
                  <Link to="/login" className="text-green-600 hover:underline">
                    {texts.loginLink}
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
