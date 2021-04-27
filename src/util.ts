export function slicePie(arr: any) {
    const sum = arr.reduce((a: number, b: number) => a + b, 0)
    let ratioBy2Pi:any = []
    arr.forEach((o: number, index: number) => {
        let start 
        if (index === 0) {
            start = 0
        } else {
            start = ratioBy2Pi[index - 1].start + ratioBy2Pi[index - 1].angle
        }
        ratioBy2Pi.push({ start: start, angle: o / sum * 2 * Math.PI})
    })
    return ratioBy2Pi
}