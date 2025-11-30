import React from 'react';
import { StegoType } from './StegoTypeSelectionScreen';
import { ShapePatternAuth } from './stego-auth/ShapePatternAuth';
import { ClickPatternAuth } from './stego-auth/ClickPatternAuth';
import { ImageStegoAuth } from './stego-auth/ImageStegoAuth';
import { PINAuth } from './stego-auth/PINAuth';
import { AudioPatternAuth } from './stego-auth/AudioPatternAuth';

interface StegoAuthScreenProps {
  type: StegoType;
  config: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export function StegoAuthScreen({ type, config, onConfirm, onCancel }: StegoAuthScreenProps) {
  if (!type || !config) return null;

  return (
    <>
      {type === 'shape' && <ShapePatternAuth config={config} onConfirm={onConfirm} onCancel={onCancel} />}
      {type === 'click' && <ClickPatternAuth config={config} onConfirm={onConfirm} onCancel={onCancel} />}
      {type === 'image' && <ImageStegoAuth config={config} onConfirm={onConfirm} onCancel={onCancel} />}
      {type === 'pin' && <PINAuth config={config} onConfirm={onConfirm} onCancel={onCancel} />}
      {type === 'audio' && <AudioPatternAuth config={config} onConfirm={onConfirm} onCancel={onCancel} />}
    </>
  );
}
