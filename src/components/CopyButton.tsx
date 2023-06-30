'use client'

import React, { ButtonHTMLAttributes, FC } from "react";
import Button from "./ui/Butoon";
import { toast } from "./ui/Toast";
import { type } from "os";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    valueToCopy: string
}

const CopyButton:FC<IProps> = ({valueToCopy, className, ...props}) => {
    return <Button 
        {...props}
        onClick={() => {
            navigator.clipboard.writeText(valueToCopy);
            
            toast({
                title: "Copied!",
                message: "API key copied to clipboard",
                type: "success"
            })
        }}
        variant="ghost"
        className={className}
        >
            <Copy className="h-5 w-5"/>
    </Button>
};

export default CopyButton;