document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('[data-phone-input]');

    phoneInputs.forEach((phoneInput) => {
        phoneInput.value = '+7 (___) ___-__-__';

        phoneInput.addEventListener('input', (event) => {
            let input = phoneInput.value.replace(/\D/g, '');

            if (!input.startsWith('7')) {
                input = '7' + input;
            }

            const part1 = input.substring(1, 4);
            const part2 = input.substring(4, 7);
            const part3 = input.substring(7, 9);
            const part4 = input.substring(9, 11);

            let formatted = '+7 ';
            if (part1) formatted += `(${part1}`;
            if (part1.length === 3) formatted += ')';
            if (part2) formatted += ` ${part2}`;
            if (part3) formatted += `-${part3}`;
            if (part4) formatted += `-${part4}`;

            phoneInput.value = formatted;
        });

        phoneInput.addEventListener('focus', () => {
            if (phoneInput.value === '+7 (___) ___-__-__') {
                phoneInput.value = '+7 (';
            }
        });

        phoneInput.addEventListener('blur', () => {
            if (phoneInput.value === '+7 (') {
                phoneInput.value = '+7 (___) ___-__-__';
            }
        });

        phoneInput.addEventListener('keydown', (event) => {
            const value = phoneInput.value;

            if (
                event.key === 'Backspace' &&
                (value.endsWith(')') || value.endsWith('-') || value.endsWith('('))
            ) {
                phoneInput.value = value.slice(0, -1);
                event.preventDefault();
            }
        });

        phoneInput.addEventListener('input', () => {
            const input = phoneInput.value;

            const formattedValue = input.replace(/[^0-9+]/g, '');
            const firstPart = formattedValue.substring(0, 2);
            const otherParts = formattedValue.substring(2);

            phoneInput.style.color = "#aaa";
            if (firstPart === "+7") {
                phoneInput.style.color = "#000";
            }
        });
    });
});
