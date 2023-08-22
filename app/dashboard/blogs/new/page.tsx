'use client'
import { createBlogDTO } from "@/crud/blog";
import React, { useState } from 'react';


const CreateBlogForm: React.FC = () => {
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
    setBlogData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setBlogData(prevData => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send the blogData to your backend for creating the blog
    console.log(blogData);
  };

  return (
    <div className="light:bg-gray-100 light:text-black dark:bg-gray-700 dark:text-gray-800  bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
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
              rows={3}
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Content:</label>
            <textarea
              name="content"
              rows={6}
              className="mt-1 p-2 border rounded w-full"
              value={blogData.content}
              onChange={handleInputChange}
            />
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
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
