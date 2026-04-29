export interface ValidationErrors {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  message?: string;
}

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return 'Укажите ваше имя';
  if (trimmed.length < 2) return 'Имя должно содержать минимум 2 символа';
  if (trimmed.length > 50) return 'Имя не должно превышать 50 символов';
  if (/[0-9]/.test(trimmed)) return 'Имя не должно содержать цифры';
  if (/[^а-яёА-ЯЁa-zA-Z\s-]/.test(trimmed)) return 'Имя содержит недопустимые символы';
  return null;
}

export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return 'Укажите номер телефона';
  if (digits.length < 11) return 'Номер должен содержать 11 цифр';
  if (digits.length > 11) return 'Номер содержит слишком много цифр';
  if (!digits.startsWith('7')) return 'Номер должен начинаться с +7';
  return null;
}

export function validateService(service: string): string | null {
  if (!service || service === '') return 'Выберите услугу';
  return null;
}

export function validateDate(date: string): string | null {
  if (!date) return 'Укажите дату';

  const selected = new Date(date + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) return 'Дата не может быть в прошлом';

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);
  if (selected > maxDate) return 'Можно записаться максимум на 30 дней вперёд';

  return null;
}

export function validateTime(time: string): string | null {
  if (!time) return 'Укажите время';
  return null;
}

export function validateMessage(message: string): string | null {
  if (message && message.length > 200) return 'Комментарий не должен превышать 200 символов';
  return null;
}

export function validateAll(data: {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  const nameErr = validateName(data.name);
  if (nameErr) errors.name = nameErr;

  const phoneErr = validatePhone(data.phone);
  if (phoneErr) errors.phone = phoneErr;

  const serviceErr = validateService(data.service);
  if (serviceErr) errors.service = serviceErr;

  const dateErr = validateDate(data.date);
  if (dateErr) errors.date = dateErr;

  const timeErr = validateTime(data.time);
  if (timeErr) errors.time = timeErr;

  const msgErr = validateMessage(data.message);
  if (msgErr) errors.message = msgErr;

  return errors;
}
