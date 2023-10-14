export const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
    const response = await fetch(...args);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json() as Promise<T>;
};

export const loadFileAsDataURL = (file: File, onLoad: (event: ProgressEvent<FileReader>) => void) => {
    const reader = new FileReader();
    reader.onload = onLoad;
    reader.readAsDataURL(file);
};

export const generateVerificationCode = (): string => {
    const min = 100000;
    const max = 999999;
    return `${Math.floor(Math.random() * (max - min + 1)) + min}`;
};
