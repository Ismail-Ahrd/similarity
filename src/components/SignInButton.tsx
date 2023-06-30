'use client'

import React, { FC, useState } from "react";
import Button from "./ui/Butoon";
import { signIn } from "next-auth/react";
import { toast } from "./ui/Toast";

interface IProps {};

const SignInButton:FC<IProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        setIsLoading(true);

        try {
            await signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' });
        } catch (error) {
            toast({
                title: 'Error signing in',
                message: 'Please try again',
                type: 'error'
            });
        }
    }

    return <Button onClick={signInWithGoogle} isLoading={isLoading}>
        Sign in
    </Button>
};

export default SignInButton;