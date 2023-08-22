'use client'
import AddImagesAndTags from "@/components/AddImagesAndTags";
import { createImageDTO } from "@/crud/images";
import { createGptPromptDTO } from "@/crud/prompt";
import { createTagDTO } from "@/crud/tags";
import React, { useState } from 'react';

const CreateGptPromptForm: React.FC = () => {
  const [gptPromptData, setGptPromptData] = useState<createGptPromptDTO>({
    description: '',
    prompt: '',
    temperature: 0,
    max_tokens: 0,
    top_p: 0,
    best_of: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: '',
    timesUsed: 0,
    timesIntegrated: 0,
    costPerToken: 0,
    profitMargin: 0,
    tags: [],
    image: { src: '' },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGptPromptData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send the gptPromptData to your backend for creating the GPT prompt
    console.log(gptPromptData);
  };

  function handleChangedImage(images: createImageDTO[], tags: createTagDTO[]) {
    setGptPromptData ((prevData)=> ({
    ...prevData,
    images,
    tags
    }))

  }

  return (
    <div className="light:bg-gray-100 light:text-black dark:bg-gray-700 dark:text-gray-800 max-h-screen p-2 flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full overflow-scroll max-h-screen m-1">
        <h2 className="text-2xl font-semibold mb-4">Create GPT Prompt</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <input
              type="text"
              name="description"
              className="mt-1 p-2 border rounded w-full"
              value={gptPromptData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prompt:</label>
            <textarea
              name="prompt"
              rows={3}
              className="mt-1 p-2 border rounded w-full"
              value={gptPromptData.prompt}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Stop sequences (comma separated):</label>
            <input
              type="text"
              name="stop"
              className="mt-1 p-2 border rounded w-full"
              value={gptPromptData.stop}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-1 ">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">frequency penalty :</label>
              <input
                type="number"
                name="frequency_penalty"
                className="mt-1 p-2 border rounded w-full"
                value={gptPromptData.frequency_penalty}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">best of:</label>
              <input
                type="number"
                name="best_of"
                className="mt-1 p-2 border rounded w-full"
                value={gptPromptData.best_of}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">presence penalty:</label>
              <input
                type="number"
                name="presence_penalty"
                className="mt-1 p-2 border rounded w-full"
                value={gptPromptData.presence_penalty}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">temperature:</label>
              <input
                type="number"
                name="temperature"
                className="mt-1 p-2 border rounded w-full"
                value={gptPromptData.temperature}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">cost Per Token:</label>
              <input
                type="number"
                name="costPerToken"
                className="mt-1 p-2 border rounded w-full"
                value={gptPromptData.costPerToken}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">max tokens:</label>
              <input
                type="number"
                name="max_tokens"
                className="mt-1 p-2 border rounded w-full"
                value={gptPromptData.max_tokens}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <AddImagesAndTags onImagesAndTagsChange={handleChangedImage}></AddImagesAndTags>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Create GPT Prompt
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default CreateGptPromptForm;
