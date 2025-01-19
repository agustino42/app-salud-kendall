export function kendallCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length < 2) {
      return 0;
    }
  
    let concordantPairs = 0;
    let discordantPairs = 0;
  
    for (let i = 0; i < x.length; i++) {
      for (let j = i + 1; j < x.length; j++) {
        const xDiff = x[i] - x[j];
        const yDiff = y[i] - y[j];
        
        if (xDiff * yDiff > 0) {
          concordantPairs++;
        } else if (xDiff * yDiff < 0) {
          discordantPairs++;
        }
      }
    }
  
    const totalPairs = (x.length * (x.length - 1)) / 2;
    return (concordantPairs - discordantPairs) / totalPairs;
  }
  
  