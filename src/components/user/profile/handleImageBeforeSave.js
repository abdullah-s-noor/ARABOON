export const handleImageBeforeSave = async (image) => {
        async function urlToFile(url, filename) {
            const response = await fetch(url);      
            const blob = await response.blob();     
            return new File([blob], filename, { type: blob.type }); 
        }

        if (typeof image === "string" && image.startsWith("https")) {
            return await urlToFile(image, "image.png");
        }

        return image;
    };

export    const base64ToBlob = (base64) => {
            const byteString = atob(base64.split(",")[1])
            const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]
            const ab = new ArrayBuffer(byteString.length)
            const ia = new Uint8Array(ab)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            return new Blob([ab], { type: mimeString })
        }