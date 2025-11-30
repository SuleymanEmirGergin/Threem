import React from 'react';
import { StegoType } from './StegoTypeSelectionScreen';
import { ShapePatternSetup } from './stego-config/ShapePatternSetup';
import { ClickPatternSetup } from './stego-config/ClickPatternSetup';
import { ImageStegoSetup } from './stego-config/ImageStegoSetup';
import { PINSetup } from './stego-config/PINSetup';
import { AudioPatternSetup } from './stego-config/AudioPatternSetup';

interface StegoConfigScreenProps {
  type: StegoType;
  onSave: (config: any) => void;
  onBack: () => void;
}

export function StegoConfigScreen({ type, onSave, onBack }: StegoConfigScreenProps) {
  if (!type) return null;

  return (
    <>
      {type === 'shape' && <ShapePatternSetup onSave={onSave} onBack={onBack} />}
      {type === 'click' && <ClickPatternSetup onSave={onSave} onBack={onBack} />}
      {type === 'image' && <ImageStegoSetup onSave={onSave} onBack={onBack} />}
      {type === 'pin' && <PINSetup onSave={onSave} onBack={onBack} />}
      {type === 'audio' && <AudioPatternSetup onSave={onSave} onBack={onBack} />}
    </>
  );
}
