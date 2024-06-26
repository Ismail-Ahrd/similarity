import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import { formatDistance } from "date-fns";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { Input } from "./ui/Input";
import Table from "./Table";
import ApiKeyOptions from "./ApiKeyOptions";


const ApiDashboard = async () => {
    const user = await getServerSession(authOptions);
    if(!user) notFound();

    const apiKeys = await db.apiKey.findMany({
        where: {
            userId: user.user.id
        }
    });

    const activeApiKey = apiKeys.find(apiKey => apiKey.enabled===true);
    if(!activeApiKey) notFound();

    const userRequests = await db.apiRequest.findMany({
        where: {
            apiKeyId: {
                in: apiKeys.map(key => key.id)
            }
        }
    });

    const serializableRequests = userRequests.map((req) => ({
        ...req,
        timestamp: formatDistance(new Date(req.timestamp), new Date())
    }));

    return <div className="container flex flex-col gap-6">
        <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
            <Paragraph>Your Api key:</Paragraph>
            <Input className="w-fit truncate" readOnly value={activeApiKey.key}/>
            <ApiKeyOptions apiKeyKey={activeApiKey.key} apiKeyId={activeApiKey.id}/>
        </div>

        <Paragraph className="text-center md:text-left mt-4 -mb-4">
            Your Api history:
        </Paragraph>
        <Table userRequests={serializableRequests}/>
    </div>
};

export default ApiDashboard;