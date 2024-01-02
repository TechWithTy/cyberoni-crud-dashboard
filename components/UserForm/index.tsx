'use client'
import AddImage from "@/components/AddImagesAndTags/AddImage";
import { CreateAddressDTO } from "@/crud/DTOs";
import { CreateImageDTO } from "@/crud/DTOs";
import { CreateUserDTO } from "@/crud/user";
import { Role } from "@prisma/client";
import React, { useState } from 'react';
import Notification, { NotificationType } from "@/components/Notification";
import { FormProps } from "@/crud/commonDTO";
import PasswordGenerator from "../PasswordInput";
import { redirect, useRouter } from "next/navigation";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const UserForm = ({ method, action, initial }: FormProps) => {

    const [notify, setNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [notifyType, setNotifyType] = useState<'success' | 'fail'>('fail');

    const [userData, setUserData] = useState<CreateUserDTO>(initial as CreateUserDTO || {
        email: '',
        role: Role.USER,
        password: '',
        address: {
            city: '',
            country: '',
            state: '',
            street: '',
            zipCode: ''
        },
        firstName: '',
        lastName: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserData(prevData => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value as string,
            },
        }));
    }

    function onImageChane(images: CreateImageDTO[]) {
        setUserData((prevData) => ({
            ...prevData,
            image: images[0]
        }))
    }
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-access-token',
        };
        // Send the userData to your backend for creating the user
        const res = await fetch(`${action}`, { method, body: JSON.stringify(userData), headers })
        let resJson = await res.json();

        if (res.status == 200) {
            message('success', resJson.message)
            router.replace(`/dashboard/users/view/${resJson.data.id}`)

        } else {
            message('fail', resJson.message)

        }
    };

    function message(type: NotificationType, message: string) {
        setNotify(true);
        setNotifyType(type);
        setNotifyMessage(message);

    }

    return (
        <div className="light:bg-gray-100 light:text-black dark:bg-gray-700 dark:text-gray-800 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">{method === 'POST' ? 'Create' : 'Update'} User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4 mx-2">
                        <label className="block text-sm font-medium text-gray-700">Password (please copy before submitting): </label>
                        <PasswordGenerator
                            name="password"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.lastName as string}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Role:</label>
                        <select
                            name="role"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.role}
                            onChange={handleInputChange}
                            required
                        >
                            {Object.values(Role).map(role => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <AddImage defaultImages={userData.image ? [userData.image] : []} onImagesChange={onImageChane} maxImages={1}></AddImage>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Street:</label>
                        <input
                            type="text"
                            name="street"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.address?.street}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">City:</label>
                        <input
                            type="text"
                            name="city"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.address?.city}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">State:</label>
                        <input
                            type="text"
                            name="state"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.address?.state}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Zip Code:</label>
                        <input
                            type="text"
                            name="zipCode"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.address?.zipCode}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Country:</label>
                        <input
                            type="text"
                            name="country"
                            className="mt-1 p-2 border rounded w-full"
                            value={userData.address?.country}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        {method === 'POST' ? 'Create' : 'Update'} User
                    </button>
                </form>
            </div>
            <Notification visible={notify} setVisible={setNotify} message={notifyMessage} type={notifyType}></Notification>

        </div>
    );
};

export default UserForm;
