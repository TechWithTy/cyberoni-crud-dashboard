'use client'
import QuillEditor from "@/components/QuillEditor";
import Notification from "@/components/Notification";
import { createBlogDTO } from "@/crud/blog";
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";


const CreateBlogForm: React.FC = () => {

  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState<'success' | 'fail'>('fail');


  const [blogData, setBlogData] = useState<createBlogDTO>({
    title: '',
    subTitle: '',
    description: '',
    featured: false,
    date: new Date(),
    content: '',
    template: '',
    author: { id: '' },

  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name == "author") {
      setBlogData(prevData => ({
        ...prevData,
        author: { id: value },
      }));
    }
    else {
      setBlogData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }

  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;


    setBlogData(prevData => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-access-token',
    };
    // Send the userData to your backend for creating the user
    console.log(blogData)
    const res = await fetch(`${apiUrl}/blogs/${params.id}`, { method: 'PUT', body: JSON.stringify(blogData), headers })
    let resJson = await res.json();

    if (res.status == 200) {
      setNotify(true); setNotifyMessage(resJson.message);
      setNotifyType('success');
    } else {
      setNotify(true); setNotifyMessage(resJson.message);
      setNotifyType('fail');
    }
  };

  function setQuillData(value: string) {
    setBlogData(prevData => ({
      ...prevData,
      content: value
    }))
  }


  const params = useParams();

  useEffect(() => {

      async function fetchData() {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer your-access-token',
          };
          // Send the userData to your backend for creating the user
          const res = await fetch(`${apiUrl}/blogs/${params.id}`, { method: 'GET', headers })
          let resJson = await res.json();
          console.log(resJson)

          if (res.status == 200) {
              setBlogData(resJson.data as createBlogDTO);
          } else {
              setNotify(true); setNotifyMessage(resJson.message);
              setNotifyType('fail');
          }
      }

      fetchData()
  }, []);



  return (
    <div className="light:bg-gray-100 light:text-black dark:bg-gray-700 dark:text-gray-800  bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="bg-white shadow-md rounded p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              className="mt-1 p-2 border rounded w-full"
              value={blogData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Author userId:</label>
            <input
              type="text"
              name="author"
              className="mt-1 p-2 border rounded w-full"
              value={blogData.author.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">SubTitle:</label>
            <input
              type="text"
              name="subTitle"
              className="mt-1 p-2 border rounded w-full"
              value={blogData.subTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              name="description"
              rows={7}
              className="mt-1 p-2 border rounded w-full"
              value={blogData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Featured:
              <input
                type="checkbox"
                name="featured"
                className="ml-2"
                checked={blogData.featured}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <div className="mb-4 h-fit">
            <label className="block text-sm font-medium text-gray-700">Content:</label>
            <QuillEditor onChange={setQuillData}  defaultValue={blogData.content}></QuillEditor>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Template:</label>
            <input
              type="text"
              name="template"
              className="mt-1 p-2 border rounded w-full"
              value={blogData.template}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Update Blog
          </button>
        </form>
      </div>
      {notify && <Notification message={notifyMessage} type={notifyType}></Notification>}
    </div>
  );
};

export default CreateBlogForm;
