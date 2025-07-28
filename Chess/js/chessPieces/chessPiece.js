export class ChessPiece {
    #color;
    #type;
    #position;
    #img;

    constructor(color, type, position, img) {
        if(new.target === ChessPiece) {
            throw new Error("chessPiece is abstract class");
        }
        this.color = color;
        this.type = type;
        this.position = position;
        this.img = img;
    }

    get color() {
        return this.#color;
    }

    set color(value) {
        this.#color = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        this.#type = value;
    }

    get img() {
        return this.#img;
    }

    set img(value) {
        this.#img = value;
    }

    get position() {
        return this.#position;
    }

    set position(value) {
        this.#position = value;
    }


    getAvailableMoves() {
        throw new Error("getAvailableMoves is abstract method");
    }

    getAvailableAttack() {
        throw new Error("getAvailableAttack is abstract method");
    }
}