import React from 'react';
import { StoryObj } from '@storybook/react';

const meta = {
    title: 'ui/ColorPalette',
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const ColorPalette = () => {
    const colors = [
        {
            name: 'Slate',
            shades: [
                { level: 50, hex: '#f8fafc' },
                { level: 100, hex: '#f1f5f9' },
                { level: 200, hex: '#e2e8f0' },
                { level: 300, hex: '#cbd5e1' },
                { level: 400, hex: '#94a3b8' },
                { level: 500, hex: '#64748b' },
                { level: 600, hex: '#475569' },
                { level: 700, hex: '#334155' },
                { level: 800, hex: '#1e293b' },
                { level: 900, hex: '#0f172a' },
                { level: 950, hex: '#020617' },
            ],
        },
        {
            name: 'Gray',
            shades: [
                { level: 50, hex: '#f9fafb' },
                { level: 100, hex: '#f3f4f6' },
                { level: 200, hex: '#e5e7eb' },
                { level: 300, hex: '#d1d5db' },
                { level: 400, hex: '#9ca3af' },
                { level: 500, hex: '#6b7280' },
                { level: 600, hex: '#4b5563' },
                { level: 700, hex: '#374151' },
                { level: 800, hex: '#1f2937' },
                { level: 900, hex: '#111827' },
                { level: 950, hex: '#030712' },
            ],
        },
        {
            name: 'Zinc',
            shades: [
                { level: 50, hex: '#fafafa' },
                { level: 100, hex: '#f4f4f5' },
                { level: 200, hex: '#e4e4e7' },
                { level: 300, hex: '#d4d4d8' },
                { level: 400, hex: '#a1a1aa' },
                { level: 500, hex: '#71717a' },
                { level: 600, hex: '#52525b' },
                { level: 700, hex: '#3f3f46' },
                { level: 800, hex: '#27272a' },
                { level: 900, hex: '#18181b' },
                { level: 950, hex: '#09090b' },
            ],
        }
    ];
    
    return (
        <div>
            {colors.map((color, index) => (
                <div key={index} className="mb-4">
                    <div className="font-semibold mb-1">{color.name}</div>
                    <div className="flex flex-wrap">
                        {color.shades.map((shade, shadeIndex) => (
                            <div key={shadeIndex} className="flex flex-col items-center mr-4 mb-2">
                                <div
                                    className="w-8 h-8 rounded-md mb-1"
                                    style={{ backgroundColor: shade.hex }}
                                />
                                <div>
                                    <div className='text-center'>{shade.level}</div>
                                    <div className='text-center'>{shade.hex}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const Default: Story = () => <ColorPalette />;
