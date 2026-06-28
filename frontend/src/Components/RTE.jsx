import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full  overflow-hidden rounded-xl">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            initialValue={defaultValue}
            init={{
              height: 600,
              menubar: true,
              width: "100%",
   

              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "codesample",
                "emoticons",
              ],

              toolbar:
                "undo redo | blocks fontfamily fontsize | " +
                "bold italic underline strikethrough | " +
                "forecolor backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist checklist | " +
                "link image media table | " +
                "blockquote codesample | " +
                "fullscreen preview | help",

              toolbar_sticky: true,

              image_caption: true,

              branding: false,

              content_style: `
      body {
        font-family: Inter, sans-serif;
        font-size: 16px;
        line-height: 1.8;
        max-width: 850px;
        margin: auto;
        padding: 20px;
      }

      h1,h2,h3,h4 {
        font-weight: 700;
      }

      img {
        max-width: 100%;
        border-radius: 12px;
      }

      blockquote {
        border-left: 4px solid #10b981;
        padding-left: 16px;
        color: #555;
      }
    `,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
