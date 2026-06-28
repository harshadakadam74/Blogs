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
    <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-8 py-5 rounded-3xl bg-gradient-to-br from-pink-100 via-white to-orange-100 p-[1px]">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col lg:flex-row gap-4 "
      >
        {/* Left Side */}
        <div
          className="
    w-full lg:w-2/3
    rounded-3xl
    border border-[#F3E8E8]
   bg-white/80 
    backdrop-blur-2xl
    shadow-xl
    p-6 sm:p-8
    transition-all
    duration-300
  "
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {post ? "Edit Story " : "Create Story "}
          </h2>

          <div className="space-y-6">
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
        <div
          className="
    w-full lg:w-1/3
    rounded-3xl
    border border-[#F3E8E8]
   bg-white/80
    backdrop-blur-2xl
    shadow-xl
    p-6
    h-fit
  "
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {post ? "Update Settings" : "Story Settings"}
          </h2>

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
aspect-[4/3]
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
              className="
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-[#F8D9B8]
        bg-gradient-to-r
        from-[#FFF7ED]
        to-[#FFF1F7]
        p-4
        cursor-pointer
        hover:shadow-md
        transition-all
      "
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
            className="
    w-full
    py-4
    rounded-full
    bg-gradient-to-r
    from-[#F58529]
    via-[#DD2A7B]
    to-[#8134AF]
    text-white
    font-bold
    tracking-wide
    shadow-xl
    hover:brightness-110
    hover:shadow-2xl
    active:scale-95
    transition-all
    duration-300
  "
          >
            {post ? "Update Story" : "Publish Story"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
