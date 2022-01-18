export default class Snake {

    constructor(field) {
        this.field = field;
        this.nodes = [{row: 2, col: 0}, {row: 1, col: 0}, {row: 0, col: 0}];
        
        this.ids = new Set();

        for(let i=0; i<this.nodes.length; ++i) {
            let {row, col} = this.nodes[i];
            this.ids.add(row*this.field.rows + col);
        }

        this.minRow = 0;
        this.maxRow = 2;

        this.minCol = 0;
        this.maxCol = 2;

        this.collision = false;
    }

    detectCollision(row, col) {
        if (row<0) {
            this.collision = true;
        } else if (row>this.field.rows-1) {
            this.collision = true;
        } else if (col<0) {
            this.collision = true;
        } else if (col>this.field.cols-1) {
            this.collision = true;
        } else {
            this.collision = this.ids.has(row * this.field.rows + col);
        }
    }

    eat(food) {
        let {row, col} = this.head();

        if (food.row === row && food.col === col) {
            
            console.log("Eat: ", row, col);
            return true;
        }    

        return false;
    }

    add(row, col) {
        this.ids.add(row * this.field.rows + col);
        this.nodes.unshift({row: row, col: col});
    }

    removeLast() {
        let {row, col} = this.tail();
        this.ids.delete(row * this.field.rows + col);

        this.nodes.pop();
    }

    head() {
        return this.nodes[0];
    }

    tail() {
        return this.nodes[this.nodes.length-1];
    }

    move(command, food) {
        let {row, col} = this.head();

        switch(command) {
            case "ArrowUp":
                row = row - 1;
                break;

            case "ArrowDown":
                row = row + 1
                break;

            case "ArrowLeft":
                col = col - 1;
                break;

            case "ArrowRight":
                col = col + 1;
                break;

            default:
                break;
        }

        this.detectCollision(row, col);

        this.add(row, col);

        if (!this.eat(food)) {
            this.removeLast();
            return false;
        }

        return true;
    }
}