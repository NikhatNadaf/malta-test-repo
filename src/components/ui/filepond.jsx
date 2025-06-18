"use client"; // Required if using React Server Components in Next.js 13+

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Dynamically import FilePond (to avoid SSR issues)
const FilePond = dynamic(() => import("react-filepond").then(mod => mod.FilePond), { ssr: false });

// Import FilePond plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Register plugins
import { registerPlugin } from "react-filepond";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  return (
    <div className="w-full">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        allowProcess={true}
        maxFiles={3}
        credits={false}
        instantUpload={false}
        acceptedFileTypes={[
            "image/*",
            "application/pdf",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ]}
        server="/api" 
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        className="place-items-center"
        />
    </div>
  );
};

export default FileUpload;
