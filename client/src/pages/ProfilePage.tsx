import {Button} from "../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {Input} from "../components/ui/input.tsx";
import {IoArrowBackSharp, IoCloseSharp} from "react-icons/io5";
import {useChat} from "../store/useChat.tsx";
import {useRef, useState} from "react";
import {BiLoaderAlt} from "react-icons/bi";

const ProfilePage = () => {
    const navigate = useNavigate();
    const {currentUser} = useChat();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState(currentUser?.name || "");
    const [image, setImage] = useState<string | null>(currentUser?.profileImage || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleBack = () => {
        navigate(-1);
    }

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file?.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name,
                    profileImage: image,
                }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                throw new Error(`Error: ${response.statusText}`);
            };

            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <div className="flex items-center justify-center h-screen relative">
            {isLoading && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
                    <BiLoaderAlt className="animate-spin" size={36} />
                </div>
            )}
            <div className="container bg-white w-[20vw] h-fit rounded-lg p-4">
                <Button onClick={handleBack} variant="outline">
                    <IoArrowBackSharp size={40}/>
                </Button>
                <div className="text-xl font-medium text-center py-5">Edit Your Profile</div>
                <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
                    {
                        image ? (
                            <div className="relative">
                                    <button className="absolute -right-3 -top-2" onClick={handleRemoveImage}>
                                        <IoCloseSharp size={24} />
                                    </button>
                                <img src={image} alt="image" className="w-20 h-20 object-cover rounded-full" />
                            </div>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-gray-200 rounded-full cursor-pointer"
                                     onClick={() => fileInputRef.current?.click()}/>
                                <Input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleChangeImage} />
                            </>
                        )
                    }
                    <Input type="text" value={name} placeholder="You name..." onChange={handleChange}/>
                    <Button type="submit" className="w-full">Save</Button>
                    {error && <div className="text-sm text-red-500">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;