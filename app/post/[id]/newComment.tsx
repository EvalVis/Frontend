import "../../../globals.css";
import { useForm } from "react-hook-form";
import React from "react";

export default function NewComment({postId}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    return (
        <div>
            <h1 className="text-4xl font-bold dark:text-white">Add comments</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your comment</label>
                    <textarea  {...register("content", { required: true })} rows={8} name="content" id="content" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button id="submit" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    );

    async function onSubmit(data, event) {
        event.preventDefault();
        reset();
        const body = { "author": "reactCommentAuthor", "content": data.content, "postId": postId };
        await fetch(
          "http://localhost:8080/comments/create",
          { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
        );
    }
}