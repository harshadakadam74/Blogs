import { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }) => {
  const { register, handleSubmit, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      category: post?.category || "",
      type: post?.type || "Story",
      featured: post?.featured || false,
    },
  });

  const titleValue = useWatch({ control, name: "title" });

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
    if (titleValue !== undefined) {
      setValue("slug", slugTransform(titleValue), {
        shouldValidate: true,
      });
    }
  }, [titleValue, slugTransform, setValue]);

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 lg:px-8">
      <div className=" rounded-4xl border border-pink-100/80 bg-linear-to-br from-pink-50 via-white to-orange-50 p-p shadow-[0_20px_80px_-25px_rgba(217,70,239,0.35)]">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4 rounded-[31px] bg-white/90 p-4 sm:p-6 lg:flex-row lg:p-8"
        >
        {/* Left Side */}
        <div className="w-full rounded-3xl border border-[#F3E8E8] bg-linear-to-br from-white via-[#fffaf7] to-[#fff5fc] p-6 shadow-sm transition-all duration-300 lg:w-2/3 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#DD2A7B]">
                {post ? "Edit Story" : "Create New Story"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                {post ? "Update your story" : "Share your next big idea"}
              </h2>
            </div>
            <div className="rounded-full bg-[#FFF1F7] px-3 py-1 text-sm font-semibold text-[#DD2A7B]">
              {post ? "Draft" : "Fresh"}
            </div>
          </div>

          <div className="space-y-6 ">
            <Input
              label="Title"
              placeholder="Give your story a beautiful title..."
              {...register("title", { required: true })}
            />

            <Input
              label="Slug"
              placeholder="story-title"
              {...register("slug", { required: true })}
              onInput={(e) =>
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                })
              }
            />

            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="h-fit w-full rounded-3xl border border-[#F3E8E8] bg-white/80 p-6 shadow-sm lg:w-1/3">
          <div className="mb-6 rounded-2xl bg-linear-to-r from-[#FFF7ED] to-[#FFF1F7] p-4">
            <h2 className="text-xl font-bold text-gray-800">
              {post ? "Update Settings" : "Story Settings"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Add details that make your story easier to discover.
            </p>
          </div>

          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/webp"
            className="mb-6"
            {...register("image", {
              required: !post,
            })}
          />

          {post && (
            <div className="mb-6">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="
w-full
aspect-4/3
object-cover
rounded-2xl
border
border-pink-100
shadow-xl
hover:scale-[1.02]
transition-all
duration-300
"
              />
            </div>
          )}

          <Select
            options={[
              "Select Category",
              "Technology",
              "Programming",
              "AI",
              "Education",
              "LifeStyle",
            ]}
            label="Category"
            className="mb-6"
            {...register("category", {
              required: true,
              validate: (value) => value !== "Select Category",
            })}
          />

          <Select
            options={["Story", "Guide", "Tutorial", "Opinion", "News"]}
            label="Post Type"
            className="mb-6"
            {...register("type", {
              required: true,
            })}
          />

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-6"
            {...register("status", {
              required: true,
            })}
          />

          <div className="mb-6">
            <label
              htmlFor="featured"
              className="flex items-start gap-4 rounded-2xl border border-[#F8D9B8] bg-linear-to-r from-[#FFF7ED] to-[#FFF1F7] p-4 transition-all duration-200 hover:shadow-md"
            >
              <input
                type="checkbox"
                id="featured"
                {...register("featured")}
                className="
          mt-1
          h-5
          w-5
          accent-pink-600
        "
              />

              <div>
                <h4 className="font-semibold text-gray-800">
                  ⭐ Featured Story
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Display this story in the featured section on the homepage.
                </p>
              </div>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] py-4 text-sm font-bold tracking-wide text-white shadow-xl transition-all duration-300 hover:brightness-110 hover:shadow-2xl active:scale-95"
          >
            {post ? "Update Story" : "Publish Story"}
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
