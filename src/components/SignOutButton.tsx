'use client'

import React, { FC, useState } from "react";
import Button from "./ui/Butoon";
import { signOut } from "next-auth/react";
import { toast } from "./ui/Toast";

interface IProps {};

const SignOutButton:FC<IProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const signUserOut = async () => {
        setIsLoading(true);

        try {
            await signOut();
        } catch (error) {
            toast({
                title: 'Error signing out',
                message: 'Please try again',
                type: 'error'
            });
        }
    }

    return <Button onClick={signUserOut} isLoading={isLoading}>
        Sign out
    </Button>
};

export default SignOutButton;