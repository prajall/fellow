import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MultiImageUploader = () => {
  const { setValue, watch } = useFormContext();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const images = watch("images");

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    let newFiles = [...files, ...selectedFiles];
    if (newFiles.length > 4) {
      newFiles = newFiles.slice(0, 4);
    }

    setFiles(newFiles);
    setValue("images", newFiles);
  };

  const handleRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValue("images", updatedFiles);
  };

  useEffect(() => {
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">Upload Images</label>
      <div className="flex gap-4 mt-2 flex-wrap">
        {previews.map((src, i) => (
          <div key={i} className="relative w-24 h-24">
            <img
              src={src}
              alt={`Preview ${i}`}
              className="w-full h-full object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute -top-2 -right-2 bg-red-500 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-80"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      {files.length < 4 && (
        <input
          type="file"
          multiple
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      )}
      {files.length < 4 && (
        <Button
          variant="outline"
          className="bg-white flex items-center justify-center gap-1 text-black mt-1"
          onClick={(e) => {
            e.preventDefault();
            imageInputRef.current?.click();
          }}
        >
          <ImagePlus size={15} />
          Add Image
        </Button>
      )}
    </div>
  );
};

export default MultiImageUploader;
