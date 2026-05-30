import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({
  name,
  control,
  label,
  defaultValue = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="YOUR_TINYMCE_API_KEY"
            value={value}
            init={{
              height: 500,
              menubar: true,

              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
              ],

              toolbar:
                "undo redo | formatselect | " +
                "bold italic underline | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | " +
                "link image | preview code fullscreen",

              content_style: `
                body {
                  font-family: Inter, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.6;
                  padding: 10px;
                }
              `,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;