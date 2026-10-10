'use client';

import { useRef } from 'react';
import { CharacterToken, describeError, useToast } from '@/app/components/ui';

const MAX_SIZE = 256;
const MAX_FILE_MB = 5;
const JPEG_QUALITY = 0.85;

function resizeImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            const canvas = document.createElement('canvas');
            let { width, height } = img;
            if (width > MAX_SIZE || height > MAX_SIZE) {
                if (width > height) {
                    height = (height / width) * MAX_SIZE;
                    width = MAX_SIZE;
                } else {
                    width = (width / height) * MAX_SIZE;
                    height = MAX_SIZE;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Canvas not available'));
                return;
            }
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
            resolve(dataUrl);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load image'));
        };
        img.src = url;
    });
}

interface PortraitUploadProps {
    portrait: string | undefined;
    onUpdate: (dataUrl: string | null) => void;
    /** Shown on the token (initial, class-coloured ring and level) */
    name: string;
    classId?: string;
    level?: number;
    disabled?: boolean;
}

export default function PortraitUpload({ portrait, onUpdate, name, classId, level, disabled }: PortraitUploadProps) {
    const toast = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
            toast.error(`Image must be under ${MAX_FILE_MB} MB`);
            return;
        }
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image (JPEG, PNG, etc.)');
            return;
        }
        try {
            const dataUrl = await resizeImage(file);
            onUpdate(dataUrl);
        } catch (err) {
            console.error(err);
            toast.error(describeError("Couldn't process image", err));
        }
        e.target.value = '';
    };

    const token = <CharacterToken name={name} portrait={portrait} classId={classId} level={level} size="lg" />;

    return (
        <div className="portrait-upload">
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                hidden
            />
            {disabled ? token : (
                <button
                    type="button"
                    className="token-button"
                    onClick={() => inputRef.current?.click()}
                    aria-label={portrait ? 'Change portrait' : 'Upload a portrait'}
                    title={portrait ? 'Change portrait' : 'Upload a portrait'}
                >
                    {token}
                    <span className="token-button-hint no-print" aria-hidden="true">{portrait ? 'Change' : 'Add portrait'}</span>
                </button>
            )}
            {portrait && !disabled && (
                <button type="button" className="btn btn-ghost btn-sm no-print portrait-remove" onClick={() => onUpdate(null)}>
                    Remove
                </button>
            )}
        </div>
    );
}
