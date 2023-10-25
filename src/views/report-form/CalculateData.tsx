export function CalculateReportData(require:number, value:number) {
    const result = require - value;

    return result.toFixed(1)
    
}

export function CalculateMedium(require:number, value:number) {
    const result = (require + value)/2;

    return result.toFixed(1)
    
}