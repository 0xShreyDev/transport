import React, { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getData } from '../context/userContext'
import Google from "../assets/googleLogo.png"
import { translateMany } from '../utils/freeTranslate'
import { motion, AnimatePresence } from 'framer-motion'

const defaultTexts = {
    heading: "Login into your account",
    cardTitle: "Login",
    cardDescription: "Login into your account to get started with Ten Transport",
    emailLabel: "Email",
    emailPlaceholder: "m@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot your password?",
    loginButton: "Login",
    googleLogin: "Login with Google"
}

const Login = ({ language = "en" }) => {
    const { setUser } = getData()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isScreenLoading, setIsScreenLoading] = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [errorMessage, setErrorMessage] = useState("")
    const [texts, setTexts] = useState(defaultTexts)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrorMessage("")
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
            const res = await axios.post(`http://localhost:8000/user/login`, formData, {
                headers: { "Content-Type": "application/json" }
            })
            if (res.data.success) {
                setUser(res.data.data)
                localStorage.setItem("accessToken", res.data.accessToken)
                localStorage.setItem("user", JSON.stringify(res.data.data))
                toast.success(res.data.message)
                navigate('/')
                window.location.reload()
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Something went wrong. Please try again.")
            }
        } finally {
            setIsLoading(false)
            setIsScreenLoading(false)
        }
    }

    return (
        <div className='relative w-full h-screen md:h-[760px] bg-green-100 overflow-hidden'>
            <AnimatePresence>
                {isScreenLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='absolute inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center'
                    >
                        <Loader2 className='h-12 w-12 text-white animate-spin' />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='min-h-screen flex flex-col'>
                <div className='flex-1 flex items-center justify-center p-4'>
                    <div className='w-full max-w-md space-y-6 flex flex-col items-center'>
                        <div className='text-center space-y-2'>
                            <h1 className='text-3xl font-bold tracking-tight text-green-600'>{texts.heading}</h1>
                        </div>
                        <Card className="w-full max-w-sm">
                            <CardHeader className='space-y-1'>
                                <CardTitle className='text-2xl text-center text-green-600'>{texts.cardTitle}</CardTitle>
                                <CardDescription className='text-center'>
                                    {texts.cardDescription}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                                        <div className='flex items-center justify-between'>
                                            <Label htmlFor="password">{texts.passwordLabel}</Label>
                                            <Link className='text-sm' to={'/forgot-password'}>{texts.forgotPassword}</Link>
                                        </div>
                                        <div className='relative'>
                                            <Input
                                                id="password"
                                                name="password"
                                                placeholder={texts.passwordPlaceholder}
                                                value={formData.password}
                                                onChange={handleChange}
                                                type={showPassword ? "text" : "password"}
                                                required
                                            />
                                            <Button
                                                variant='ghost'
                                                size="sm"
                                                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />}
                                            </Button>
                                        </div>
                                        {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
                                    </div>
                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-500" disabled={isLoading}>
                                        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin inline-block' /> : texts.loginButton}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => window.open("http://localhost:8000/auth/google", "_self")}
                                        className='w-full flex items-center gap-2 justify-center'
                                        variant='outline'
                                    >
                                        <img src={Google} alt="Google" className='w-5 h-5' />
                                        {texts.googleLogin}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
