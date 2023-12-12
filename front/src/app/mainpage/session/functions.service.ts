import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }
  
  calculateFontSize(textLength: number): string{
    const baseSize = 28; 
    const minSize = 10; 
    const scalingFactor = 0.5;

    const calculatedSize = baseSize - textLength * scalingFactor;
    
    return Math.max(calculatedSize, minSize) + 'px';
  }
}
