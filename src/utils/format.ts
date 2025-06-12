

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
        year: '2-digit',
        month: '2-digit',
        day: 'numeric'
    }).format(new Date(date));
}