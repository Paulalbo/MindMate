import "./style.css";
import React, { useState, useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface DropZoneProps {
  setJsonData: (data: any) => void; // Change 'any' to the actual type you expect
}

const DropZone: React.FC<DropZoneProps> = ({ setJsonData }) => {
  const [importedJsonData, setImportedJsonData] = useState<any | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("mindMateData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setImportedJsonData(parsedData);
    }
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "text/json": [".json"],
      },
      onDrop: (acceptedFiles) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            try {
              const parsedData = JSON.parse(event.target.result as string);
              setJsonData(parsedData);
              setImportedJsonData(parsedData);
              localStorage.setItem("mindMateData", JSON.stringify(parsedData));
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        };
        reader.readAsText(acceptedFiles[0]);
      },
    });

  const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
    <div key={file.path}>
      <h4>Accepted</h4>
      <p>
        {file.path} ({file.size} bytes) has been imported
      </p>
    </div>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    const fileWithPath: FileWithPath = file; // Specify the type of file as FileWithPath

    return (
      <div key={fileWithPath.path}>
        <h4>Accepted files</h4>
        <ul>
          <li>
            {fileWithPath.path} - {fileWithPath.size} bytes
            <ul>
              {errors.map((e) => (
                <li key={e.code}>{e.message}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop your mind-mate-data file here, or click to select files
        </p>
      </div>
      <aside>
        {acceptedFileItems}
        {fileRejectionItems}
        <div>
          {importedJsonData ? (
            <p>Data file you are using is valid</p>
          ) : (
            <p>No JSON data to display</p>
          )}
        </div>
      </aside>
    </section>
  );
};

export default DropZone;
