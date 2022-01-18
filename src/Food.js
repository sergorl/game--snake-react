export default class Food {

    constructor(rows, cols) {
        
        this.row = 0
        this.col = 0

        this.generate(rows, cols);
    } 

    getRandomBool() {
        return Math.random() < 0.5;
    }

    getRandomInt(min, max) {       
        // Create byte array and fill with 1 random number
        var byteArray = new Uint8Array(1);
        window.crypto.getRandomValues(byteArray);
    
        var range = max - min + 1;
        var max_range = 256;
        if (byteArray[0] >= Math.floor(max_range / range) * range)
            return this.getRandomInt(min, max);
        return min + (byteArray[0] % range);
    }

    generate(rows, cols) {
        this.row = this.getRandomInt(0, rows-1);
        this.col = this.getRandomInt(0, cols-1);
    }
}