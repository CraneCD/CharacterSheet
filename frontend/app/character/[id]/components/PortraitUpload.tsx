'use client';

import { useRef } from 'react';

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
    disabled?: boolean;
}

export default function PortraitUpload({ portrait, onUpdate, disabled }: PortraitUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
            alert(`Image must be under ${MAX_FILE_MB} MB`);
            return;
        }
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image (JPEG, PNG, etc.)');
            return;
        }
        try {
            const dataUrl = await resizeImage(file);
            onUpdate(dataUrl);
        } catch (err) {
            console.error(err);
            alert('Failed to process image');
        }
        e.target.value = '';
    };

    const handleRemove = () => {
        onUpdate(null);
    };

    return (
        <div className="no-print" style={{ flexShrink: 0 }}>
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <div
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: disabled ? 'default' : 'pointer',
                    position: 'relative'
                }}
                onClick={() => !disabled && inputRef.current?.click()}
                title={portrait ? 'Click to change' : 'Click to upload portrait'}
            >
                {portrait ? (
                    <img
                        src={portrait}
                        alt="Character portrait"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <span style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>👤</span>
                )}
            </div>
            {portrait && !disabled && (
                <button
                    type="button"
                    className="button secondary"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemove();
                    }}
                    style={{
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.4rem',
                        marginTop: '0.25rem',
                        width: '100%'
                    }}
                >
                    Remove
                </button>
            )}
        </div>
    );
}
