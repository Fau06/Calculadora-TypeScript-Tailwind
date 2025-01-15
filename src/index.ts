class Calculadora {
    private display: HTMLInputElement;
    private numeroActual: string = '0';
    private operadorPendiente: string | null = null;
    private numeroAnterior: string | null = null;
    private nuevaOperacion: boolean = true;

    constructor() {
        this.display = document.getElementById('display') as HTMLInputElement;
        this.inicializarEventos();
    }

    private inicializarEventos(): void {

        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const valor = (e.target as HTMLButtonElement).textContent!;
                this.ingresarNumero(valor);
            });
        });

        document.querySelectorAll('.op').forEach(button => {
            button.addEventListener('click', (e) => {
                const operador = (e.target as HTMLButtonElement).textContent!;
                this.establecerOperador(operador);
            });
        });

        document.getElementById('equals')?.addEventListener('click', () => {
            this.calcular();
        });

        document.getElementById('clear')?.addEventListener('click', () => {
            this.limpiar();
        });
    }

    private ingresarNumero(num: string): void {
        if (this.nuevaOperacion) {
            this.numeroActual = num === '.' ? '0.' : num;
            this.nuevaOperacion = false;
        } else {
            if (num === '.' && this.numeroActual.includes('.')) return;
            this.numeroActual = this.numeroActual === '0' && num !== '.' 
                ? num 
                : this.numeroActual + num;
        }
        this.actualizarDisplay();
    }

    private establecerOperador(op: string): void {
        if (this.operadorPendiente !== null) {
            this.calcular();
        }
        this.numeroAnterior = this.numeroActual;
        this.operadorPendiente = op;
        this.nuevaOperacion = true;
    }

    private calcular(): void {
        if (this.operadorPendiente === null || this.numeroAnterior === null) return;

        const num1 = parseFloat(this.numeroAnterior);
        const num2 = parseFloat(this.numeroActual);

        let resultado: number;

        switch (this.operadorPendiente) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;
            case '*':
                resultado = num1 * num2;
                break;
            case '/':
                resultado = num2 !== 0 ? num1 / num2 : 0;
                break;
            default:
                return;
        }

        this.numeroActual = resultado.toString();
        this.operadorPendiente = null;
        this.numeroAnterior = null;
        this.nuevaOperacion = true;
        this.actualizarDisplay();
    }

    private limpiar(): void {
        this.numeroActual = '0';
        this.operadorPendiente = null;
        this.numeroAnterior = null;
        this.nuevaOperacion = true;
        this.actualizarDisplay();
    }

    private actualizarDisplay(): void {
        this.display.value = this.numeroActual;
    }
}

new Calculadora();
