'use client'
import { CreateReferralDTO } from "@/crud/referral";
import { CreateImageDTO } from "@/crud/images";
import { CreateTagDTO } from "@/crud/tags";
import { EventStatus, ReferralPriority, ReferralType } from "@prisma/client";
import React, { FormEvent, useEffect, useState } from 'react';
import Notification, { NotificationType } from "@/components/Notification";
import { redirect, useRouter } from "next/navigation";



const ReferralForm = ({ method, action, initial }: { method: 'POST' | 'PUT', action: string, initial?: CreateReferralDTO }) => {
    const [notify, setNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [notifyType, setNotifyType] = useState<'success' | 'fail'>('fail');

    const [referralData, setEventData] = useState<CreateReferralDTO>(initial || {
        campaignId: '',
        description: '',
        click: 0,
        expires: new Date(),
        fallback: '/',
        link: '',
        prefix: '',
        username: '',
        priority: ReferralPriority.LOW,
        type: ReferralType.REDIRECT,
        redirect: ''
    });
    const [date, setDate] = useState(((initial?.expires) || (new Date())).toISOString().split('T')[0]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'expires') {
            console.log(new Date(value));
            setEventData(prevData => ({
                ...prevData,
                expires: new Date(value),
            }));

        } if (name === 'isVirtual') {
            setEventData(prevData => ({
                ...prevData,
                isVirtual: value === 'on',
            }));
        } else {

            setEventData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }

    };
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-access-token',
        };
        // Send the userData to your backend for creating the user
        const res = await fetch(`${action}`, { method, body: JSON.stringify(referralData), headers })
        let resJson = await res.json();

        if (res.status == 200) {
            message('success', resJson.mesage)
            router.replace(`/dashboard/referrals/view/${resJson.data.id}`)

        } else {
            message('fail', resJson.mesage)

        }
    };

    function message(type: NotificationType, message: string) {
        setNotify(true);
        setNotifyType(type);
        setNotifyMessage(message);
        setTimeout(() => { setNotify(false) }, 5000)

    }


    function handleChangedImage(images: CreateImageDTO[], tags: CreateTagDTO[]) {
        setEventData((prevData) => ({
            ...prevData,
            image: images[0],
            tags
        }))

    }



    return (
        <div className="light:bg-gray-100 light:text-black dark:bg-gray-700 dark:text-gray-800 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded p-8 max-w-4xl w-full overflow-scroll max-h-screen">
                <h2 className="text-2xl font-semibold mb-4">{method === 'POST' ? 'Create' : 'Update'} Referral {referralData.type}</h2>
                <form onSubmit={handleSubmit} className="">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Refrral type:</label>
                        <select
                            name="type"
                            className="mt-1 p-2 border rounded w-full  invalid:ring-2 invalid:ring-rose-600 invalid:text-rose-500 invalid:outline-red-500"
                            value={referralData.type}
                            onChange={handleInputChange}
                            required
                        >
                            {Object.values(ReferralType).map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    {
                        referralData.type === "REDIRECT" ?
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">prefix :</label>
                                <input
                                    type="text"
                                    name="prefix"
                                    className="mt-1 p-2 border rounded w-full invalid:ring-2 invalid:ring-rose-600 invalid:text-rose-500 invalid:outline-red-500"
                                    value={referralData.prefix as string}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div> : <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">username :</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="mt-1 p-2 border rounded w-full"
                                    value={referralData.username as string}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>


                    }
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Expires :</label>
                        <input
                            type="date"
                            name="expires"
                            className="mt-1 p-2 border rounded w-full invalid:ring-2 invalid:ring-rose-600 invalid:text-rose-500 invalid:outline-red-500"
                            value={(date)}
                            required
                            onChange={(referral) => {
                                setDate(referral.target.value);
                                setEventData(prev => ({ ...prev, date: new Date(referral.target.value) }))
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Redirect Link:</label>
                        <input
                            type="url"
                            name="redirect"
                            className="mt-1 p-2 border rounded w-full invalid:ring-2 invalid:ring-rose-600 invalid:text-rose-500 invalid:outline-red-500"
                            value={referralData.redirect}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Page To Link:</label>
                        <input
                            type="text"
                            name="link"
                            pattern="^/(.*){1,}$"
                            className="mt-1 p-2 border rounded w-full invalid:ring-2 invalid:ring-rose-600 invalid:text-rose-500 invalid:outline-red-500"
                            value={referralData.link}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">fallback Link:</label>
                        <input
                            type="text"
                            name="fallback"
                            pattern="^/(.*){1,}$"
                            className="mt-1 p-2 border rounded w-full invalid:ring-2 invalid:ring-rose-600 invalid:text-rose-500 invalid:outline-red-500"
                            value={referralData.fallback}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            rows={4} // Adjust the number of rows as needed
                            className="mt-1 p-2 border rounded w-full invalid:ring-2 invalid:ring-rose-600 invalid:text-rose-500 invalid:outline-red-500"
                            value={referralData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">campaignId :</label>
                        <input
                            name="campaignId"
                            className="mt-1 p-2 border rounded w-full invalid:ring-2 invalid:ring-rose-600 invalid:text-rose-500 invalid:outline-red-500"
                            value={referralData.campaignId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        {method === 'POST' ? 'Create' : 'Update'} Referral
                    </button>
                </form>
            </div>
            <Notification visible={notify} setVisible={setNotify} message={notifyMessage} type={notifyType}></Notification>

        </div>
    );
};

export default ReferralForm;
