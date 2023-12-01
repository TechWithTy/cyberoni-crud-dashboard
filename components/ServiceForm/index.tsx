'use client'
import AddImagesAndTags from "@/components/AddImagesAndTags"
import { CreateImageDTO } from "@/crud/images";
import { CreateServiceDTO, CreateServiceDescription, DisplayServiceDTO } from "@/crud/service";
import { CreateTagDTO } from "@/crud/tags";
import React, { useEffect, useState } from 'react'
import { PlusCircle, X } from "lucide-react";
import { CreateSubServiceDTO } from "@/crud/subService";

import Notification, { NotificationType } from "@/components/Notification";
import CreateSubServcie from "./SubServiceForm";
import { Service } from "@prisma/client";
import Image from "next/image";
import DescriptionForm from "./DescriptionSection";
import ListInput from "../ListInput";

function SerivceForm({ method, action, initial }: { method: 'POST' | 'PUT', action: string, initial?: DisplayServiceDTO }) {
    const [notify, setNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [notifyType, setNotifyType] = useState<'success' | 'fail'>('fail');

    const [showDialog, setShowDialog] = useState(false);
    const [serviceData, setServiceData] = useState<CreateServiceDTO>({
        hourlyRate: 0,
        previewContent: "",
        skillsUsed: [],
        title: "",
        htmlEmbed: "",
        valueBrought: [],
        SubServices: [],
        ServiceDescription: [],
        tags: [],
        image: undefined
    });

    const [descriptionForm, setDescriptionForm] = useState(false);

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setServiceData({
            ...serviceData,
            [name]: Number(value)
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, ":   ", typeof value)
        setServiceData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    function handleChangedImage(image: CreateImageDTO[], tags: CreateTagDTO[]) {
        setServiceData((prevData) => ({
            ...prevData,
            image: image[0],
            tags
        }))

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-access-token',
        };
        // Send the userData to your backend for creating the user
        const res = await fetch(action, { method, body: JSON.stringify(serviceData), headers })
        let resJson = await res.json();

        if (res.status == 200) {
            message('success', resJson.message)

        } else {
            message('fail', resJson.message)

        }
    };

    function message(type: NotificationType, message: string) {
        setNotify(true);
        setNotifyType(type);
        setNotifyMessage(message);

    }



    function setQuillData(value: string) {

        setServiceData(prevData => ({
            ...prevData,
            description: value
        }))
    }


    function handleSubServiceAdd(subService: CreateSubServiceDTO) {

        console.log(subService);
        setServiceData((prevData) => ({
            ...prevData,
            SubServices: [...(prevData.SubServices || []), subService]
        }))

        setShowDialog(false)

    }

    function handleRemoveSubService(subServiceToRemove: CreateSubServiceDTO) {
        setServiceData((prevData) => ({
            ...prevData,
            SubServices: prevData.SubServices?.filter(subService => subService.id !== subServiceToRemove.id)
        }))

    }

    function handleDescritionChange(description: CreateServiceDescription) {
        setServiceData(prev => ({
            ...prev,
            ServiceDescription: [...prev.ServiceDescription, description]
        }))

        setDescriptionForm(false)
    }

    useEffect(() => {
        if (initial) setServiceData(initial as CreateServiceDTO)
    }, [initial]);


    return (
        <>
            <div className="light:bg-gray-100 light:text-black dark:bg-gray-700 dark:text-gray-800 min-h-screen flex items-center justify-center container mx-auto">
                <div className="bg-white shadow-md rounded p-8 max-w-4xl w-full overflow-y-scroll max-h-screen">
                    <h2 className="text-2xl font-semibold mb-4">Create Service</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title:</label>
                            <input
                                type="text"
                                name="title"
                                className="mt-1 p-2 border rounded w-full"
                                value={serviceData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Hourly Rate:</label>
                            <input
                                type="number"
                                name="hourlyRate"
                                className="mt-1 p-2 border rounded w-full"
                                value={serviceData.hourlyRate == 0 ? '' : serviceData.hourlyRate}
                                onChange={handleNumberInputChange}
                            />
                        </div>

                        <div className="mb-4 h-fit   flex-grow">
                            <label className="block text-sm font-medium text-gray-700">Description:</label>
                            {serviceData.ServiceDescription?.map((section, index) => {

                                return <div className={`flex gap-5 w-full my-4 border-dotted border-2 p-2 ${section.imageOnLeft ? 'flex-row' : 'flex-row-reverse'}`} key={index}>
                                    <div className="flex justify-end ">
                                        <button className="self-end   mx-10 my-3" onClick={() => setServiceData(prev =>
                                        ({
                                            ...prev,
                                            ServiceDescription: prev.ServiceDescription.filter((desc, ind) => (ind !== index))

                                        }))} ><X color="red" className="cursor-pointer" /></button>
                                    </div>
                                    <div className="w-1/3 ">
                                        <Image src={section.image.src} alt={`${index}-section`} height={500} width={500} ></Image>
                                    </div>
                                    <div className="w-2/3 justify-evenly">
                                        <div className="font-bold text-3xl">{section.title}</div>
                                        <div>{section.content}</div>
                                    </div>

                                </div>
                            })}

                            <div className="w-full flex justify-center items-end  p-2">
                                <button type="button" onClick={() => setDescriptionForm(true)} className="p-2 hover:shadow-lg hover:bg-blue-600 bg-blue-500 rounded-full" >
                                    <PlusCircle className=" text-white" />
                                </button>
                            </div>


                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Preview Content:</label>
                            <textarea
                                name="previewContent"
                                rows={4} // Adjust the number of rows as needed
                                className="mt-1 p-2 border rounded w-full"
                                value={serviceData.previewContent}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">

                            <ListInput
                                label="Value Brought"
                                initial={serviceData.valueBrought}
                                onChange={(values) => setServiceData(prev => ({ ...prev, valueBrought: values }))}
                            />
                        </div >
                        <div className="mb-4">
                            <ListInput
                                label="Skills used"
                                initial={serviceData.skillsUsed}
                                onChange={(values) => setServiceData(prev => ({ ...prev, skillsUsed: values }))}
                            />
                        </div >

                        <div className="my-4 flex flex-wrap gap-2">
                            {serviceData.SubServices?.map((subService, index) => {
                                return (
                                    <div key={index} className="bg-blue-200 text-blue-800 p-2 rounded flex items-center">
                                        <span>{subService.title}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring focus:ring-red-300"
                                            onClick={() => handleRemoveSubService(subService)}
                                        >
                                            X
                                        </button>
                                    </div>)
                            })}

                            <button type="button" onClick={() => setShowDialog(!showDialog)} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Add Subservice</button>
                        </div>

                        <AddImagesAndTags maxImages={1} onImagesAndTagsChange={handleChangedImage} images={serviceData?.image ? [serviceData?.image] : []} tags={serviceData?.tags}></AddImagesAndTags>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            {method === 'PUT' ? 'Update Service' : 'Create Service'}
                        </button>
                    </form>

                    <div className={`fixed flex flex-col w-screen top-0 left-0 justify-center ${showDialog ? '' : ' hidden'}`}>
                        <div className="flex justify-end z-30 ">
                            <button className="self-end   mx-10 my-3" onClick={() => setShowDialog(!showDialog)} ><X color="red" className="cursor-pointer" /></button>
                        </div>
                        <CreateSubServcie handleSubServiceAdd={handleSubServiceAdd}></CreateSubServcie>
                    </div>
                    <div className={`fixed flex flex-col w-screen top-0 left-0 justify-center ${descriptionForm ? '' : ' hidden'}`}>
                        <div className="flex justify-end z-30">
                            <button type="button" className="self-end mx-10 my-3" onClick={() => setDescriptionForm(false)} ><X color="red" className="cursor-pointer" /></button>
                        </div>
                        <DescriptionForm handleDescritionChange={handleDescritionChange} />
                    </div>
                </div>
            </div>
            <Notification visible={notify} setVisible={setNotify} message={notifyMessage} type={notifyType}></Notification>

        </>
    )
}

export default SerivceForm