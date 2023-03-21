interface GamePlayer {
    game: number;
    players: any[];
    center: number;
}

export class Game {
    private n: number;
    private s: string;
    private num: number[];
    private middle: number;
    private now: number;
    private t: number;
    private flag: number;
    private pre: number;
    private len: number;
    private caseNum: number;
    private results: GamePlayer[];
    private input: string[];

    constructor(input: string[]) {
        this.n = 0;
        this.s = '';
        this.num = [];
        this.middle = 0;
        this.now = 0;
        this.t = 0;
        this.flag = -1;
        this.pre = 0;
        this.len = 0;
        this.caseNum = 1;
        this.results = [];
        this.input = input;
    }

    private pass(x: number, y: number, z: number): void {
        for (let i = x; i < y; i++) {
            if (this.s[i] === "R") {
                this.num[z]--;
                this.num[(z + this.n - 1) % this.n]++;
            } else if (this.s[i] === "L") {
                this.num[z]--;
                this.num[(z + 1) % this.n]++;
            } else if (this.s[i] === "C") {
                this.num[z]--;
                this.middle++;
            }
        }
    }

    private playGame(): void {
        this.num = new Array(this.n).fill(3);
        this.middle = 0;
        this.now = 0;
        this.t = 0;
        this.flag = -1;

        while (this.t < this.len) {
            if (this.t + Math.min(this.num[this.now], 3) <= this.len) {
                this.pre = this.num[this.now];
                this.pass(this.t, this.t + Math.min(this.num[this.now], 3), this.now);
                this.t += Math.min(this.pre, 3);
                this.now = (this.now + 1) % this.n;
                while (this.num[this.now] === 0) {
                    this.now = (this.now + 1) % this.n;
                }
            } else {
                break;
            }

            for (let i = 0; i < this.n; i++) {
                if (this.num[i] + this.middle === 3 * this.n) {
                    this.flag = i;
                    break;
                }
            }

            if (this.flag !== -1) {
                break;
            }
        }

        const players: any[] = [];

        for (let i = 0; i < this.n; i++) {
            let status = `${this.num[i]}`;
            if (this.flag === i) {
                status += "(W)";
            } else if (this.flag === -1 && i === this.now) {
                status += "(*)";
            }

            players.push({
                nro: i + 1,
                status
            })
        }

        this.results.push({
            game: this.caseNum,
            players,
            center: this.middle
        })
    }

    public start(): void {
        this.input.forEach(roll => {
            const [players, rolls] = roll.split(' ');

            if (players != '0') {
                this.n = parseInt(players);
                this.s = rolls;
                this.len = this.s.length;

                this.playGame();
                this.caseNum++;
            }
        })
    }

    public dataResults(): any[] {
        return this.results;
    }
}