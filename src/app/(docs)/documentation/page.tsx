import DocumentationTabs from "@/components/DocumentationTabs";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import type { Metadata } from "next";
import React, { FC } from "react";
import "simplebar-react/dist/simplebar.min.css"

export const metadata: Metadata = {
    title: "Similarity API | Documentation",
    description: "Free & open-source similarity API"
}

const componentName:FC = () => {
    return <div className="container max-w-7xl mx-auto mt-12">
        <div className="flex flex-col items-center gap-6">
            <LargeHeading>Making a request</LargeHeading>
            <Paragraph>api/v1/similarity</Paragraph>
            <DocumentationTabs />
        </div>
    </div>
};

export default componentName;