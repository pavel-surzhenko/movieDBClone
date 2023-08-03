import { Dispatch, SetStateAction } from 'react';

export interface LanguageContextProps {
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
}
