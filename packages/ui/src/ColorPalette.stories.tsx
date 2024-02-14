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
            name: 'Good Dads Colors',
            shades: [
                { color: 'gooddadsGreen', hsl: 'hsl(109, 41%, 45%)' },
                { color: 'gooddadsBlue', hsl: 'hsl(198, 100%, 43%)' },
                { color: 'gooddadsRed', hsl: 'hsl(342, 71%, 51%)' },
                { color: 'gooddadsGray', hsl: 'hsl(0, 0%, 39%)' },
                { color: 'black', hsl: 'hsl(0, 0%, 0%)' },
                { color: 'white', hsl: 'hsl(0, 0%, 200%)' },
            ],
        }
    ];
    
    return (
        <div>
            <h2 className="font-semibold mb-10 text-center">{colors[0]?.name}</h2>
            {colors.map((color, index) => (
                <div key={index} className="mb-4">
                    <div className="flex flex-wrap justify-center gap-6">
                        {color.shades.map((shade, shadeIndex) => (
                            <div key={shadeIndex} className="flex flex-col items-center mb-2">
                                <div
                                    className="w-16 h-16 rounded-md mb-1"
                                    style={{ backgroundColor: shade.hsl }}
                                />
                                <div>
                                    <div className='text-center'>{shade.color}</div>
                                    <div className='text-center'>{shade.hsl}</div>
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
