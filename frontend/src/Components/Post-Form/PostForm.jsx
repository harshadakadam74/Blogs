import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const dbPost = await appwriteService.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.log("Post Error:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
    }

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-5">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col lg:flex-row gap-5"
      >
        {/* Left Side */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <Input
            label="Title"
            placeholder="Enter Post Title"
            className="mb-4"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug"
            placeholder="Enter Post Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />

          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-fit">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/webp"
            className="mb-4"
            {...register("image", {
              required: !post,
            })}
          />

          {post && (
            <div className="mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-44 sm:h-56 object-cover rounded-xl shadow-md"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", {
              required: true,
            })}
          />

          <Button
            type="submit"
            className="
              w-full
              py-3
             rounded-xl
             bg-gradient-to-r
             from-green-500
             to-emerald-600
             text-white
             font-semibold
             text-lg
             shadow-lg
             hover:from-green-600
             hover:to-emerald-700
             hover:shadow-xl
             transform
             hover:-translate-y-1
             transition-all
             duration-300
             "
          >
            {post ? "✏️ Update Post" : "🚀 Publish Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
